function GameMap()
{
    this.tiles = [];
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

    if (row[x] === 'wall')
    {
        return false;
    }
    return true;
}
