function onLoad()
{
    var map = new GameMap();
    map.tiles = [
        ['wall', 'wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall', 'wall'],
        ['wall', 'grass', 'grass', 'wall'],
        ['wall', 'wall', 'grass', 'wall'],
        ['wall', 'grass', 'grass', 'wall'],
        ['wall', 'wall', 'wall', 'wall']
    ];
    map.renderMap();

    var character = new Character();
    character.createElement('player');
    character.map = map;
    character.setPosition(1, 1);
}

