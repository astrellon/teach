function onLoad()
{
    var map = new GameMap();
    map.tiles = [
        ['wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall'],
        ['wall', 'grass', 'grass']
    ];
    map.renderMap();

    var character = new Character();
    character.createElement();
}

