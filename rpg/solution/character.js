function Character()
{
    this.x = 0;
    this.y = 0;
    this.el = null;

    this.health = 10;
    this.maxHealth = 10;
    this.attack = 1;
    this.defence = 1;

    this.map = null;
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
