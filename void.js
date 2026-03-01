function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    container.innerHTML = `
        <div style="margin-top: 30px;">
                <button onmousedown="playVoidSound()" onclick="feedCrows()" 
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
    
    if (area.value.trim() === "") return;

    // 1. Play the "Nuke Drop" Hum
    playVoidSound();
    
    // 2. Play the Crow Caw (High pitch)
    playCawSound();

    area.style.opacity = "0";
    msg.innerText = "The feast begins...";

    for(let i=0; i<8; i++) {
        setTimeout(spawnCrow, i * 150);
    }

    setTimeout(() => {
        area.value = "";
        area.style.opacity = "1";
        msg.innerText = "The silence returns.";
    }, 4000);
}

function spawnCrow() {
    const crow = document.createElement('div');
    crow.className = 'crow';
    // Positions the crow near the center/text area
    crow.style.left = (window.innerWidth / 2 + (Math.random() * 200 - 100)) + "px";
    crow.style.top = (window.innerHeight / 2) + "px";
    crow.style.animation = `flyAway ${2 + Math.random()}s forwards`;
    document.getElementById('void').appendChild(crow);
    
    setTimeout(() => crow.remove(), 3000);
}

function playVoidSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // This forces the browser to acknowledge the audio "brain"
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // A slightly higher frequency (80Hz) so it's easier for speakers to catch
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(80, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 3);
        
        // Increased volume to 0.3 (was 0.1)
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 3);
        
        console.log("Void sound triggered successfully.");
    } catch(e) { 
        console.log("Audio Error:", e); 
    }
}


function playCawSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // A "sawtooth" wave sounds more like a harsh bird cry
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
}




refreshVoid();
