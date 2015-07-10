rpg = {
    'gridSize': 32,
    'inventorySize': 8,
    'player': null,
    'map': null,
    'itemInHand': null,
    'maps': {},

    'setup': function()
    {
        rpg.setupInventory();

        document.body.addEventListener('mousemove', function(e)
        {
            if (rpg.itemInHand != null)
            {
                var style = document.getElementById('player-hand').style;
                style.left = e.pageX;
                style.top = e.pageY;
            }
        });
    },

    'changeToMap': function(map)
    {
        if (rpg.map != null)
        {
            rpg.map.detachObjects();
        }
        rpg.map = map;
        if (map != null)
        {
            map.attachObjects();
        }
    },

    'gameTick': function(characterComplete, waitTime)
    {
        if (rpg.player.isDead())
        {
            rpg.output('Game over!');
            return;
        }

        if (isNaN(waitTime) || waitTime < 0)
        {
            waitTime = 10;
        }

        if (rpg.map.characters.length === 0)
        {
            rpg.output('No characters');
            return;
        }

        var nextCharacter = rpg.map.findNextCharacter(characterComplete);
        setTimeout(function() {
            nextCharacter.yourTurn();
        }, waitTime);
    },

    'placeIntoHand': function(item)
    {
        if (rpg.itemInHand != null)
        {
            return false;
        }

        rpg.itemInHand = item;
        item.location = 'in-hand';
        item.slotEl = null;
        document.getElementById('player-hand').appendChild(item.el);

        item.el.style.left = '';
        item.el.style.top = '';
    },

    'clearHand': function()
    {
        rpg.itemInHand = null;
    },

    'setupInventory': function()
    {
        var inventoryEl = document.getElementById('stash');
        for (var i = 0; i < rpg.inventorySize; i++)
        {
            var slotEl = document.getElementById('inv-slot-' + i);
            slotEl.addEventListener('click', rpg.handleInvClick);
        }
        
        document.getElementById('weapon-slot').addEventListener('click', function(e)
        {
            if (rpg.itemInHand == null)
            {
                return;
            }

            if (rpg.itemInHand.type === 'weapon')
            {
                rpg.player.weapon = rpg.itemInHand;
                rpg.handleInvClick.call(this, e);
            }
        });
        document.getElementById('armour-slot').addEventListener('click', function(e)
        {
            if (rpg.itemInHand == null)
            {
                return;
            }

            if (rpg.itemInHand.type === 'armour')
            {
                rpg.player.armour = rpg.itemInHand;
                rpg.handleInvClick.call(this, e);
            }
        });
    },

    'handleInvClick': function(e)
    {
        if (rpg.itemInHand != null)
        {
            this.appendChild(rpg.itemInHand.el);
            rpg.itemInHand.location = 'in-slot';
            rpg.itemInHand.slotEl = this;
            rpg.clearHand();
        }
    },

    'output': function(message)
    {
        var outputEl = document.getElementById('action-output');
        var messageEl = document.createElement('div');
        messageEl.classList.add('action-message');
        messageEl.innerHTML = message;
        outputEl.appendChild(messageEl);
    },

    'lineTest': function (x0, y0, x1, y1, callback)
    {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx-dy;

        while (true)
        {
            //setPixel(x0,y0);  // Do what you need to for this
            if (!callback(x0, y0))
            {
                return false;
            }

            if ((x0 == x1) && (y0 == y1)) 
            {
                break;
            }

            var e2 = 2 * err;
            if (e2 >- dy)
            { 
                err -= dy; 
                x0 += sx; 
            }
            if (e2 < dx)
            {
                err += dx; 
                y0 += sy;
            }
        }

        return true;
    }
};
