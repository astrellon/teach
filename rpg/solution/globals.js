rpg = {
    'gridSize': 32,
    'inventorySize': 8,
    'player': null,
    'gameWorld': null,
    'itemInHand': null,

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
            if (rpg.itemInHand instanceof Weapon)
            {
                rpg.player.weapon = rpg.itemInHand;
                rpg.handleInvClick.call(this, e);
            }
        });
        document.getElementById('armour-slot').addEventListener('click', function(e)
        {
            if (!(rpg.itemInHand instanceof Weapon))
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
    }
};
