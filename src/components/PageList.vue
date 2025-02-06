<template>
  <div class="page-list">
    <h2>Available Pages</h2>
    
    <div class="search-section">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search pages..."
        class="search-input"
      >
    </div>

    <div class="pages-grid">
      <div 
        v-for="route in filteredRoutes" 
        :key="route.path"
        class="page-item"
      >
        <button 
          @click="navigateToPage(route.path)"
          class="page-button"
          :class="{ active: currentPath === route.path }"
        >
          <span class="page-name">{{ formatRouteName(route.name) }}</span>
          <span class="page-path">{{ route.path }}</span>
        </button>
      </div>
    </div>

    <div v-if="filteredRoutes.length === 0" class="no-results">
      No pages found matching "{{ searchQuery }}"
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

export default {
  name: 'PageList',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const searchQuery = ref('')
    const currentPath = computed(() => route.path)

    const filteredRoutes = computed(() => {
      const routes = router.getRoutes()
      if (!searchQuery.value) return routes

      const query = searchQuery.value.toLowerCase()
      return routes.filter(route => 
        route.name?.toLowerCase().includes(query) || 
        route.path.toLowerCase().includes(query)
      )
    })

    const navigateToPage = (path) => {
      router.push(path)
    }

    const formatRouteName = (name) => {
      if (!name) return 'Unnamed Route'
      return name
        .replace(/([A-Z])/g, ' $1')
        .trim()
    }

    return {
      searchQuery,
      filteredRoutes,
      currentPath,
      navigateToPage,
      formatRouteName
    }
  }
}
</script>

<style scoped>
.page-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.search-section {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.page-button {
  width: 100%;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.page-button:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.page-button.active {
  background-color: #3498db;
  border-color: #3498db;
  color: white;
}

.page-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.page-path {
  font-size: 0.9rem;
  color: #666;
}

.page-button.active .page-path {
  color: #fff;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 2rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .pages-grid {
    grid-template-columns: 1fr;
  }
  
  .page-list {
    padding: 1rem;
  }
}
</style>