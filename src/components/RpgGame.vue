<template>
  <div class="rpg-game">
    <h2>Simple RPG</h2>
    <div class="game-container">
      <canvas 
        ref="gameCanvas" 
        width="800" 
        height="600"
        @keydown.prevent="handleKeyPress"
        @keyup.prevent="handleKeyUp"
        tabindex="0"
      ></canvas>
      
      <div class="game-controls">
        <p>Use arrow keys to move</p>
        <p>Space to interact with NPCs</p>
        <p>Press 'X' to attack enemies</p>
        <div class="stats">
          <p>Health: {{ player.health }}/100</p>
          <p>Gold: {{ player.gold }}</p>
          <p>Level: {{ player.level }}</p>
          <p>Attack Power: {{ player.attackPower }}</p>
        </div>
        <div v-if="dialogueText" class="dialogue-box">
          {{ dialogueText }}
        </div>
        <button v-if="gameOver" @click="restartGame" class="restart-button">
          Restart Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RpgGame',
  data() {
    return {
      canvas: null,
      ctx: null,
      gameLoop: null,
      player: {
        x: 400,
        y: 300,
        speed: 5,
        size: 32,
        health: 100,
        gold: 0,
        level: 1,
        color: '#3498db',
        attackPower: 25,
        isAttacking: false,
        attackCooldown: 0
      },
      dialogueText: '',
      interactionRange: 50, // Distance for NPC interaction
      keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false
      },
      npcs: [
        { 
          x: 200, 
          y: 200, 
          size: 32, 
          color: '#e74c3c', 
          type: 'enemy',
          health: 100,
          isHit: false 
        },
        { x: 600, y: 400, size: 32, color: '#2ecc71', type: 'friend' },
        { x: 300, y: 500, size: 32, color: '#f1c40f', type: 'merchant' }
      ],
      items: [
        { x: 100, y: 100, size: 20, color: '#f39c12', type: 'gold' },
        { x: 700, y: 500, size: 20, color: '#e74c3c', type: 'health' }
      ],
      particles: [],
      gameOver: false,
      particleColors: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db'],
      attackRange: 60
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      this.canvas = this.$refs.gameCanvas
      this.ctx = this.canvas.getContext('2d')
      this.canvas.focus()
      
      this.gameLoop = setInterval(this.update, 1000 / 60) // 60 FPS
    },
    
    update() {
      if (!this.gameOver) {
        this.movePlayer()
        this.checkCollisions()
        if (this.player.attackCooldown > 0) {
          this.player.attackCooldown--
        }
      }
      if (this.particles.length > 0) {
        this.updateParticles()
      }
      this.draw()
    },
    
    movePlayer() {
      if (this.keys.up && this.player.y > 0) {
        this.player.y -= this.player.speed
      }
      if (this.keys.down && this.player.y < this.canvas.height - this.player.size) {
        this.player.y += this.player.speed
      }
      if (this.keys.left && this.player.x > 0) {
        this.player.x -= this.player.speed
      }
      if (this.keys.right && this.player.x < this.canvas.width - this.player.size) {
        this.player.x += this.player.speed
      }
    },
    
    checkCollisions() {
      // Check collisions with items
      this.items = this.items.filter(item => {
        if (this.isColliding(this.player, item)) {
          this.collectItem(item)
          return false
        }
        return true
      })
      
      // Check collisions with NPCs
      this.npcs.forEach(npc => {
        if (this.isColliding(this.player, npc)) {
          this.handleNpcCollision(npc)
        }
      })
    },
    
    isColliding(obj1, obj2) {
      return obj1.x < obj2.x + obj2.size &&
             obj1.x + obj1.size > obj2.x &&
             obj1.y < obj2.y + obj2.size &&
             obj1.y + obj1.size > obj2.y
    },
    
    collectItem(item) {
      if (item.type === 'gold') {
        this.player.gold += 10
      } else if (item.type === 'health' && this.player.health < 100) {
        this.player.health = Math.min(100, this.player.health + 20)
      }
    },
    
    handleNpcCollision(npc) {
      if (npc.type === 'enemy') {
        this.player.health = Math.max(0, this.player.health - 1)
        if (this.player.health === 0) {
          this.explodePlayer()
        }
      }
    },
    
    explodePlayer() {
      this.gameOver = true
      // Create explosion particles
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: this.player.x + this.player.size / 2,
          y: this.player.y + this.player.size / 2,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          size: Math.random() * 8 + 2,
          color: this.particleColors[Math.floor(Math.random() * this.particleColors.length)],
          life: 1
        })
      }
    },

    updateParticles() {
      this.particles = this.particles.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.02
        return particle.life > 0
      })
    },
    
    draw() {
      // Clear canvas
      this.ctx.fillStyle = '#ecf0f1'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      
      // Draw items
      this.items.forEach(item => {
        this.ctx.fillStyle = item.color
        this.ctx.fillRect(item.x, item.y, item.size, item.size)
      })
      
      // Draw NPCs
      this.npcs.forEach(npc => {
        this.ctx.fillStyle = npc.isHit ? '#ff0000' : npc.color
        this.ctx.fillRect(npc.x, npc.y, npc.size, npc.size)
        
        if (npc.type === 'enemy') {
          // Health bar background
          this.ctx.fillStyle = '#ff0000'
          this.ctx.fillRect(npc.x, npc.y - 10, npc.size, 5)
          
          // Health bar
          this.ctx.fillStyle = '#00ff00'
          this.ctx.fillRect(
            npc.x, 
            npc.y - 10, 
            (npc.health / 100) * npc.size, 
            5
          )
        }
      })
      
      // Draw player if not game over
      if (!this.gameOver) {
        this.ctx.fillStyle = this.player.color
        this.ctx.fillRect(
          this.player.x,
          this.player.y,
          this.player.size,
          this.player.size
        )
      }

      // Draw particles
      this.particles.forEach(particle => {
        this.ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0')
        this.ctx.beginPath()
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        this.ctx.fill()
      })

      // Draw interaction range indicator
      const nearbyNpc = this.findNearbyNpc()
      if (nearbyNpc && !this.gameOver) {
        this.ctx.strokeStyle = '#3498db'
        this.ctx.beginPath()
        this.ctx.arc(
          nearbyNpc.x + nearbyNpc.size/2,
          nearbyNpc.y + nearbyNpc.size/2,
          this.interactionRange/2,
          0,
          Math.PI * 2
        )
        this.ctx.stroke()
      }

      // Draw attack range when attacking
      if (this.player.isAttacking) {
        this.ctx.strokeStyle = '#e74c3c'
        this.ctx.beginPath()
        this.ctx.arc(
          this.player.x + this.player.size/2,
          this.player.y + this.player.size/2,
          this.attackRange,
          0,
          Math.PI * 2
        )
        this.ctx.stroke()
      }
    },
    
    handleKeyPress(e) {
      switch(e.key) {
        case 'ArrowUp': this.keys.up = true; break
        case 'ArrowDown': this.keys.down = true; break
        case 'ArrowLeft': this.keys.left = true; break
        case 'ArrowRight': this.keys.right = true; break
        case ' ': this.handleSpaceBar(); break
        case 'x': case 'X': this.attack(); break
      }
    },
    
    handleKeyUp(e) {
      switch(e.key) {
        case 'ArrowUp': this.keys.up = false; break
        case 'ArrowDown': this.keys.down = false; break
        case 'ArrowLeft': this.keys.left = false; break
        case 'ArrowRight': this.keys.right = false; break
      }
    },

    handleSpaceBar() {
      const nearbyNpc = this.findNearbyNpc()
      if (nearbyNpc) {
        this.interactWithNpc(nearbyNpc)
      }
    },

    findNearbyNpc() {
      return this.npcs.find(npc => {
        const distance = Math.sqrt(
          Math.pow(this.player.x - npc.x, 2) + 
          Math.pow(this.player.y - npc.y, 2)
        )
        return distance < this.interactionRange
      })
    },

    interactWithNpc(npc) {
      switch(npc.type) {
        case 'merchant':
          if (this.player.gold >= 50) {
            this.player.gold -= 50
            this.player.health = Math.min(100, this.player.health + 50)
            this.showDialogue('Merchant: Here\'s a health potion! (-50 gold)')
          } else {
            this.showDialogue('Merchant: You need 50 gold for a health potion!')
          }
          break
        case 'friend':
          this.player.level += 1
          this.showDialogue('Friend: You gained a level! Keep up the good work!')
          break
        case 'enemy':
          this.showDialogue('Enemy: Stay back or face the consequences!')
          break
      }
    },

    showDialogue(text) {
      this.dialogueText = text
      setTimeout(() => {
        this.dialogueText = ''
      }, 3000)
    },

    attack() {
      if (this.player.attackCooldown > 0) return;
      
      this.player.isAttacking = true;
      this.player.attackCooldown = 20; // 20 frames cooldown

      // Check for enemies in range
      this.npcs.forEach(npc => {
        if (npc.type === 'enemy') {
          const distance = Math.sqrt(
            Math.pow(this.player.x - npc.x, 2) + 
            Math.pow(this.player.y - npc.y, 2)
          );
          
          if (distance < this.attackRange) {
            npc.health -= this.player.attackPower;
            npc.isHit = true;
            setTimeout(() => { npc.isHit = false; }, 200);

            if (npc.health <= 0) {
              this.defeatEnemy(npc);
            }
          }
        }
      });

      setTimeout(() => {
        this.player.isAttacking = false;
      }, 200);
    },

    defeatEnemy(enemy) {
      // Remove the enemy
      this.npcs = this.npcs.filter(npc => npc !== enemy);
      
      // Reward player
      this.player.gold += 50;
      this.player.level += 1;
      this.player.attackPower += 5;
      this.showDialogue('Enemy defeated! +50 gold, Level Up!');
      
      // Spawn explosion particles
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: enemy.x + enemy.size / 2,
          y: enemy.y + enemy.size / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          size: Math.random() * 6 + 2,
          color: '#e74c3c',
          life: 1
        });
      }
    },

    restartGame() {
      this.gameOver = false
      this.particles = []
      this.player = {
        x: 400,
        y: 300,
        speed: 5,
        size: 32,
        health: 100,
        gold: 0,
        level: 1,
        color: '#3498db',
        attackPower: 25,
        isAttacking: false,
        attackCooldown: 0
      }
      this.items = [
        { x: 100, y: 100, size: 20, color: '#f39c12', type: 'gold' },
        { x: 700, y: 500, size: 20, color: '#e74c3c', type: 'health' }
      ]
      this.npcs = [
        { 
          x: 200, 
          y: 200, 
          size: 32, 
          color: '#e74c3c', 
          type: 'enemy',
          health: 100,
          isHit: false 
        },
        { x: 600, y: 400, size: 32, color: '#2ecc71', type: 'friend' },
        { x: 300, y: 500, size: 32, color: '#f1c40f', type: 'merchant' }
      ]
    }
  },
  beforeUnmount() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop)
    }
  }
}
</script>

<style scoped>
.rpg-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.game-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

canvas {
  border: 2px solid #3498db;
  border-radius: 4px;
  background-color: #ecf0f1;
}

.game-controls {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stats {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

p {
  margin: 0.5rem 0;
  color: #2c3e50;
}

.dialogue-box {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.restart-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  width: 100%;
}

.restart-button:hover {
  background-color: #2980b9;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #e74c3c;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.game-controls p {
  margin: 0.5rem 0;
  color: #2c3e50;
  font-size: 0.9rem;
}
</style> 