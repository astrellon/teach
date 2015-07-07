function Weapon()
{
    this.attack = 1;
    this.name = 'A weapon';
    this.x = 0;
    this.y = 0;
    
    this.el = null;
    this.location = 'ground';
    this.slotEl = null;
}

Weapon.prototype.createElement = function(className)
{
    this.el = document.createElement('div');
    this.el.classList.add('item');
    this.el.classList.add(className);

    var gameItemsEl = document.getElementById('game-items');
    gameItemsEl.appendChild(this.el);

    var self = this;
    this.el.addEventListener('click', function(e)
    {
        if (self.location === 'in-hand')
        {
            return;
        }

        var dx = Math.abs(self.x - rpg.player.x);
        var dy = Math.abs(self.y - rpg.player.y);
        if (self.location === 'in-slot' || (dx <= 1 && dy <= 1))
        {
            if (self.location === 'in-slot' && self.slotEl.id === 'weapon-slot')
            {
                rpg.player.weapon = null;
            }
            rpg.placeIntoHand(self);
        }

        // Prevent the slot click handler from happening.
        e.stopPropagation();
    });
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

