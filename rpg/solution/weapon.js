function Weapon()
{
    this.attack = 1;
    this.name = 'A weapon';
    this.el = null;
}

Weapon.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('item');
    this.el.classList.add(className);

    var gameWorldEl = document.getElementById('game-world');
    gameWorldEl.appendChild(this.el);
}

Weapon.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;

    this.updatePosition();
}

Weapon.prototype.updatePosition = function()
{
    this.el.style.left = this.x * rpg.gridSize + 'px';
    this.el.style.top = this.y * rpg.gridSize + 'px';
}

