// Variables for game
var gameStarted = false;
var currentRoom = 'first';

// Variables for first room
var firstDoorOpen = false;

// Variables for second room
var secondDoorOpen = false;
var secondDoorLocked = true;
var secondKey = false;

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
    if (currentRoom === 'first')
    {
        if (action === 'look')
        {
            var text = 'You are in a dusty room with';
            if (firstDoorOpen)
            {
                text += ' an open door to the north.';
            }
            else
            {
                text += ' a closed door to the north.';
            }
            addGameWorldText(text);
        }
        else if (action === 'open door')
        {
            if (firstDoorOpen)
            {
                addGameWorldText('The door is already open you clod.');
            }
            else
            {
                firstDoorOpen = true;
                addGameWorldText('The door opens with a bit of effort.');
            }
        }
        else if (action === 'go north')
        {
            if (firstDoorOpen)
            {
                addGameWorldText('You leave the dusty room behind.');
                currentRoom = 'second';
            }
            else
            {
                addGameWorldText('Attempting to leave the door through a closed door fails.');
            }
        }
        else
        {
            addGameWorldText('I don\'t know how to "' + action + '".');
        }
    }
    else
    {
        addGameWorldText('You\'ve ended up in limbo, and as such "' + action + '" means nothing.');
    }
}
