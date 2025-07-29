
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a UK legal assistant.' },
          { role: 'user', content: input }
        ]
      })
    });
    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || 'No response');
  };

  return (
    <div className="container">
      <h1>JudgeGPT UK</h1>
      <textarea
        placeholder="Enter your legal issue..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Get Legal Insight</button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
