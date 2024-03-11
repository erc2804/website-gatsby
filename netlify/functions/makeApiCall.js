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

const fetchOpenAICompletions = async (messages) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      temperature: 0.33,
    }),
  })

  if (!response.ok) {
    throw new Error(`Could not connect to OPENAI API.`)
  }

  return await response.json()
}

exports.handler = async (event) => {
  try {
    let messages = JSON.parse(event.body).messages
    if (!messages.some((message) => message.role === "system")) {
      const gistContent = await fetchGist(messages)
      messages.unshift({ role: "system", content: gistContent })
    }

    const data = await fetchOpenAICompletions(messages)

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
