<template>
  <div class="kitty-cat">
    <h2>Kitty Cat Page</h2>
    <p>Welcome to the purrfect page! 🐱</p>
    
    <div class="cat-grid">
      <div v-for="cat in cats" :key="cat.id" class="cat-card">
        <img :src="cat.imageUrl" :alt="cat.name">
        <h3>{{ cat.name }}</h3>
        <p>{{ cat.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KittyCatPage',
  data() {
    return {
      cats: [
        { id: 1, name: 'Whiskers', description: 'A playful tabby', imageUrl: 'https://placekitten.com/200/200' },
        { id: 2, name: 'Luna', description: 'Mysterious black cat', imageUrl: 'https://placekitten.com/201/201' },
        { id: 3, name: 'Oliver', description: 'Orange troublemaker', imageUrl: 'https://placekitten.com/202/202' },
        { id: 4, name: 'Bella', description: 'Elegant Siamese', imageUrl: 'https://placekitten.com/203/203' },
        { id: 5, name: 'Max', description: 'Lazy Persian', imageUrl: 'https://placekitten.com/204/204' },
        { id: 6, name: 'Lucy', description: 'Curious calico', imageUrl: 'https://placekitten.com/205/205' },
        { id: 7, name: 'Milo', description: 'Energetic kitten', imageUrl: 'https://placekitten.com/206/206' },
        { id: 8, name: 'Sophie', description: 'Gentle giant', imageUrl: 'https://placekitten.com/207/207' },
        { id: 9, name: 'Charlie', description: 'Sleepy Maine Coon', imageUrl: 'https://placekitten.com/208/208' },
        { id: 10, name: 'Tiger', description: 'Fierce hunter', imageUrl: 'https://placekitten.com/209/209' },
        { id: 11, name: 'Lily', description: 'Sweet ragdoll', imageUrl: 'https://placekitten.com/210/210' },
        { id: 12, name: 'Oscar', description: 'Grumpy but lovable', imageUrl: 'https://placekitten.com/211/211' },
        { id: 13, name: 'Daisy', description: 'Window watcher', imageUrl: 'https://placekitten.com/212/212' },
        { id: 14, name: 'Leo', description: 'Acrobatic athlete', imageUrl: 'https://placekitten.com/213/213' },
        { id: 15, name: 'Nala', description: 'Purring princess', imageUrl: 'https://placekitten.com/214/214' }
      ]
    }
  }
}
</script>

<style scoped>
.kitty-cat {
  padding: 20px;
  margin: 20px;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.cat-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cat-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.cat-card h3 {
  margin: 10px 0 5px;
  color: #333;
}

.cat-card p {
  margin: 5px 0;
  color: #666;
}
</style> 