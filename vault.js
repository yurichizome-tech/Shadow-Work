let vaultLocked = true;

function toggleVault() {
    const password = prompt("Enter the Secret Key to unlock the Vault:");
    
    // You can change '1234' to any password you like
    if (password === '1234') {
        vaultLocked = false;
        document.getElementById('vault-content').style.display = 'block';
        document.getElementById('vault-lock-msg').innerText = "🔓 Vault Unlocked";
    } else {
        alert("Access Denied.");
    }
}
