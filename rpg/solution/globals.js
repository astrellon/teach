rpg = {
    'gridSize': 32,
    'player': null,
    'gameWorld': null,
    'inventorySize': 8,
    'itemInHand': null,

    'createInventory': function()
    {
        var inventoryEl = document.getElementById('inventory');
        for (var i = 0; i < rpg.inventorySize; i++)
        {
            var slotEl = document.createElement('span');
            slotEl.classList.add('inv-slot');
            slotEl.id = 'inv-slot-' + i;
            inventoryEl.appendChild(slotEl);
        }
    },

    'createHand': function()
    {
        
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
