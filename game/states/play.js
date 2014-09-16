
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
