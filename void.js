function refreshVoid() {
    const container = document.getElementById('void');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align:center; background:#000; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <h2 style="color: #111; letter-spacing: 12px;">THE VOID</h2>
            <textarea id="void-input" placeholder="Release to the crows..." style="width: 80%; height: 200px; background: #050505; color: #444; border: 1px solid #111; padding: 20px;"></textarea>
            <button onclick="feedCrows()" style="margin-top:20px; background:none; border:1px solid #222; color:#333; padding:10px 20px; cursor:pointer;">Feed the crows...</button>
        </div>
    `;
}

function feedCrows() {
    alert("The crows have feasted. Your words are gone.");
    document.getElementById('void-input').value = "";
}
