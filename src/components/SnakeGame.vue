<template>
  <div class="snake-game">
    <h2>Snake Game</h2>
    <div class="game-info">
      <p>Score: {{ score }}</p>
      <button @click="startGame" v-if="!isPlaying">Start Game</button>
      <p v-if="gameOver">Game Over! Press Start to play again.</p>
    </div>
    <canvas 
      ref="gameCanvas" 
      width="400" 
      height="400" 
      @keydown.prevent="handleKeyPress"
      tabindex="0"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'SnakeGame',
  data() {
    return {
      canvas: null,
      ctx: null,
      snake: [],
      food: {},
      direction: 'right',
      gameLoop: null,
      isPlaying: false,
      gameOver: false,
      score: 0,
      gridSize: 20,
      tileSize: 20
    }
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.focus()
    this.initGame()
  },
  methods: {
    initGame() {
      // Initialize snake in the middle
      this.snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
      ]
      this.direction = 'right'
      this.score = 0
      this.gameOver = false
      this.spawnFood()
    },
    
    startGame() {
      if (this.gameLoop) clearInterval(this.gameLoop)
      this.initGame()
      this.isPlaying = true
      this.gameLoop = setInterval(this.gameStep, 150)
    },

    spawnFood() {
      this.food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      }
      // Prevent food from spawning on snake
      while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y)) {
        this.food = {
          x: Math.floor(Math.random() * this.gridSize),
          y: Math.floor(Math.random() * this.gridSize)
        }
      }
    },

    handleKeyPress(e) {
      const key = e.key
      if (key === 'ArrowUp' && this.direction !== 'down') this.direction = 'up'
      if (key === 'ArrowDown' && this.direction !== 'up') this.direction = 'down'
      if (key === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left'
      if (key === 'ArrowRight' && this.direction !== 'left') this.direction = 'right'
    },

    gameStep() {
      const head = { ...this.snake[0] }

      // Move head based on direction
      switch (this.direction) {
        case 'up': head.y--; break
        case 'down': head.y++; break
        case 'left': head.x--; break
        case 'right': head.x++; break
      }

      // Check for collisions
      if (this.checkCollision(head)) {
        this.endGame()
        return
      }

      // Add new head
      this.snake.unshift(head)

      // Check if food is eaten
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score += 10
        this.spawnFood()
      } else {
        // Remove tail if no food eaten
        this.snake.pop()
      }

      this.draw()
    },

    checkCollision(head) {
      // Wall collision
      if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
        return true
      }

      // Self collision
      return this.snake.some(segment => segment.x === head.x && segment.y === head.y)
    },

    draw() {
      // Clear canvas
      this.ctx.fillStyle = '#f0f0f0'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      // Draw snake
      this.ctx.fillStyle = '#3498db'
      this.snake.forEach(segment => {
        this.ctx.fillRect(
          segment.x * this.tileSize,
          segment.y * this.tileSize,
          this.tileSize - 1,
          this.tileSize - 1
        )
      })

      // Draw food
      this.ctx.fillStyle = '#e74c3c'
      this.ctx.fillRect(
        this.food.x * this.tileSize,
        this.food.y * this.tileSize,
        this.tileSize - 1,
        this.tileSize - 1
      )
    },

    endGame() {
      clearInterval(this.gameLoop)
      this.isPlaying = false
      this.gameOver = true
    }
  },
  beforeUnmount() {
    if (this.gameLoop) clearInterval(this.gameLoop)
  }
}
</script>

<style scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game-info {
  margin-bottom: 20px;
}

canvas {
  border: 2px solid #3498db;
  border-radius: 4px;
  background-color: #f0f0f0;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
}

button:hover {
  background-color: #2980b9;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style> 