function onLoad()
{
    rpg.setup();

    rpg.gameWorld = new GameMap();
    rpg.gameWorld.tiles = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall', 'wall', 'dirt', 'dirt', 'grass', 'dirt', 'wall'],
        ['wall', 'grass', 'dirt', 'dirt', 'dirt', 'grass', 'dirt', 'stairs:map2', 'wall'],
        ['wall', 'grass', 'wall', 'wall', 'dirt', 'dirt', 'dirt', 'dirt', 'wall'],
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
    enemy.name = 'Goblin 1';
    enemy.controller = new EnemyController(enemy);

    var loot = new Item('weapon', 'Wooden Sword');
    loot.attack = 1;
    enemy.loot.push(loot)

    enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(4, 1);
    enemy.name = 'Goblin 2';
    enemy.controller = new EnemyController(enemy);

    loot = new Item('armour', 'Wooden Shield');
    loot.defence = 1;
    enemy.loot.push(loot);

    rpg.gameTick();
}

