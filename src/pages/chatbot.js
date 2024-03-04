import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"

export default function Chatbot() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const OPEN_API_URL = process.env.GATSBY_OPENAI_API_URL;
    const OPEN_API_KEY = process.env.GATSBY_OPENAI_API_KEY;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_API_KEY}`
    };

    const body = JSON.stringify({
      // 'model': 'Ercan Cicek',
      'model': 'gpt-4',
      'messages': [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': 'Erzähl mir einen Witz.'
        }
      ]
    });

    fetch(`${OPEN_API_URL}/v1/chat/completions`, { method: 'POST', headers, body })
      .then(response => response.json())
      .then(data => setResponse(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="Chatbot" />
        {/* <div>{response && response.choices[0].message.content}</div> */}
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="Chatbot" pathname="/chatbot" />