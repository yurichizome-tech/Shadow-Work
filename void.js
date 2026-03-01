function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; min-height: 80vh;">
            <h2 style="color: #1a1a1a; letter-spacing: 15px; margin-bottom: 30px;">THE VOID</h2>
            
            <textarea id="void-input" 
                placeholder="Release your thoughts here..." 
                style="width: 90%; height: 250px; background: #050505; color: #666; 
                       border: 1px solid #111; padding: 20px; font-family: 'Garamond', serif; 
                       font-size: 1.1rem; outline: none; transition: opacity 3s ease-in-out;"></textarea>
            
            <div style="margin-top: 30px;">
                <button onclick="feedCrows()" 
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

    // 1. Play the "Void Hum" sound
    playVoidSound();

    // 2. Start the fade
    area.style.opacity = "0";
    msg.innerText = "The feast begins...";

    // 3. Spawn the Crows
    for(let i=0; i<6; i++) {
        setTimeout(spawnCrow, i * 150); // Spreads them out slightly
    }

    // 4. Reset after the "Feast"
    setTimeout(() => {
        area.value = "";
        area.style.opacity = "1";
        msg.innerText = "The silence returns.";
        // Boosts progress bar
        if (typeof updateProgressBar === 'function') updateProgressBar(5);
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
    // A dark, low-frequency atmospheric sound
    const voidAudio = new Audio('https://codesandbox.io/api/v1/sandboxes/f8m2p/assets/void-thrum.mp3');
    
    voidAudio.volume = 0.4;
    
    // Attempt to play and catch errors
    voidAudio.play().catch(error => {
        console.log("Audio blocked. Try clicking the screen first.");
        document.getElementById('void-msg').innerText = "The crows feast in silence (Audio Blocked).";
    });
}
refreshVoid();
