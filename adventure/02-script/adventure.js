// Variables for game
var gameStarted = false;

function startGame()
{
    if (gameStarted)
    {
        // Game has already started so finish this function early.
        return;
    }

    gameStarted = true;
    addGameWorldText('Welcome to adventure!');
}

// Adds general game world text.
function addGameWorldText(text)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = text;

    gameWorldTextEl.appendChild(newEl);
}
