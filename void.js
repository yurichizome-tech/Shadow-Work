function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px;">
            <h2 style="color: #111; letter-spacing: 15px; margin-bottom: 20px;">THE VOID</h2>
            <textarea id="void-input" placeholder="Release to the crows..." 
                style="width: 85%; height: 200px; background: #050505; color: #666; 
                       border: 1px solid #111; padding: 20px; font-family: 'Garamond', serif; 
                       font-size: 1.1rem; outline: none; transition: opacity 2s;"></textarea>
            <div style="margin-top: 30px;">
                <button onmousedown="playVoidEffects()" onclick="feedCrows()" 
                    style="background: none; border: 1px solid #222; color: #444; 
                           padding: 12px 30px; cursor: pointer; letter-spacing: 3px; font-size: 0.8rem;">
                    FEED THE CROWS
                </button>
            </div>
            <p id="void-msg" style="color: #222; margin-top: 20px; font-style: italic;"></p>
        </div>
    `;
}

function feedCrows() {
    const area = document.getElementById('void-input');
    const msg = document.getElementById('void-msg');
    const voidDiv = document.getElementById('void');

    if (!area || area.value.trim() === "") return;

    // Create the overlay if it doesn't exist
    let overlay = document.querySelector('.crow-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'crow-overlay';
        voidDiv.appendChild(overlay);
    }

    // Start the Ritual
    playVoidEffects(); // Attempting sound again
    area.style.opacity = "0";
    msg.innerText = "The feast begins...";
    overlay.classList.add('crow-active');

    // Reset after 5 seconds
    setTimeout(() => {
        area.value = "";
        area.style.opacity = "1";
        overlay.classList.remove('crow-active');
        msg.innerText = "The silence returns.";
    }, 5000);
}

function playVoidEffects() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // This is the key: Resume MUST happen inside the click/mousedown event
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const bufferSize = audioCtx.sampleRate * 1.5; // 1.5 seconds
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        // Create a "Wind/Staticky" sound instead of a beep
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 1.5);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        noise.start();
    } catch(e) { console.log("Audio failed:", e); }
}
// Initialize
refreshVoid();
