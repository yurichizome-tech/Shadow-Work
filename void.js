function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    // We wrap everything in a "content" div so we can fade it out easily
    container.innerHTML = `
        <div id="void-content">
            <h2 style="color: #111; letter-spacing: 15px; margin-bottom: 20px;">THE VOID</h2>
            <textarea id="void-input" placeholder="Release to the crows..."></textarea>
            <div style="margin-top: 30px;">
                <button onclick="feedCrows()" 
                    style="background: none; border: 1px solid #222; color: #444; 
                           padding: 12px 30px; cursor: pointer; letter-spacing: 3px;">
                    FEED THE CROWS
                </button>
            </div>
            <p id="void-msg" style="color: #222; margin-top: 20px; font-style: italic;"></p>
        </div>
    `;
}

function feedCrows() {
    const voidDiv = document.getElementById('void');
    const content = document.getElementById('void-content');
    const area = document.getElementById('void-input');
    const msg = document.getElementById('void-msg');

    if (!area || area.value.trim() === "") return;

    // 1. SUMMON THE SOUNDS
    // Note: Make sure the file extension (.mp3 or .wav) matches exactly!
    const murderSound = new Audio('Crow murder caw.mp3'); 
    const singleSound = new Audio('single crow caw.mp3');

    // 2. START THE FEAST
    murderSound.play().catch(e => console.log("Audio blocked by browser. Click again."));
    
    content.style.opacity = "0";
    msg.innerText = "The feast begins...";
    voidDiv.style.backgroundImage = "url('crow.gif')";

    // 3. THE FINAL CAW & RESET
    setTimeout(() => {
        singleSound.play().catch(e => {}); // One last cry before the silence
        
        voidDiv.style.backgroundImage = "none";
        content.style.opacity = "1";
        area.value = "";
        msg.innerText = "The silence returns.";
    }, 6000); // 6 seconds of feasting
}
refreshVoid();
