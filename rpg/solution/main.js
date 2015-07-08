function onLoad()
{
    rpg.setup();

    rpg.gameWorld = new GameMap();
    rpg.gameWorld.tiles = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall', 'wall', 'grass', 'grass'],
        ['wall', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['wall', 'grass', 'wall', 'wall', 'grass', 'grass'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ];

    rpg.player = new Character();
    rpg.player.createElement('player');
    rpg.player.name = 'Player';
    rpg.player.controller = new PlayerController(rpg.player);
    rpg.gameWorld.addCharacter(rpg.player);
    rpg.player.setPosition(1, 1);
    rpg.gameWorld.renderMap();

    var enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(5, 3);
    enemy.name = 'Goblin';
    enemy.controller = new EnemyController(enemy);

    var loot = new Item('weapon', 'Wooden Sword');
    loot.attack = 1;
    enemy.loot.push(loot)

    enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(3, 2);
    enemy.name = 'Goblin';
    enemy.controller = new EnemyController(enemy);

    loot = new Item('armour', 'Wooden Shield');
    loot.defence = 1;
    enemy.loot.push(loot);

    rpg.gameTick();
}

