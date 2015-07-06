function onLoad()
{
    rpg.gameWorld = new GameMap();
    rpg.gameWorld.tiles = [
        ['wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall', 'wall'],
        ['wall', 'grass', 'grass', 'grass'],
        ['wall', 'grass', 'wall', 'wall'],
        ['wall', 'wall', 'wall']
    ];

    rpg.player = new Character();
    rpg.player.createElement('player');
    rpg.gameWorld.addCharacter(rpg.player);
    rpg.player.setPosition(1, 1);
    rpg.gameWorld.renderMap();

    document.body.addEventListener('keydown', onKeyPress);
}

function onKeyPress(e)
{
    if (e.keyCode === 37)
    {
        // Left
        rpg.player.moveCharacter(-1, 0);
    }
    else if (e.keyCode === 39)
    {
        // Right
        rpg.player.moveCharacter(1, 0);
    }
    else if (e.keyCode === 38)
    {
        // Up
        rpg.player.moveCharacter(0, -1);
    }
    else if (e.keyCode === 40)
    {
        // Down
        rpg.player.moveCharacter(0, 1);
    }
}
