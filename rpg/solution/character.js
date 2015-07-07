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
        return;
    }

    this.x = x;
    this.y = y;

    this.updatePosition();
}

Character.prototype.moveCharacter = function(x, y)
{
    var newX = this.x + x;
    var newY = this.y + y;

    if (!this.map.canMoveTo(newX, newY))
    {
        return;
    }
    this.x = newX;
    this.y = newY;

    this.updatePosition();
}

Character.prototype.updatePosition = function()
{
    this.el.style.left = this.x * rpg.gridSize + 'px';
    this.el.style.top = this.y * rpg.gridSize + 'px';
}

Character.prototype.actionInDirection = function(x, y)
{
    var newX = this.x + x;
    var newY = this.y + y;

    this.actionAt(newX, newY);
}
Character.prototype.actionAt = function(x, y)
{
    var characterAt = this.map.findCharacterAt(x, y);
    if (characterAt !== null)
    {
        if (!characterAt.isDead())
        {
            var damage = characterAt.dealDamage(this.calculateAttack(), this.name);
            return;
        }
    }

    this.setPosition(x, y);
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
        var droppedItem = new Item();
        droppedItem.createElement('sword');
        droppedItem.name = 'Wooden Sword';
        droppedItem.setPosition(this.x, this.y);

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
