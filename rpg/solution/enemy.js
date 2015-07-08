function EnemyController(character)
{
    this.character = character;
}
EnemyController.prototype.onYourTurn = function()
{
    var dx = this.character.x - rpg.player.x;
    var dy = this.character.y - rpg.player.y;
    var actionX = dx > 0 ? -1 : (dx < 0 ? 1 : 0);
    var actionY = dy > 0 ? -1 : (dy < 0 ? 1 : 0);
    var waitTime = 50;
    if (this.character.actionInDirection(actionX, actionY))
    {
        waitTime = 300;
    }
    this.character.turnComplete(waitTime);
}
