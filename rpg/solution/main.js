var gameWorld = [
    ['wall', 'wall', 'wall'],
    ['wall', 'grass', 'wall'],
    ['wall', 'grass', 'wall'],
    ['wall', 'grass', 'wall'],
    ['wall', 'wall', 'wall']
];

const gridSize = 64;
var player = {
    'x': 0,
    'y': 0,
    'el': null
};

function onLoad()
{
    player.el = document.getElementById('player');
    renderMap();

    document.body.addEventListener('keydown', onKeyPress);
}

function renderMap()
{
    var gameMapEl = document.getElementById('game-map');
    gameMapEl.innerHTML = '';

    for (var y = 0; y < gameWorld.length; y++)
    {
        var row = document.createElement('div');
        row.classList.add('game-row');

        var mapRow = gameWorld[y];
        for (var x = 0; x < mapRow.length; x++)
        {
            var cell = document.createElement('span');
            cell.classList.add('game-cell');
            cell.classList.add(mapRow[x]);
            row.appendChild(cell);
        }
        gameMapEl.appendChild(row);
    }
}


function onKeyPress(e)
{
    console.log(e);
    if (e.keyCode === 37)
    {
        // Left
        moveCharacter(player, -1, 0);
    }
    else if (e.keyCode === 39)
    {
        // Right
        moveCharacter(player, 1, 0);
    }
    else if (e.keyCode === 38)
    {
        // Up
        moveCharacter(player, 0, -1);
    }
    else if (e.keyCode === 40)
    {
        // Down
        moveCharacter(player, 0, 1);
    }
}

function moveCharacter(character, x, y)
{
    character.x += x;
    character.y += y;

    character.el.style.left = character.x * gridSize + 'px';
    character.el.style.top = character.y * gridSize + 'px';
}
