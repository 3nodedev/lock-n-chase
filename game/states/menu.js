
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Geo', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Lock \'n\' Chase', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    var text = 'press the up arrow key to start';

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.height-80, text, { font: '35px Geo', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    if(this.upKey.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
