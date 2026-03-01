function refreshVault() {
    const container = document.getElementById('vault');
    if (!container) return;
    container.innerHTML = `
        <div class="vault-gate" style="text-align:center; padding-top:60px;">
            <p style="color: #333; letter-spacing: 4px;">Speak the words...</p>
            <input type="password" id="pass-box" style="background:#000; border:1px solid #222; color:#d4af37; padding:15px; width:70%; text-align:center;">
            <button class="keyhole-btn" onclick="checkKey()" style="width:60px; height:90px; background:#d4af37; clip-path:polygon(50% 0%, 100% 30%, 100% 70%, 70% 70%, 70% 100%, 30% 100%, 30% 70%, 0% 70%, 0% 30%); border:none; cursor:pointer; margin:20px auto; display:block;"></button>
        </div>
    `;
}

function checkKey() {
    const input = document.getElementById('pass-box').value;
    if(input.toLowerCase() === "kleidouchos") {
        openBranch('void'); // Unlocks the Void
    } else {
        alert("The gate remains closed.");
    }
}
