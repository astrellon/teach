function Character()
{
    this.x = 0;
    this.y = 0;
    this.el = null;

    this.map = null;
}

Character.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('character');
    this.el.classList.add(className);

    var charactersEl = document.getElementById('game-characters');
    charactersEl.appendChild(this.el);

    var self = this;
    document.body.addEventListener('keydown', function onKeyPress(e)
    {
        if (e.keyCode === 37) // Left
        {
            self.moveCharacter(-1, 0);
        }
        else if (e.keyCode === 39) // Right
        {
            self.moveCharacter(1, 0);
        }
        else if (e.keyCode === 38) // Up
        {
            self.moveCharacter(0, -1);
        }
        else if (e.keyCode === 40) // Down
        {
            self.moveCharacter(0, 1);
        }
    });
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
    
    return this.setPosition(newX, newY);
}

Character.prototype.updatePosition = function()
{
    this.el.style.left = this.x * 32 + 'px';
    this.el.style.top = this.y * 32 + 'px';
}
