function Item(type, name)
{
    this.attack = 0;
    this.defence = 0;
    this.name = name;
    this.type = type;
    this.x = 0;
    this.y = 0;
    
    this.el = null;
    this.location = 'ground';
    this.slotEl = null;
    this.map = null;
}

Item.prototype.createElement = function()
{
    this.el = document.createElement('div');
    this.el.classList.add('item');
    this.el.classList.add(this.type);

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
            if (self.map != null)
            {
                self.map.removeItem(self);
            }

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

Item.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;

    this.updatePosition();
}

Item.prototype.updatePosition = function()
{
    this.el.style.left = this.x * rpg.gridSize + 'px';
    this.el.style.top = this.y * rpg.gridSize + 'px';
}
