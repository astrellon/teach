function PlayerController(character)
{
    this.character = character;
    
    var self = this;
    document.body.addEventListener('keydown', function onKeyPress(e)
    {
        if (!self.character.currentlyYourTurn)
        {
            return;
        }

        var performedAction = 0;
        if (e.keyCode === 37 && self.character.actionInDirection(-1, 0)) // Left
        {
            performedAction = 300;
        }
        else if (e.keyCode === 39 && self.character.actionInDirection(1, 0)) // Right
        {
            performedAction = 300;
        }
        else if (e.keyCode === 38 && self.character.actionInDirection(0, -1)) // Up
        {
            performedAction = 300;
        }
        else if (e.keyCode === 40 && self.character.actionInDirection(0, 1)) // Down
        {
            performedAction = 300;
        }
        else if (e.keyCode === 32)
        {
            rpg.output(self.character.name + ' passed turn.');
            performedAction = 10;
        }

        if (performedAction > 0)
        {
            self.character.turnComplete(performedAction);
        }
    });
}
PlayerController.prototype.onYourTurn = function()
{

}
