function Character()
{
    this.x = 0;
    this.y = 0;
    this.el = null;

    this.health = 1;
    this.maxHealth = 10;
    this.attack = 1;
    this.defence = 0;

    this.weapon = null;
    this.armour = null;

    this.map = null;

    this.name = 'No name';
    this.inventory = [];
    for (var i = 0; i < rpg.inventorySize; i++)
    {
        this.inventory.push(null);
    }

    this.loot = [];
    this.controller = null;
    this.currentlyYourTurn = false;
}

Character.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('character');
    this.el.classList.add(className);

    var gameCharacterEl = document.getElementById('game-characters');
    gameCharacterEl.appendChild(this.el);
}
Character.prototype.removeElement = function()
{
    this.el.parentNode.removeChild(this.el);
    this.el = null;
}

Character.prototype.setPosition = function(x, y)
{
    if (!this.map.canMoveTo(x, y))
    {
        return false;
    }

    this.x = x;
    this.y = y;

    this.updatePosition();

    return true;
}

Character.prototype.moveCharacter = function(x, y)
{
    var newX = this.x + x;
    var newY = this.y + y;

    if (!this.map.canMoveTo(newX, newY))
    {
        return false;
    }
    this.x = newX;
    this.y = newY;

    this.updatePosition();

    return true;
}

Character.prototype.updatePosition = function()
{
    this.el.style.left = this.x * rpg.gridSize + 'px';
    this.el.style.top = this.y * rpg.gridSize + 'px';
}

Character.prototype.actionInDirection = function(x, y)
{
    if (x === 0 && y === 0)
    {
        // Do nothing
        return false;
    }

    var newX = this.x + x;
    var newY = this.y + y;

    // If the character is trying to move in two directions at once.
    // If not check in moving in only one direction.
    // This will allow enemies to see the player slightly off to the side and still move
    // along walls.
    if (x !== 0 && y !== 0)
    {
        // The character can't move in both directions at once.
        if (!this.map.canMoveTo(newX, newY))
        {
            // But can they move vertically?
            if (this.map.canMoveTo(this.x, newY))
            {
                newX = this.x;
            }
            // Can they move horizontally?
            else if (this.map.canMoveTo(newX, this.y))
            {
                newY = this.y;
            }
        }
    }
    
    var characterAt = this.map.findCharacterAt(newX, newY);
    if (characterAt !== null && !characterAt.isDead())
    {
        // Basically don't let enemies attack other enemies.
        var shouldAttack = (this.isPlayer() && characterAt.isEnemy()) ||
                           (this.isEnemy() && characterAt.isPlayer()); 
        if (shouldAttack)
        {
            var damage = characterAt.dealDamage(this.calculateAttack(), this.name);
            return true;
        }
    }

    return this.setPosition(newX, newY);
}

Character.prototype.isPlayer = function()
{
    return this === rpg.player;
}
Character.prototype.isEnemy = function()
{
    return this !== rpg.player;
}

Character.prototype.calculateAttack = function()
{
    var result = this.attack;
    if (this.weapon !== null)
    {
        result += this.weapon.attack;
    }

    return result;
}
Character.prototype.calculateArmour = function()
{
    var result = this.defence;
    if (this.armour !== null)
    {
        result += this.armour.defence;
    }

    return result;
}

Character.prototype.dealDamage = function(damage, damageSource)
{
    damage -= this.calculateArmour();
    if (damage < 0)
    {
        damage = 0;
    }

    this.health -= damage;

    rpg.output(this.name + ' takes ' + damage + ' damage from ' + damageSource + '.');
    if (this.isDead())
    {
        for (var i = 0; i < this.loot.length; i++)
        {
            var droppedItem = this.loot[i];
            droppedItem.createElement();
            droppedItem.setPosition(this.x, this.y);
            this.map.addItem(droppedItem);
        }

        this.map.setCharacterDead(this);
        this.el.classList.add('dead');
    }

    return damage;
}

Character.prototype.isDead = function()
{
    return this.health <= 0;
}

Character.prototype.addToInventory = function(item, index)
{
    if (this.inventory.indexOf(item) >= 0)
    {
        return false;
    }

    if (index >= 0 && index < rpg.inventorySize)
    {
        if (this.inventory[index] != null)
        {
            // Trying to add to inventory in taken space.
            return false;
        }
    }
    else
    {
        index = this.findEmptySpace();
        if (index < 0)
        {
            return false;
        }
    }

    var itemSlotEl = document.getElementById('inv-slot-' + index);
    itemSlotEl.innerHTML = '';
    itemSlotEl.appendChild(item.el);

    item.el.style.left = '';
    item.el.style.top = '';

    this.inventory[index] = item;

    return true;
}

Character.prototype.removeFromInventory = function(item)
{
    if (typeof(item) === 'number')
    {
        if (item < 0 || item >= rpg.inventorySize)
        {
            return;
        }

        if (this.inventory[item] == null)
        {
            return;
        }
    }

    var index = this.inventory.indexOf(item);
    if (index < 0)
    {
        return;
    }

    var itemSlotEl = document.getElementById('inv-slot-' + index);
    itemSlotEl.innerHTML = '';
}

Character.prototype.findEmptySpace = function()
{
    for (var i = 0; i < rpg.inventorySize; i++)
    {
        if (this.inventory[i] == null)
        {
            return i;
        }
    }

    return -1;
}

Character.prototype.yourTurn = function()
{
    this.currentlyYourTurn = true;
    if (this.controller)
    {
        this.controller.onYourTurn();
    }
    else
    {
        this.turnComplete();
    }
}
Character.prototype.turnComplete = function(waitTime)
{
    this.currentlyYourTurn = false;
    rpg.gameTick(this, waitTime);
}
