// 1. FORCED PRELOAD
const murderSound = new Audio('crow murder caw.mp3');
murderSound.preload = 'auto';
murderSound.load(); // Forces the browser to start downloading NOW

const singleSound = new Audio('single crow caw.mp3');
singleSound.preload = 'auto';
singleSound.load();

function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    container.innerHTML = `
        <div id="void-content">
            <h2 style="color: #222; letter-spacing: 12px; margin-bottom: 20px; font-weight: normal;">THE VOID</h2>
            <textarea id="void-input" placeholder="Release to the crows..."></textarea>
            <div style="margin-top: 20px;">
                <button onclick="feedCrows()" 
                    style="background: none; border: 1px solid #222; color: #444; 
                           padding: 10px 25px; cursor: pointer; letter-spacing: 3px; font-family: serif;">
                    FEED THE CROWS
                </button>
            </div>
            <p id="void-msg" style="color: #333; margin-top: 20px; font-style: italic; font-size: 0.9rem;"></p>
        </div>
    `;
}

function feedCrows() {
    const voidDiv = document.getElementById('void');
    const content = document.getElementById('void-content');
    const area = document.getElementById('void-input');
    const msg = document.getElementById('void-msg');

    if (!area || area.value.trim() === "") return;

    // 2. THE INSTANT FIRE
    // Setting currentTime to 0 and playing immediately 
    murderSound.currentTime = 0;
    const playPromise = murderSound.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Browser blocked initial autoplay. Interacting with the page first helps.");
        });
    }

    // 3. THE VISUAL TRANSITION (Now in sync with sound)
    content.style.opacity = "0";
    voidDiv.style.backgroundImage = "url('crow.gif')";

    setTimeout(() => {
        singleSound.currentTime = 0;
        singleSound.play().catch(e => {});
        
        voidDiv.style.backgroundImage = "none";
        content.style.opacity = "1";
        area.value = "";
        msg.innerText = "The silence returns.";
    }, 7000);
}

refreshVoid();
