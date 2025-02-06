<template>
  <div class="canvas-page">
    <h2>Fortnite Camo Character</h2>
    <canvas ref="canvas" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: 'CanvasPage',
  mounted() {
    this.drawCharacter();
  },
  methods: {
    drawCharacter() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Colors for camouflage
      const colors = {
        darkGreen: '#2D5A27',
        oliveGreen: '#4A6741',
        brownGreen: '#515744',
        tan: '#8B7355',
        darkBrown: '#3D2B1F'
      };

      // Draw head (helmet)
      ctx.beginPath();
      ctx.fillStyle = colors.darkGreen;
      ctx.arc(200, 150, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw tactical mask
      ctx.beginPath();
      ctx.fillStyle = colors.oliveGreen;
      ctx.fillRect(185, 140, 30, 20);
      
      // Draw body armor
      ctx.beginPath();
      ctx.fillStyle = colors.brownGreen;
      ctx.fillRect(170, 180, 60, 80);
      
      // Draw camo patterns on armor
      this.drawCamoPattern(ctx, 170, 180, 60, 80, colors);
      
      // Draw arms
      ctx.fillStyle = colors.oliveGreen;
      ctx.fillRect(160, 180, 10, 60); // left arm
      ctx.fillRect(230, 180, 10, 60); // right arm
      
      // Draw legs
      ctx.fillStyle = colors.tan;
      ctx.fillRect(180, 260, 15, 70); // left leg
      ctx.fillRect(205, 260, 15, 70); // right leg
      
      // Draw boots
      ctx.fillStyle = colors.darkBrown;
      ctx.fillRect(180, 320, 15, 10); // left boot
      ctx.fillRect(205, 320, 15, 10); // right boot
    },
    
    drawCamoPattern(ctx, x, y, width, height, colors) {
      // Add random camo splotches
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.fillStyle = Object.values(colors)[Math.floor(Math.random() * 5)];
        const spotX = x + Math.random() * width;
        const spotY = y + Math.random() * height;
        ctx.arc(spotX, spotY, 5 + Math.random() * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
</script>

<style scoped>
.canvas-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #8FA778; /* Forest background color */
}
</style> 