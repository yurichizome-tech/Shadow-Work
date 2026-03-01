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

    // 1. Fade out the text/input
    content.style.opacity = "0";
    msg.innerText = "The feast begins...";

    // 2. SWAP THE BACKGROUND to your crow gif
    // Make sure the filename matches what is on your GitHub
    voidDiv.style.backgroundImage = "url('crow.gif')";

    // 3. Reset the room after 6 seconds
    setTimeout(() => {
        voidDiv.style.backgroundImage = "none";
        content.style.opacity = "1";
        area.value = "";
        msg.innerText = "The silence returns.";
    }, 6000);
}

refreshVoid();
