// 1. PRELOAD THE SOUNDS (This stops the delay)
const murderSound = new Audio('Crow murder caw.mp3');
const singleSound = new Audio('single crow caw.mp3');

function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
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

    // 2. PLAY SOUND (Phones require a user-click to trigger sound)
    murderSound.currentTime = 0; // Resets sound to start immediately
    murderSound.play().catch(e => console.log("Mobile tap needed"));

    // 3. CINEMATIC TRANSITION
    content.style.opacity = "0";
    msg.innerText = "The feast begins...";
    
    // Smoothly bring the crows in
    setTimeout(() => {
        voidDiv.style.backgroundImage = "url('crow.gif')";
    }, 500);

    // 4. RESET WITH THE SINGLE CAW
    setTimeout(() => {
        singleSound.play().catch(e => {});
        voidDiv.style.backgroundImage = "none";
        content.style.opacity = "1";
        area.value = "";
        msg.innerText = "The silence returns.";
    }, 7000); // Slightly longer for a more meditative feel
}

refreshVoid();
