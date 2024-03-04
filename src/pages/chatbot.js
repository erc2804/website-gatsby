import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"

export default function Chatbot() {
  const [response, setResponse] = useState(null);
  const [messageIsLoading, setMessageIsLoading] = useState(null);

  useEffect(() => {
    setMessageIsLoading(true);
    const OPENAI_API_URL = process.env.GATSBY_OPENAI_API_URL;
    const OPENAI_API_KEY = process.env.GATSBY_OPENAI_API_KEY;

    console.log('OPENAI_API_URL', OPENAI_API_URL);
    console.log('OPENAI_API_KEY', OPENAI_API_KEY);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
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

    fetch(`${OPENAI_API_URL}/chat/completions`, { method: 'POST', headers, body })
      .then(response => response.json())
      .then(data => {
        setResponse(data);
        setMessageIsLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="Chatbot" />
        {messageIsLoading ? (
          <div>Loading...</div>
        ) : (
          <div>{response?.choices[0]?.message?.content}</div>
        )}
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="Chatbot" pathname="/chatbot" />