function Character()
{
    this.x = 0;
    this.y = 0;
    this.el = null;

    this.health = 10;
    this.maxHealth = 10;
    this.attack = 1;
    this.defence = 0;

    this.weapon = null;
    this.armour = null;

    this.map = null;

    this.name = 'No name';
    this.inventory = [];
}

Character.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('character');
    this.el.classList.add(className);

    var gameWorldEl = document.getElementById('game-world');
    gameWorldEl.appendChild(this.el);
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
            var damage = characterAt.dealDamage(this.calculateAttack());
            rpg.output(this.name + ' deals ' + damage + ' to ' + characterAt.name);
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

Character.prototype.dealDamage = function(damage)
{
    damage -= this.calculateArmour();
    if (damage < 0)
    {
        damage = 0;
    }

    this.health -= damage;

    return damage;
}

Character.prototype.isDead = function()
{
    return this.health <= 0;
}

Character.prototype.addToInventory = function(item)
{
    if (this.inventory.indexOf(item) >= 0)
    {
        return;
    }

    this.inventory.push(item);
}
