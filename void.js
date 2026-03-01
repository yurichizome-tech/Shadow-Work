function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
            <h2 style="color: #111; letter-spacing: 15px; margin-bottom: 30px;">THE VOID</h2>
            
            <textarea id="void-input" 
                placeholder="Release to the crows..." 
                style="width: 90%; height: 250px; background: #050505; color: #555; 
                       border: 1px solid #111; padding: 20px; font-family: 'Garamond', serif; 
                       font-size: 1.1rem; outline: none; transition: opacity 3s ease-in-out;"></textarea>
            
            <div style="margin-top: 30px;">
                <button onmousedown="playVoidEffects()" onclick="feedCrows()" 
                    style="background: none; border: 1px solid #222; color: #444; 
                           padding: 12px 30px; cursor: pointer; letter-spacing: 3px; font-size: 0.8rem;">
                    FEED THE CROWS
                </button>
            </div>
            
            <p id="void-msg" style="color: #222; margin-top: 20px; font-style: italic; font-size: 0.8rem;"></p>
        </div>
    `;
}

function feedCrows() {
    const area = document.getElementById('void-input');
    const msg = document.getElementById('void-msg');
    if (!area || area.value.trim() === "") return;

    area.style.opacity = "0";
    msg.innerText = "The feast begins...";

    // Spawn 8 crows
    for(let i=0; i<8; i++) {
        setTimeout(spawnCrow, i * 150);
    }

    setTimeout(() => {
        area.value = "";
        area.style.opacity = "1";
        msg.innerText = "The silence returns.";
        if (typeof updateProgressBar === 'function') updateProgressBar(5);
    }, 4000);
}

function spawnCrow() {
    const crow = document.createElement('div');
    crow.className = 'crow';
    // Center of the screen
    crow.style.left = "50%";
    crow.style.top = "50%";
    crow.style.animation = `flyAway ${2 + Math.random()}s ease-in forwards`;
    document.getElementById('void').appendChild(crow);
    setTimeout(() => crow.remove(), 3000);
}

function playVoidEffects() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // 1. THE THRUM (Low)
        const thrum = audioCtx.createOscillator();
        const thrumGain = audioCtx.createGain();
        thrum.type = 'sine';
        thrum.frequency.setValueAtTime(60, audioCtx.currentTime);
        thrum.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 3);
        thrumGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        thrumGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3);
        thrum.connect(thrumGain);
        thrumGain.connect(audioCtx.destination);
        thrum.start();
        thrum.stop(audioCtx.currentTime + 3);

        // 2. THE CAW (High/Sharp)
        const caw = audioCtx.createOscillator();
        const cawGain = audioCtx.createGain();
        caw.type = 'sawtooth';
        caw.frequency.setValueAtTime(400, audioCtx.currentTime);
        caw.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        cawGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        cawGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        caw.connect(cawGain);
        cawGain.connect(audioCtx.destination);
        caw.start();
        caw.stop(audioCtx.currentTime + 0.5);

    } catch(e) { console.log("Audio Blocked"); }
}

refreshVoid();
