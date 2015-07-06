rpg = {
    'gridSize': 32,
    'player': null,
    'gameWorld': null,

    'output': function(message)
    {
        var outputEl = document.getElementById('action-output');
        var messageEl = document.createElement('div');
        messageEl.classList.add('action-message');
        messageEl.innerHTML = message;
        outputEl.appendChild(messageEl);
    }
};
