function Character()
{
    this.x = 0;
    this.y = 0;
    this.el = null;
}

Character.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('character');
    this.el.classList.add(className);

    var charactersEl = document.getElementById('game-characters');
    charactersEl.appendChild(this.el);
}

Character.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;

    this.updatePosition();

    return true;
}

Character.prototype.updatePosition = function()
{
    this.el.style.left = this.x * 32 + 'px';
    this.el.style.top = this.y * 32 + 'px';
}
