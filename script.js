async function getAIResponse(text) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY" // உன் real API key-ஐ இங்கே போடு
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a fun Tamil AI for kids. Always reply in Tamil, include user's name if known, and answer correctly. Make it fun and simple." },
                { role: "user", content: text }
            ]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
