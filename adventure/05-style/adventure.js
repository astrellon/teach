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

    var gameWorldEl = document.getElementById('game-world');
    gameWorldEl.classList.remove('hide');

    var startWorldEl = document.getElementById('start-game');
    startWorldEl.classList.add('hide');
}

// Adds general game world text.
function addGameWorldText(text)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = text;

    gameWorldTextEl.appendChild(newEl);
}
// Adds the given player action to the world text.
function addPlayerActionText(action)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = action + ':';
    newEl.classList.add('action');

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
    addPlayerActionText(action);
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
    else if (currentRoom === 'second')
    {
        // Handle looking around
        if (action === 'look')
        {
            var lookText = 'You can go south back to where you started.';
            if (secondKey)
            {
                lookText += ' The light from the window shows the outline of the key you picked up on the table clearly.';
            }
            else
            {
                lookText += ' There is a plain looking key on a small round table by the window.';
            }
            addGameWorldText(lookText);
        }
        // Handle going south back to the first room.
        else if (action === 'go south')
        {
            addGameWorldText('You leave to the south.');
            currentRoom = 'first';
        }
        // Handle going north to outside and with the locked door.
        else if (action === 'go north')
        {
            if (secondDoorOpen)
            {
                addGameWorldText('You leave to the north.');
                currentRoom = 'outside';
            }
            else
            {
                if (secondDoorLocked)
                {
                    addGameWorldText('Not only is the door closed but it\'s locked to boot!.');
                }
                else
                {
                    addGameWorldText('While the door is unlocked it\'s still closed, leaving proves difficult.');
                }
            }
        }
        // Handle picking up the key in two different ways.
        else if (action === 'pick up key' || action === 'take key')
        {
            if (secondKey)
            {
                addGameWorldText('Your attempts to take the dusty outline of the key, while amusing are also futile.');
            }
            else
            {
                addGameWorldText('You take the key off the table, leaving behind a dusty outline.');
                secondKey = true;
            }
        }
        // Handle unlocking the door
        else if (action === 'unlock door')
        {
            if (secondDoorLocked)
            {
                if (secondKey)
                {
                    addGameWorldText('The "apply key to lock" action performs as expected and the door unlocked.');
                    secondDoorLocked = false;
                }
                else
                {
                    addGameWorldText('You perform the action of unlocking a door with your hand, however without a key the outcome is somehow disappointing.');
                }
            }
            else
            {
                addGameWorldText('Unlocking the door a second time only leads you to locking the door again, good job.');
                secondDoorLocked = true;
            }
        }
        // Handle opening the door
        else if (action === 'open door')
        {
            if (secondDoorOpen)
            {
                addGameWorldText('The door is already open, you key having clod.');
            }
            else
            {
                if (secondDoorLocked)
                {
                    addGameWorldText('The door handle refuses to move, perhaps it\'s actually locked.');
                }
                else
                {
                    addGameWorldText('The unlocked door opens with minimal effort.');
                    secondDoorOpen = true;
                }
            }
        }
        // Handle closing the door
        else if (action === 'close door')
        {
            if (secondDoorOpen)
            {
                addGameWorldText('After standing at the doorway you\'re overcome with the sense that you need to close the door, you clod.');
                secondDoorOpen = false;
            }
            else
            {
                addGameWorldText('Trying to close an already closed door has a 100% success rate, congrats.');
            }
        }
        // Handle unknown input
        else
        {
            addGameWorldText('I don\'t know what "' + action + '" is.');
        }
    }
    else
    {
        addGameWorldText('You\'ve ended up in limbo, and as such "' + action + '" means nothing.');
    }
}
