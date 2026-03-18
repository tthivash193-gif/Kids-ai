const micBtn = document.getElementById('mic-btn');
const aiText = document.getElementById('ai-text');

let userName = ""; // capture user name

// Speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ta-IN';

micBtn.addEventListener('click', () => {
    recognition.start();
    aiText.textContent = "🎤 கேட்கிறேன்...";
});

// OpenAI API call
async function getAIResponse(text) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY" // <-- Replace with your real OpenAI API key
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a fun Tamil AI for kids. Always reply in Tamil, include user's name if known, answer correctly, and make it funny & simple." },
                { role: "user", content: text }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Text-to-speech
async function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.pitch = 1.2;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
}

recognition.addEventListener('result', async (e) => {
    const userSpeech = e.results[0][0].transcript;

    // Capture name if said
    if(!userName) {
        const nameMatch = userSpeech.match(/பெயர் (\w+)/i);
        if(nameMatch) userName = nameMatch[1];
    }

    // Get AI reply from GPT API
    const aiReplyRaw = await getAIResponse(userSpeech);
    const aiReply = aiReplyRaw.replace("{name}", userName || "தம்பி");

    aiText.textContent = aiReply;
    speakText(aiReply);
});
