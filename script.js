const micBtn = document.getElementById('mic-btn');
const aiText = document.getElementById('ai-text');
const jokeImg = document.getElementById('joke-img');
const userNameEl = document.getElementById('user-name');
const levelDisplay = document.getElementById('level-display');

let userName = "";
let currentLevel = 0;

// Levels with jokes
const levels = [
    {
        level: 1,
        jokes: [
            {text:"ஏன் கடல் தண்ணி உப்பாக இருக்கும்ன்னு தெரியுமா? 🌊😆", img:"https://i.imgur.com/sea_salt.jpg"},
            {text:"ஏன் ஆடு பஞ்சாயத்து பண்ணுது? 😂", img:"https://i.imgur.com/goat_fun.jpg"}
        ]
    },
    {
        level: 2,
        jokes: [
            {text:"எதுக்கா சிங்கம் கோவில் போகுது? 😜", img:"https://i.imgur.com/lion_temple.jpg"},
            {text:"ஏன் நாய் பந்து விளையாடுது? 🐶⚽", img:"https://i.imgur.com/dog_ball.jpg"}
        ]
    },
    {
        level: 3,
        jokes: [
            {text:"ஏன் பட்டம் பறக்குது? 🎈😂", img:"https://i.imgur.com/balloon_fun.jpg"},
            {text:"ஏன் நண்டு கடலை அட்டாக் பண்ணுது? 🦀🌊", img:"https://i.imgur.com/crab_fun.jpg"}
        ]
    }
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

    // Get current level jokes
    const level = levels[currentLevel];
    const joke = level.jokes[Math.floor(Math.random() * level.jokes.length)];

    // 5 sec suspense
    aiText.textContent = "⌛ 5 வினாடிகள் காத்திரு...";
    setTimeout(() => {
        aiText.textContent = joke.text.replace("{name}", userName || "தம்பி");
        jokeImg.src = joke.img;
        jokeImg.style.display = "block";
        speakText(joke.text.replace("{name}", userName || "தம்பி"));

        // Next level update
        currentLevel = (currentLevel + 1) % levels.length;
        levelDisplay.textContent = "Level: " + (currentLevel + 1);
    }, 5000);
});
