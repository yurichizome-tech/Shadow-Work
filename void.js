function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
            <h2 style="color: #111; letter-spacing: 15px;">THE VOID</h2>
            <textarea id="void-input" placeholder="Release to the crows..." 
                style="width: 90%; height: 250px; background: #050505; color: #444; 
                       border: 1px solid #111; padding: 20px; font-family: serif; 
                       transition: opacity 3s;"></textarea>
            <div style="margin-top: 30px;">
                <button onmousedown="playVoidEffects()" onclick="feedCrows()" 
                    style="background: none; border: 1px solid #222; color: #333; 
                           padding: 12px 30px; cursor: pointer; letter-spacing: 3px;">
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

    console.log("Feast Initiated"); // Check your browser console (F12) for this
    
    area.style.opacity = "0";
    msg.innerText = "The feast begins...";

    for(let i=0; i<6; i++) {
        setTimeout(() => {
            const crow = document.createElement('div');
            crow.className = 'crow';
            crow.style.left = "50%";
            crow.style.top = "50%";
            crow.style.animation = `flyAway ${2 + Math.random()}s ease-in forwards`;
            voidDiv.appendChild(crow);
            setTimeout(() => crow.remove(), 3000);
        }, i * 200);
    }

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
        osc.frequency.setValueAtTime(60, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 2);
    } catch(e) { console.log("Audio Error"); }
}

refreshVoid();
