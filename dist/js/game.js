(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 400, Phaser.AUTO, 'locknchase');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.cursor = this.game.input.keyboard.createCursorKeys();
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT]);
      
      this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      };

      this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.game.physics.arcade.enable(this.player);
      this.player.animations.add('robberAnimate', [0, 1], 8, true);

      this.createWorld();
      this.game.input.onDown.addOnce(this.replaceTiles, this);

    },
    update: function() {
      this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.player, this.coinLayer, this.takeCoin);

      this.movePlayer();
    },

    takeCoin: function(player, tile) {
      map.removeTile(tile.x, tile.y);
    },

    replaceTiles: function() {
      this.map.setLayer(this.coinLayer);
      this.map.replace(12, 13, this.coinLayer);
      
    },

    movePlayer: function() {
      if (this.cursor.left.isDown || this.wasd.left.isDown) {
        this.player.body.velocity.x = -100;
        this.player.animations.play('robberAnimate');
      }
      else if (this.cursor.right.isDown || this.wasd.right.isDown) {
        this.player.body.velocity.x = 100;
        this.player.animations.play('robberAnimate');
      }
      else if (this.cursor.up.isDown || this.wasd.up.isDown) {
        this.player.body.velocity.y = -100;
        this.player.animations.play('robberAnimate');
      }
      else if (this.cursor.down.isDown || this.wasd.down.isDown) {
        this.player.body.velocity.y = 100;
        this.player.animations.play('robberAnimate');
      }
      else {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.stop();
      }
    },

    createWorld: function() {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('tileset');
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();
      this.coinLayer = this.map.createLayer('coins');
      this.coinLayer.enableBody = true;
      this.game.physics.arcade.enable(this.coinLayer, Phaser.Physics.ARCADE, true);
      this.coinLayer.resizeWorld();
      this.map.setCollisionBetween(1, 11, this.layer);
      this.map.setCollision(12, this.coinLayer);
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;

},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.world.centerX, 200, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.spritesheet('player', 'assets/robber.png', 32, 32);
    this.load.image('tileset', 'assets/tiles-lock-n-chase.png')
    this.load.tilemap('map', 'assets/lock-n-chase-tiled.json', null, Phaser.Tilemap.TILED_JSON);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])