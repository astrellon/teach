// Here we're setting up our variables for the game.
var playerName = 'No name';
var gameStarted = false;
var currentRoom = 'first';

// Variables for first room
var firstDoorOpen = false;

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
    var nameInputEl = document.getElementById('name-input');
    nameInputEl.classList.add('hide');

    // Un hide game world now that we have a player now.
    var gameWorldEl = document.getElementById('game-world');
    gameWorldEl.classList.remove('hide');

    addGameWorldText('Welcome to the adventure ' + playerName);
    addGameWorldText(getRoomText(currentRoom));
}

function addGameWorldText(text)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = text;
    newEl.classList.add('description')

    gameWorldTextEl.appendChild(newEl);
}
function addPlayerActionText(action)
{
    var gameWorldTextEl = document.getElementById('game-world-text');

    var newEl = document.createElement('div');
    newEl.innerHTML = action + ':';
    newEl.classList.add('action');

    gameWorldTextEl.appendChild(newEl);
}

function getRoomText(room)
{
    var text = '';

    if (room === 'first')
    {
        text += 'You are standing in a small room with ';
        if (firstDoorOpen)
        {
            text += 'an open door.';
        }
        else
        {
            text += 'a closed door.';
        }
        text += ' It is a bit dusty, there isn\'t much reason to hang around.';
    }
    else if (room === 'second')
    {
        text += 'This room is a lot nicer, the previous room seemed like it was a large closest.';
    }

    return text;
}

function onPlayerActionEnter(event)
{
    // If the enter key has been pressed then we want to run the rest of this function.
    if (event.keyCode !== 13)
    {
        return;
    }

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

function processPlayerAction(action)
{
    addPlayerActionText(action);

    if (currentRoom === 'first')
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
            addGameWorldText('You leave the dusty room behind.');
            changeRooms('second');
        }
        else
        {
            addGameWorldText('I don\'t know what "' + action + '" is.');
        }
    }
    else if (currentRoom === 'second')
    {
        if (action === 'look')
        {
            addGameWorldText('You can go south back to where you started.');
        }
        else if (action === 'go south')
        {
            addGameWorldText('You leave to the south.');
            changeRooms('first');
        }
        else
        {
            addGameWorldText('I don\'t know what "' + action + '" is.');
        }
    }
}

function changeRooms(room)
{
    currentRoom = room;
    addGameWorldText(getRoomText(room));
}
