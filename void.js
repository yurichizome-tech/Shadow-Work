function enterTheVoid() {
    console.log("You have entered the void...");
    const voidElement = document.getElementById('void');
    voidElement.style.backgroundColor = "#000"; // Makes it even darker
    voidElement.innerHTML += "<p style='color: #444; font-style: italic;'>...the abyss stares back...</p>";
}
