function onLoad()
{
    rpg.setup();

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
    rpg.player.name = 'Player';
    rpg.gameWorld.renderMap();

    var enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(1, 3);
    enemy.name = 'Goblin';

    enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(3, 2);
    enemy.name = 'Goblin';

    document.body.addEventListener('keydown', onKeyPress);
}

function onKeyPress(e)
{
    if (e.keyCode === 37) // Left
    {
        rpg.player.actionInDirection(-1, 0);
    }
    else if (e.keyCode === 39) // Right
    {
        rpg.player.actionInDirection(1, 0);
    }
    else if (e.keyCode === 38) // Up
    {
        rpg.player.actionInDirection(0, -1);
    }
    else if (e.keyCode === 40) // Down
    {
        rpg.player.actionInDirection(0, 1);
    }
}
