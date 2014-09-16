
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
    },
    update: function() {

      this.movePlayer();
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
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;
