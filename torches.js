// THE BRIDGE: This tells the Skeleton to render the Torches
function loadTorches() {
    refreshTorches();
}

let torchData = JSON.parse(localStorage.getItem('sov_torches')) || { no: 0, silence: 0, sorry: 0, ward: 0 };
let eventLog = JSON.parse(localStorage.getItem('sov_history')) || [];

function tally(type, label) {
    torchData[type]++;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    eventLog.unshift(`[${time}] ${label.toUpperCase()}`);
    if (eventLog.length > 50) eventLog.pop();
    saveAndRefresh();
    updateProgressBar(2); 
}

function refreshTorches() {
    const container = document.getElementById('torches');
    if (!container) return;

    container.innerHTML = `
        <div class="torch-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px;">
            <div class="torch-card" onclick="tally('no', 'Said No')" style="background:#111; padding:30px; border:1px solid #333; cursor:pointer;">
                <span style="color:#d4af37; font-size:2rem; display:block;">${torchData.no}</span> NO!
            </div>
            <div class="torch-card" onclick="tally('silence', 'Held Silence')" style="background:#111; padding:30px; border:1px solid #333; cursor:pointer;">
                <span style="color:#d4af37; font-size:2rem; display:block;">${torchData.silence}</span> SILENCE
            </div>
            <div class="torch-card" onclick="tally('sorry', 'Not Sorry')" style="background:#111; padding:30px; border:1px solid #333; cursor:pointer;">
                <span style="color:#d4af37; font-size:2rem; display:block;">${torchData.sorry}</span> NOT SORRY
            </div>
            <div class="torch-card" onclick="tally('ward', 'Held Ward')" style="background:#111; padding:30px; border:1px solid #333; cursor:pointer;">
                <span style="color:#d4af37; font-size:2rem; display:block;">${torchData.ward}</span> THE WARD
            </div>
        </div>
        <div id="log-list" style="margin-top:30px; color:#666; font-size:0.8rem; text-align:left; padding:20px;">
            ${eventLog.map(e => `<div>${e}</div>`).join('')}
        </div>
    `;
}

function saveAndRefresh() {
    localStorage.setItem('sov_torches', JSON.stringify(torchData));
    localStorage.setItem('sov_history', JSON.stringify(eventLog));
    refreshTorches();
}

function updateProgressBar(amount) {
    const fill = document.getElementById('bar-fill');
    if(!fill) return;
    let currentWidth = parseFloat(fill.style.width) || 0;
    fill.style.width = Math.min(currentWidth + amount, 100) + "%";
}

// Initial Run
refreshTorches();




// INITIAL STATE
let torchData = JSON.parse(localStorage.getItem('sov_torches')) || { no: 0, silence: 0, sorry: 0, ward: 0 };
let eventLog = JSON.parse(localStorage.getItem('sov_history')) || [];

// 1. TALLY FUNCTION
function tally(type, label) {
    torchData[type]++;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add to log
    eventLog.unshift(`[${time}] ${label.toUpperCase()}`);
    if (eventLog.length > 50) eventLog.pop(); // Keep log manageable

    saveAndRefresh();
    updateProgressBar(2); // Each torch tap fills 2% of the bar
}

// 2. REFRESH THE UI
function refreshTorches() {
    const container = document.getElementById('torches');
    if (!container) return;

    container.innerHTML = `
        <div class="torch-grid">
            <div class="torch-card" onclick="tally('no', 'Said No')">
                <span class="torch-count">${torchData.no}</span>
                <label>NO!</label>
            </div>
            <div class="torch-card" onclick="tally('silence', 'Held Silence')">
                <span class="torch-count">${torchData.silence}</span>
                <label>SILENCE</label>
            </div>
            <div class="torch-card" onclick="tally('sorry', 'Not Sorry')">
                <span class="torch-count">${torchData.sorry}</span>
                <label>NOT SORRY</label>
            </div>
            <div class="torch-card" onclick="tally('ward', 'Held Ward')">
                <span class="torch-count">${torchData.ward}</span>
                <label>THE WARD</label>
            </div>
        </div>
        <div class="log-container">
            <h3>The Daily Log</h3>
            <div id="log-list">${eventLog.map(e => `<div class="log-entry">${e}</div>`).join('')}</div>
            <button class="reset-btn" onmousedown="startReset()" onmouseup="stopReset()">HOLD TO PURGE LOG</button>
        </div>
    `;
}

// 3. SAVING & SIGNALS
function saveAndRefresh() {
    localStorage.setItem('sov_torches', JSON.stringify(torchData));
    localStorage.setItem('sov_history', JSON.stringify(eventLog));
    refreshTorches();
}

function updateProgressBar(amount) {
    const fill = document.getElementById('bar-fill');
    let currentWidth = parseFloat(fill.style.width) || 0;
    fill.style.width = Math.min(currentWidth + amount, 100) + "%";
}

// Start the view
refreshTorches();
