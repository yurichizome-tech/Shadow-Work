let vaultLocked = true;

function toggleVault() {
    const password = prompt("Enter the Secret Key to unlock the Vault:");
    
    if (password === 'Kleidouchos') {
        document.getElementById('vault-content').style.display = 'block';
        document.getElementById('vault-lock-msg').innerText = "🔓 Vault Unlocked";
    } else {
        alert("The Keybearer denies entry.");
    }
}

