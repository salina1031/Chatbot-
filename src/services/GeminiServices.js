const API_KEY = import.meta.env.VITE_GROQ_API_KEY

const GeminiServices = {
  sendMessage: async (text) => {
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: text }] // single message
          })
        }
      )
      const data = await response.json()
      return data.choices[0].message.content
    } catch (err) {
      console.error('GeminiServices Error:', err)
      return 'Error: Could not get AI response'
    }
  }
}

export default GeminiServices