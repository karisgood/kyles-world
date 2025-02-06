<template>
  <div class="photocard-container">
    <div class="input-section">
      <h2>Create Your Photo Card</h2>
      <form @submit.prevent="createPhotoCard" class="photo-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required
            placeholder="Enter your name"
          >
        </div>

        <div class="form-group">
          <label for="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            v-model="formData.age" 
            required
            min="0"
            max="150"
          >
        </div>

        <div class="form-group">
          <label for="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            v-model="formData.date" 
            required
          >
        </div>

        <div class="image-inputs">
          <div v-for="(image, index) in formData.images" :key="index" class="image-input-group">
            <label :for="'image' + index">Image {{ index + 1 }}:</label>
            <input 
              type="file" 
              :id="'image' + index"
              @change="handleImageUpload($event, index)"
              accept="image/*"
              required
            >
            <img v-if="image" :src="image" class="image-preview" :alt="'Preview ' + (index + 1)">
          </div>
        </div>

        <div class="show-html-section">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="showHtml"
            > Show HTML Output
          </label>
        </div>

        <button type="submit" class="submit-button">Create Photo Card</button>
      </form>
    </div>

    <!-- Photo Card Output -->
    <div v-if="showCard" class="photo-card">
      <div class="card-header">
        <h3>{{ formData.name }}</h3>
        <div class="card-details">
          <span>Age: {{ formData.age }}</span>
          <span>Date: {{ formatDate(formData.date) }}</span>
        </div>
      </div>
      
      <div class="photo-grid">
        <div v-for="(image, index) in formData.images" 
             :key="index" 
             class="photo-item"
             :style="{ backgroundImage: `url(${image})` }"
        ></div>
      </div>
    </div>

    <!-- New HTML output section -->
    <div v-if="showHtml && showCard" class="html-output">
      <h3>HTML Output</h3>
      <pre><code>{{ generateHtmlOutput }}</code></pre>
      <button @click="copyHtml" class="copy-button">
        {{ copied ? 'Copied!' : 'Copy HTML' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoCardPage',
  data() {
    return {
      formData: {
        name: '',
        age: '',
        date: '',
        images: [null, null, null]
      },
      showCard: false,
      showHtml: false,
      copied: false
    }
  },
  computed: {
    generateHtmlOutput() {
      if (!this.showCard) return ''
      
      const formattedDate = this.formatDate(this.formData.date)
      return `<div class="photo-card">
  <div class="card-header">
    <h3>${this.formData.name}</h3>
    <div class="card-details">
      <span>Age: ${this.formData.age}</span>
      <span>Date: ${formattedDate}</span>
    </div>
  </div>
  
  <div class="photo-grid">
    ${this.formData.images.map(image => 
      `    <div class="photo-item" style="background-image: url(${image})"></div>`
    ).join('\n')}
  </div>
</div>

<style>
.photo-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-top: 2rem;
}

.card-header {
  padding: 1.5rem;
  background-color: #3498db;
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.card-details {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.photo-item {
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  transition: transform 0.3s;
}

.photo-item:hover {
  transform: scale(1.05);
}
</style>`
    }
  },
  methods: {
    handleImageUpload(event, index) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.formData.images[index] = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    createPhotoCard() {
      this.showCard = true
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    copyHtml() {
      navigator.clipboard.writeText(this.generateHtmlOutput)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.photocard-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}

.input-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.photo-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #2c3e50;
  font-weight: 600;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.image-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.image-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2980b9;
}

/* Photo Card Styling */
.photo-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-top: 2rem;
}

.card-header {
  padding: 1.5rem;
  background-color: #3498db;
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.card-details {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.photo-item {
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  transition: transform 0.3s;
}

.photo-item:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }
  
  .card-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.show-html-section {
  margin-top: 1rem;
  text-align: left;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.html-output {
  margin-top: 2rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.html-output h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.html-output pre {
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.html-output code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

.copy-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #2980b9;
}
</style> 