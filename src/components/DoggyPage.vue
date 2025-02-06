<template>
  <div class="dogs-container">
    <h2>Our Furry Friends</h2>
    <div class="dog-content">
      <p>Welcome to our dogs section! Here you can find information about different dog breeds.</p>
      <div class="dog-list">
        <ul>
          <li>Golden Retriever</li>
          <li>German Shepherd</li>
          <li>Labrador</li>
          <li>Poodle</li>
          <li>Husky</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoggyPage'
}
</script>


<style scoped>
.dogs-container {
  margin: 20px;
  padding: 20px;
}

.dog-list ul {
  list-style-type: none;
  padding: 0;
}

.dog-list li {
  margin: 10px 0;
  color: #666;
}

h2 {
  color: #42b983;
}
</style> 