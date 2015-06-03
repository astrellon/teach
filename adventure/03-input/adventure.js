// Variables for game
var gameStarted = false;
var currentRoom = 'first';

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

function onGoClick()
{
    var playerActionEl = document.getElementById('player-action');

    var action = playerActionEl.value;
    if (action === '')
    {
        return;
    }

    // Clear the player action input field.
    playerActionEl.value = '';
    processPlayerAction(action);
}

// Handle user input.
function processPlayerAction(action)
{
    if (action === 'look')
    {
        addGameWorldText('You look around the ' + currentRoom + ' room.');
    }
    else if (action === 'go north')
    {
        currentRoom = 'second';
        addGameWorldText('You go north.');
    }
    else if (action === 'go south')
    {
        currentRoom = 'first';
        addGameWorldText('You go south.');
    }
    else
    {
        addGameWorldText('I don\'t know how to "' + action + '".');
    }
}
