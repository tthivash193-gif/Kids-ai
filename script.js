const micBtn = document.getElementById('mic-btn');
const aiText = document.getElementById('ai-text');
const jokeImg = document.getElementById('joke-img');
const userNameEl = document.getElementById('user-name');

let userName = "";

// Tamil jokes array (text + image URL)
const jokes = [
    {text: "ஏன் ஆடு பஞ்சாயத்து பண்ணுது? 😂", img: "https://i.imgur.com/abc123.jpg"},
    {text: "எதுக்கா சிங்கம் கோவில் போகுது? 😆", img: "https://i.imgur.com/def456.jpg"},
    {text: "ஏன் நாய் பந்து விளையாடுது? 😜", img: "https://i.imgur.com/ghi789.jpg"}
];

// Speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ta-IN';

micBtn.addEventListener('click', () => {
    recognition.start();
    aiText.textContent = "🎤 கேட்கிறேன்...";
    jokeImg.style.display = "none";
});

// Text-to-speech
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.pitch = 1.2;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
}

// Recognition result
recognition.addEventListener('result', async (e) => {
    const userSpeech = e.results[0][0].transcript;

    // Capture name if said
    if(!userName) {
        const nameMatch = userSpeech.match(/பெயர் (\w+)/i);
        if(nameMatch) userName = nameMatch[1];
    }
    if(userName) userNameEl.textContent = "உங்கள் பெயர்: " + userName;

    // Pick random joke
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    // 5 seconds suspense
    aiText.textContent = "⌛ 5 வினாடிகள் காத்திருக்க...";
    setTimeout(() => {
        aiText.textContent = randomJoke.text.replace("{name}", userName || "தம்பி");
        jokeImg.src = randomJoke.img;
        jokeImg.style.display = "block";
        speakText(randomJoke.text.replace("{name}", userName || "தம்பி"));
    }, 5000);
});
