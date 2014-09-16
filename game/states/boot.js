
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/progressBar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#000000';
    this.game.state.start('preload');
  }
};

module.exports = Boot;
