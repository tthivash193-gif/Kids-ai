const micBtn = document.getElementById('mic-btn');
const aiText = document.getElementById('ai-text');

let userName = ""; // user name save பண்ண

const aiResponses = [
    "ஓஹோ {name}! நீ வந்து விட்டியா 😎😂",
    "{name}, உன்னை பார்த்து ரொம்ப சந்தோஷம்! 😆",
    "{name}, இன்று super fun நாளா! 🎉",
    "ஹேய் {name}! என்ன சிரிப்பு பண்ணுவாய் இப்போ? 😜",
    "{name}, உன்னை பார்க்க நான் காத்திருப்பேன்! 😎"
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ta-IN';

micBtn.addEventListener('click', () => {
    recognition.start();
    aiText.textContent = "🎤 கேட்கிறேன்...";
});

recognition.addEventListener('result', (e) => {
    const userSpeech = e.results[0][0].transcript;

    // name capture logic
    if(!userName) {
        const nameMatch = userSpeech.match(/பெயர் (\w+)/i);
        if(nameMatch) userName = nameMatch[1];
    }

    // AI reply
    const aiReplyTemplate = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const aiReply = aiReplyTemplate.replace("{name}", userName || "தம்பி");

    aiText.textContent = aiReply;

    // speak AI reply
    const utterance = new SpeechSynthesisUtterance(aiReply);
    utterance.lang = 'ta-IN';
    utterance.pitch = 1.2;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
});
