<template>
  <div class="heading-container">
    <div class="column">
      <img src="https://placehold.co/600x400" alt="First column image">
      <h2>First Column</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <button class="cta-button">Learn More</button>
    </div>
    
    <div class="column">
      <img src="https://placehold.co/600x400" alt="Second column image">
      <h2>Second Column</h2>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <button class="cta-button">Get Started</button>
    </div>
    
    <div class="column">
      <img src="https://placehold.co/600x400" alt="Third column image">
      <h2>Third Column</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      <button class="cta-button">Contact Us</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadingComponent'
}
</script>

<style scoped>
.heading-container {
  display: flex;
  justify-content: space-around;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  flex: 1;
  margin: 0 1rem;
  text-align: center;
}

.column img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.column h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.column p {
  color: #666;
  margin-bottom: 1.5rem;
}

.cta-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #2980b9;
}
</style> 