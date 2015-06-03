// Here we're setting up our variables for the game.
var playerName = 'No name';
var gameStarted = false;
var currentRoom = 'no-where';

// Variables for first room
var firstDoorOpen = false;

// Variables for second room
var secondDoorOpen = false;
var secondDoorLocked = true;
var secondKey = false;

// Variables used for total game time.
var gameTime = 0;
var startTime = 0;
var gameFinished = false;

// Called when the player clicks on the start game button
function startGame()
{
    if (gameStarted)
    {
        // We can't start the game twice! That's madness
        return;
    }

    var playerNameEl = document.getElementById('player-name-input');
    if (playerNameEl.value.length === 0)
    {
        alert('You need a name before you can enter the world of adventure!');
        return;
    }

    playerName = playerNameEl.value;
    gameStarted = true;

    // Hide the name input, prevents the player from inputting their name twice.
    var startGameEl = document.getElementById('start-game');
    startGameEl.classList.add('hide');

    // Show game world now that we have a player now.
    var gameWorldEl = document.getElementById('game-world');
    gameWorldEl.classList.remove('hide');

    // Display some initial game text
    addGameWorldText('Welcome to the adventure ' + playerName + '!');
    addGameWorldText('Simply type what you want to do and press enter.');

    // Move to the first room
    changeRooms('first');

    // Creating a new Date object gives us the current time.
    var now = new Date();
    // Store the starting time in milliseconds.
    startTime = now.getTime();
}
// Registers when the game has finished by recording the time taken and 
// removes the player-action input.
function finishGame()
{
    if (gameFinished)
    {
        // We can't finish the game twice! That's madness
        return;
    }

    gameFinished = true;
    var now = new Date();
    // Time is stored in milliseconds, but we want seconds.
    gameTime = (now.getTime() - startTime) / 1000;

    var playerActionEl = document.getElementById('player-action');
    playerActionEl.classList.add('hide');
}

// Adds general game world text.
function addGameWorldText(text)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = text;
    newEl.classList.add('description')

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

// Gets the room text for the given room.
function getRoomText(room)
{
    if (room === 'first')
    {
        return getFirstRoomText();
    }
    else if (room === 'second')
    {
        return getSecondRoomText();
    }
    else if (room === 'outside')
    {
        return getOutsideRoomText();
    }

    // Fallback case when something goes wrong.
    return 'You\'ve somehow ended up in an unknown room, that\'s weird...';
}

// Return the world text when in the first room.
function getFirstRoomText()
{
    var text = 'You are standing in a small room with ';
    if (firstDoorOpen)
    {
        text += 'an open door.';
    }
    else
    {
        text += 'a closed door.';
    }
    text += ' It is a bit dusty, there isn\'t much reason to hang around.';

    return text;
}

// Return the world text when in the second room.
function getSecondRoomText()
{
    var text = 'This room is a lot nicer. There room is lit by a single large window, a small table under the window catches most of the direct light.'; 
    if (!secondKey)
    {
        text += ' A small key sits on the table.';
    }

    text += ' There is ';
    if (secondDoorOpen)
    {
        text += ' an open door to the north.';
    }
    else
    {
        text += ' a closed door that appears to have a key hole.';
    }

    return text;
}

// Return the world text when outside.
function getOutsideRoomText()
{
    return 'You made it ' + playerName + '!' +
       ' It only took you <span class="game-time">' + gameTime + '</span> seconds to get out of the house!';
}

// When the player presses a key when the player-action input has focus.
function onPlayerActionKeydown(event)
{
    // If the enter key has been pressed then we want to run the rest of this function.
    if (event.keyCode !== 13)
    {
        return;
    }

    grabPlayerAction();
}

function grabPlayerAction()
{
    var playerActionEl = document.getElementById('player-action');
    // Don't do anything if the player hasn't typed anything.
    if (playerActionEl.value.length === 0)
    {
        return;
    }

    processPlayerAction(playerActionEl.value);

    // Reset action input
    playerActionEl.value = '';
}

// Handles player input and asks the correct room to handle the player input.
function processPlayerAction(action)
{
    addPlayerActionText(action);

    if (currentRoom === 'first')
    {
        processFirstRoomAction(action);
    }
    else if (currentRoom === 'second')
    {
        processSecondRoomAction(action);
    }
    else
    {
        addGameWorldText('Now that you\'re in limbo, performing any action doesn\'t really do much, you wonder how you ended up here.');
    }
}

// Handles all the player input when in the first room.
function processFirstRoomAction(action)
{
    if (action === 'look')
    {
        if (firstDoorOpen)
        {
            addGameWorldText('You can go north through the open door, or you could close it again if you want.');
        }
        else
        {
            addGameWorldText('Not much to do except try to open the door.');
        }
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
    else if (action === 'close door')
    {
        if (firstDoorOpen)
        {
            firstDoorOpen = false;
            addGameWorldText('For some reason you feel the need to close the door again.');
        }
        else
        {
            addGameWorldText('The door is already closed you clod.');
        }
    }
    else if (action === 'go north')
    {
        if (firstDoorOpen)
        {
            addGameWorldText('You leave the dusty room behind.');
            changeRooms('second');
        }
        else
        {
            addGameWorldText('Attempting to leave the door through a closed door fails.');
        }
    }
    else
    {
        addGameWorldText('I don\'t know what "' + action + '" is.');
    }
}

// Handles all the player input when in the second room.
function processSecondRoomAction(action)
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
        changeRooms('first');
    }
    // Handle going north to outside and with the locked door.
    else if (action === 'go north')
    {
        if (secondDoorOpen)
        {
            addGameWorldText('You leave to the north.');
            changeRooms('outside');
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

// This handles changing the current room for us.
function changeRooms(room)
{
    currentRoom = room;

    // Check if the new room is outside.
    // If so then the game is complete!
    if (room === 'outside')
    {
        finishGame(); 
    }
    addGameWorldText(getRoomText(room));
}
