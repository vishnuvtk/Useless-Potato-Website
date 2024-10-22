let clickCount = 0;

// Function to move potatoes around the game area
function movePotato(potato) {
    const gameArea = document.getElementById('gameArea');
    let xDirection = Math.random() < 0.5 ? -1 : 1;
    let yDirection = Math.random() < 0.5 ? -1 : 1;
    let posX = parseFloat(potato.style.left);
    let posY = parseFloat(potato.style.top);

    function updatePosition() {
        posX += xDirection;
        posY += yDirection;

        // Check for wall collisions and reverse direction if necessary
        if (posX <= 0) xDirection = 1;
        if (posX >= gameArea.clientWidth - potato.clientWidth) xDirection = -1;
        if (posY <= 0) yDirection = 1;
        if (posY >= gameArea.clientHeight - potato.clientHeight) yDirection = -1;

        potato.style.left = `${posX}px`;
        potato.style.top = `${posY}px`;
    }

    setInterval(updatePosition, 10);
}

// Function to handle clicking on potatoes
function clickPotato(potato) {
    clickCount++;
    document.getElementById('clickMeter').innerText = `Click Meter: ${clickCount}`;
    
    // Duplicate the potato
    const newPotato = potato.cloneNode(true);
    newPotato.style.left = `${Math.random() * (gameArea.clientWidth - newPotato.clientWidth)}px`;
    newPotato.style.top = `${Math.random() * (gameArea.clientHeight - newPotato.clientHeight)}px`;
    newPotato.onclick = () => clickPotato(newPotato);
    document.getElementById('gameArea').appendChild(newPotato);
    movePotato(newPotato);
}

// Function to restart the game
function restartGame() {
    // Reset the click count to 0
    clickCount = 0;
    document.getElementById('clickMeter').innerText = `Click Meter: ${clickCount}`;
    
    // Remove all potatoes except the first one
    const potatoes = document.querySelectorAll('.potato');
    potatoes.forEach((potato, index) => {
        if (index !== 0) potato.remove();
    });

    // Reset the initial potato position
    const initialPotato = document.querySelector('.potato');
    initialPotato.style.left = `${Math.random() * (gameArea.clientWidth - initialPotato.clientWidth)}px`;
    initialPotato.style.top = `${Math.random() * (gameArea.clientHeight - initialPotato.clientHeight)}px`;

    // Clear localStorage to ensure the game restarts upon refresh
    localStorage.removeItem('potatoGameState');
}

// Set up the initial game state when the page loads
window.onload = () => {
    // Clear any saved state to restart the game upon page load
    localStorage.removeItem('potatoGameState');
    
    // Initialize the game state
    restartGame();

    // Start moving the initial potato
    const initialPotato = document.querySelector('.potato');
    movePotato(initialPotato);
};
