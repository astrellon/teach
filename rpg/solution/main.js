function onLoad()
{
    rpg.setup();

    var map1 = new GameMap();
    map1.tiles = [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['wall', 'grass', 'wall', 'wall', 'dirt', 'dirt', 'grass', 'dirt', 'wall'],
        ['wall', 'grass', 'dirt', 'dirt', 'dirt', 'grass', 'dirt', 'stairs:map2:2:2', 'wall'],
        ['wall', 'grass', 'wall', 'wall', 'dirt', 'dirt', 'dirt', 'dirt', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ];
    rpg.maps['map1'] = map1;

    var map2 = new GameMap();
    map2.tiles = [
        ['dirt', 'dirt', 'wall'],
        ['dirt', 'dirt', 'grass'],
        ['dirt', 'dirt', 'stairs:map1:7:2']
    ];
    rpg.maps['map2'] = map2;
    //rpg.changeToMap(map);

    rpg.player = new Character();
    rpg.player.createElement('player');
    rpg.player.name = 'Player';
    rpg.player.controller = new PlayerController(rpg.player);
    map1.addCharacter(rpg.player);
    rpg.player.setPosition(1, 1);

    var enemy = new Character();
    enemy.createElement('enemy');
    map1.addCharacter(enemy);
    enemy.setPosition(5, 3);
    enemy.name = 'Goblin 1';
    enemy.controller = new EnemyController(enemy);

    var loot = new Item('weapon', 'Wooden Sword');
    loot.attack = 1;
    enemy.loot.push(loot)

    enemy = new Character();
    enemy.createElement('enemy');
    map1.addCharacter(enemy);
    enemy.setPosition(4, 1);
    enemy.name = 'Goblin 2';
    enemy.controller = new EnemyController(enemy);

    loot = new Item('armour', 'Wooden Shield');
    loot.defence = 1;
    enemy.loot.push(loot);
    
    enemy = new Character();
    enemy.createElement('enemy');
    map2.addCharacter(enemy);
    enemy.setPosition(0, 0);
    enemy.name = 'Goblin 3';
    enemy.controller = new EnemyController(enemy);

    loot = new Item('armour', 'Wooden Shield');
    loot.defence = 1;
    enemy.loot.push(loot);


    rpg.changeToMap(map1);
    rpg.gameTick();
}

