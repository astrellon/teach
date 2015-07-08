function Player()
{
    this.character = new Character();
    this.character.createElement('player');
    this.character.name = 'Player';
    
    var self = this;
    document.body.addEventListener('keydown', function onKeyPress(e)
    {
        if (e.keyCode === 37) // Left
        {
            self.character.actionInDirection(-1, 0);
        }
        else if (e.keyCode === 39) // Right
        {
            self.character.actionInDirection(1, 0);
        }
        else if (e.keyCode === 38) // Up
        {
            self.character.actionInDirection(0, -1);
        }
        else if (e.keyCode === 40) // Down
        {
            self.character.actionInDirection(0, 1);
        }
    });
}
