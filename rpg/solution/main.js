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

    rpg.player = new Player();
    rpg.gameWorld.addCharacter(rpg.player.character);
    rpg.player.character.setPosition(1, 1);
    rpg.gameWorld.renderMap();

    var enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(1, 3);
    enemy.name = 'Goblin';

    var loot = new Item('weapon', 'Wooden Sword');
    loot.attack = 1;
    enemy.loot.push(loot)

    enemy = new Character();
    enemy.createElement('enemy');
    rpg.gameWorld.addCharacter(enemy);
    enemy.setPosition(3, 2);
    enemy.name = 'Goblin';

    loot = new Item('armour', 'Wooden Shield');
    loot.defence = 1;
    enemy.loot.push(loot);

}

