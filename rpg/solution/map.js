function GameMap()
{
    this.tiles = [];
    this.characters = [];
}

GameMap.prototype.renderMap = function()
{
    var gameMapEl = document.getElementById('game-map');
    gameMapEl.innerHTML = '';

    for (var y = 0; y < this.tiles.length; y++)
    {
        var row = document.createElement('div');
        row.classList.add('game-row');

        var mapRow = this.tiles[y];
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

GameMap.prototype.addCharacter = function(character)
{
    if (this.characters.indexOf(character) >= 0)
    {
        return;
    }

    this.characters.push(character);
    character.map = this;
}

GameMap.prototype.canMoveTo = function(x, y)
{
    if (y < 0 || y >= this.tiles.length)
    {
        return false;
    }

    var row = this.tiles[y];
    if (x < 0 || x >= row.length)
    {
        return false;
    }

    var cell = row[x];

    if (cell === 'wall')
    {
        return false;
    }

    return this.findCharacterAt(x, y) === null
}

GameMap.prototype.findCharacterAt = function(x, y)
{
    for (var i = 0; i < this.characters.length; i++)
    {
        var character = this.characters[i];
        if (character.x === x && character.y === y)
        {
            return character;
        }
    }

    return null;
}
