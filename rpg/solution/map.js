function GameMap()
{
    this.tiles = [];
    this.characters = [];
    this.deadCharacter = [];
    this.items = [];
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

GameMap.prototype.setCharacterDead = function(character)
{
    var index = this.characters.indexOf(character);
    if (index >= 0)
    {
        this.characters.splice(index, 1);
    }

    this.deadCharacter.push(character);
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

GameMap.prototype.addItem = function(item)
{
    if (this.items.indexOf(item) >= 0)
    {
        return;
    }

    this.items.push(item);
    item.map = this;
}

GameMap.prototype.findItemsAt = function(x, y)
{
    var result = [];
    for (var i = 0; i < this.items.length; i++)
    {
        var item = this.items[i];
        if (item.x === x && item.y === y)
        {
            result.push(item);
        }
    }

    return result;
}
