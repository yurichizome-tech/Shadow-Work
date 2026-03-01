// Initialize torch counts from local storage or set to 0
let torchData = JSON.parse(localStorage.getItem('grimoire_torches')) || {
    1: 0, 2: 0, 3: 0, 4: 0
};

// Function to handle the tallying
function tally(torchNumber) {
    // Increment the specific torch
    torchData[torchNumber]++;
    
    // Save to local storage so it persists after refresh
    localStorage.setItem('grimoire_torches', JSON.stringify(torchData));
    
    // Update the visual display
    updateTorchDisplay();
    
    console.log(`Torch ${torchNumber} incremented to ${torchData[torchNumber]}`);
}

// Function to update the numbers on the screen
function updateTorchDisplay() {
    for (let i = 1; i <= 4; i++) {
        const displayElement = document.getElementById(`torch-count-${i}`);
        if (displayElement) {
            displayElement.innerText = torchData[i];
        }
    }
}

// Run the display update once when the script loads
updateTorchDisplay();
