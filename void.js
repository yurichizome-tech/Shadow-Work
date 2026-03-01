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

    // Fade the text out
    area.style.opacity = "0";
    msg.innerText = "The feast begins...";

    // Force the crows to spawn
    for(let i=0; i<8; i++) {
        setTimeout(() => {
            const crow = document.createElement('div');
            crow.className = 'crow';
            // Start from center of the void
            crow.style.left = "50%";
            crow.style.top = "50%";
            crow.style.animation = `flyAway ${1.5 + Math.random()}s ease-in forwards`;
            voidDiv.appendChild(crow);
            
            // Cleanup the bird after it flies away
            setTimeout(() => crow.remove(), 2500);
        }, i * 150);
    }

    // Reset the room
    setTimeout(() => {
        area.value = "";
        area.style.opacity = "1";
        msg.innerText = "The silence returns.";
    }, 4000);
}

function playVoidEffects() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(50, audioCtx.currentTime); // Deep hum
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    } catch(e) { console.log("Audio Blocked"); }
}

// Initialize
refreshVoid();
