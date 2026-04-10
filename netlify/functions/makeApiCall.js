const fetch = require("node-fetch")

const fetchGist = async () => {
  const gistResponse = await fetch(
    `https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )

  if (!gistResponse.ok) {
    throw new Error("Could not connect to get the gist content.")
  }

  const gistData = await gistResponse.json()
  const gistFile = gistData.files[process.env.GITHUB_GIST_FILENAME]
  if (!gistFile) {
    throw new Error("Could not find gist file.")
  }
  return gistFile.content
}

const fetchClaudeCompletion = async (systemPrompt, messages) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
      temperature: 0.33,
    }),
  })

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`Rate limit exceeded`)
    }
    throw new Error(`Could not connect to Claude API.`)
  }

  return await response.json()
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) }
    }

    const body = JSON.parse(event.body)
    const rawMessages = body.messages

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Invalid input' }) }
    }

    if (rawMessages.length > 50) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Too many messages' }) }
    }

    for (const msg of rawMessages) {
      if (!msg.content || typeof msg.content !== 'string' || msg.content.length > 10000) {
        return { statusCode: 400, body: JSON.stringify({ message: 'Invalid message format' }) }
      }
    }

    const gistContent = await fetchGist()

    const messages = rawMessages.map((msg) => ({
      role: msg.messagerRole === "assistant" ? "assistant" : "user",
      content: msg.content,
    }))

    const data = await fetchClaudeCompletion(gistContent, messages)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
