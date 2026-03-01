function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
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

    // 1. Start the fade
    area.style.opacity = "0";
    msg.innerText = "The crows descend...";

    // 2. The "Feast" duration (3 seconds)
    setTimeout(() => {
        area.value = ""; // The words are gone
        area.style.opacity = "1"; // Reset for next time
        msg.innerText = "The silence returns.";
        
        // Bonus: Filling the bar for "Venting"
        if (typeof updateProgressBar === 'function') {
            updateProgressBar(5); 
        }
    }, 3000);
}

// Ensure it initializes
refreshVoid();
