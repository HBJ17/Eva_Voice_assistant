const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('status-text');
const waveContainer = document.getElementById('wave-container');
const chatLog = document.getElementById('chat-log');

// Initialize Web Speech API for recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
} else {
    alert("Speech Recognition API is not supported in this browser. Please use Chrome or Edge.");
}

// Initialize Speech Synthesis for speaking
const synth = window.speechSynthesis;

// UI Helpers
function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender);
    msgDiv.innerText = text;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function setListeningState(isListening) {
    if (isListening) {
        micBtn.classList.add('listening');
        waveContainer.classList.add('active');
        statusText.innerText = "Listening...";
    } else {
        micBtn.classList.remove('listening');
        waveContainer.classList.remove('active');
        statusText.innerText = "Processing...";
    }
}

function setSpeakingState(isSpeaking) {
    if (isSpeaking) {
        waveContainer.classList.add('active');
        statusText.innerText = "Eva is speaking...";
    } else {
        waveContainer.classList.remove('active');
        statusText.innerText = "Ready";
    }
}

// Handle microphone click
micBtn.addEventListener('click', () => {
    if (recognition) {
        // Stop any current speech before listening
        synth.cancel();
        recognition.start();
    }
});

// Speech Recognition Events
recognition.onstart = function() {
    setListeningState(true);
};

recognition.onerror = function(event) {
    console.error('Speech recognition error detected: ' + event.error);
    setListeningState(false);
    statusText.innerText = "Error: " + event.error;
    setTimeout(() => { statusText.innerText = "Ready"; }, 2000);
};

recognition.onresult = function(event) {
    setListeningState(false);
    const command = event.results[0][0].transcript;
    
    // Display what the user said
    addMessage('user', command);

    // Send to Flask Backend
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: command })
    })
    .then(response => response.json())
    .then(data => {
        const answer = data.answer;
        
        // Display Eva's response
        addMessage('eva', answer);
        
        // Speak the answer out loud
        speakAnswer(answer);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('eva', "Sorry, I had trouble connecting to the server.");
        statusText.innerText = "Ready";
    });
};

function speakAnswer(text) {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    
    const utterThis = new SpeechSynthesisUtterance(text);
    
    utterThis.onstart = function (event) {
        setSpeakingState(true);
    }
    
    utterThis.onend = function (event) {
        setSpeakingState(false);
    }
    
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
        setSpeakingState(false);
    }
    
    synth.speak(utterThis);
}
