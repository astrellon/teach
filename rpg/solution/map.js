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

    var itemsEl = document.getElementById('game-items');
    itemsEl.appendChild(item.el);
}
GameMap.prototype.removeItem = function(item)
{
    var index = this.items.indexOf(item);
    if (index >= 0)
    {
        this.items.splice(index, 1);
        item.map = null;
    }
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

GameMap.prototype.findNextCharacter = function(character)
{
    var index = this.characters.indexOf(character);
    if (index < 0 || index >= this.characters.length - 1)
    {
        return this.characters[0];
    }

    return this.characters[index + 1];
}

GameMap.prototype.canSee = function(object1, object2)
{
    var self = this;
    return rpg.lineTest(object1.x, object1.y, object2.x, object2.y, function(x, y)
    {
        if (self.tiles[y][x] === 'wall')
        {
            return false;
        }
        return true;
    });
}

GameMap.prototype.detachObjects = function()
{
    var gameMapEl = document.getElementById('game-map');
    gameMapEl.innerHTML = '';

    for (var i = 0; i < this.items.length; i++)
    {
        this.items[i].el.remove();
    }
    for (var i = 0; i < this.characters.length; i++)
    {
        this.characters[i].el.remove();
    }
    for (var i = 0; i < this.deadCharacter.length; i++)
    {
        this.deadCharacter[i].el.remove();
    }
}
GameMap.prototype.attachObjects = function()
{
    this.renderMap();

    var itemsEl = document.getElementById('game-items');
    for (var i = 0; i < this.items.length; i++)
    {
        itemsEl.appendChild(this.items[i].el);
    }

    var charactersEl = document.getElementById('game-characters');
    for (var i = 0; i < this.deadCharacter.length; i++)
    {
        charactersEl.appendChild(this.deadCharacter[i].el);
    }
    for (var i = 0; i < this.characters.length; i++)
    {
        charactersEl.appendChild(this.characters[i].el);
    }
}
