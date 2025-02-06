<template>
  <div class="signature-generator">
    <h2>Email Signature Generator</h2>
    
    <div class="generator-container">
      <!-- Input Form -->
      <div class="input-section">
        <h3>Enter Your Details</h3>
        <form @submit.prevent="generateSignature" class="signature-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name"
              placeholder="John Doe"
              required
            >
          </div>

          <div class="form-group">
            <label for="title">Job Title</label>
            <input 
              type="text" 
              id="title" 
              v-model="formData.title"
              placeholder="Senior Developer"
              required
            >
          </div>

          <div class="form-group">
            <label for="company">Company</label>
            <input 
              type="text" 
              id="company" 
              v-model="formData.company"
              placeholder="Tech Corp"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email"
              placeholder="john@example.com"
              required
            >
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone"
              placeholder="+1 (555) 123-4567"
            >
          </div>

          <div class="form-group">
            <label for="website">Website</label>
            <input 
              type="url" 
              id="website" 
              v-model="formData.website"
              placeholder="www.example.com"
            >
          </div>

          <div class="form-group">
            <label for="linkedin">LinkedIn</label>
            <input 
              type="url" 
              id="linkedin" 
              v-model="formData.linkedin"
              placeholder="linkedin.com/in/johndoe"
            >
          </div>

          <div class="style-options">
            <h4>Style Options</h4>
            <div class="color-picker">
              <label for="themeColor">Theme Color</label>
              <input 
                type="color" 
                id="themeColor" 
                v-model="formData.themeColor"
              >
            </div>
            <div class="font-selector">
              <label for="font">Font Family</label>
              <select id="font" v-model="formData.font">
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </div>
          </div>

          <button type="submit" class="generate-button">Generate Signature</button>
        </form>
      </div>

      <!-- Preview Section -->
      <div class="preview-section">
        <h3>Preview</h3>
        <div class="signature-preview" :style="{ fontFamily: formData.font }">
          <div class="name" :style="{ color: formData.themeColor }">
            {{ formData.name }}
          </div>
          <div class="title">{{ formData.title }}</div>
          <div class="company">{{ formData.company }}</div>
          <div class="separator" :style="{ backgroundColor: formData.themeColor }"></div>
          <div class="contact-info">
            <div v-if="formData.email">
              <span class="label">Email:</span> 
              <a :href="'mailto:' + formData.email" :style="{ color: formData.themeColor }">
                {{ formData.email }}
              </a>
            </div>
            <div v-if="formData.phone">
              <span class="label">Phone:</span> {{ formData.phone }}
            </div>
            <div v-if="formData.website">
              <span class="label">Web:</span> 
              <a :href="formData.website" target="_blank" :style="{ color: formData.themeColor }">
                {{ formData.website.replace(/^https?:\/\//, '') }}
              </a>
            </div>
            <div v-if="formData.linkedin">
              <span class="label">LinkedIn:</span> 
              <a :href="formData.linkedin" target="_blank" :style="{ color: formData.themeColor }">
                {{ formData.linkedin.replace(/^https?:\/\//, '') }}
              </a>
            </div>
          </div>
        </div>

        <div class="action-buttons" v-if="showPreview">
          <button @click="copyHTML" class="action-button">
            {{ copied ? 'Copied!' : 'Copy HTML' }}
          </button>
          <button @click="copyPlainText" class="action-button">
            Copy Plain Text
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailSignature',
  data() {
    return {
      formData: {
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        linkedin: '',
        themeColor: '#3498db',
        font: 'Arial, sans-serif'
      },
      copied: false,
      showPreview: false
    }
  },
  methods: {
    generateSignature() {
      this.showPreview = true
    },
    copyHTML() {
      const signatureHTML = this.generateHTML()
      navigator.clipboard.writeText(signatureHTML)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
    copyPlainText() {
      const plainText = this.generatePlainText()
      navigator.clipboard.writeText(plainText)
    },
    generateHTML() {
      return `<div style="font-family: ${this.formData.font}; max-width: 500px; padding: 20px;">
  <div style="color: ${this.formData.themeColor}; font-size: 18px; font-weight: bold;">
    ${this.formData.name}
  </div>
  <div style="font-size: 14px; color: #666;">
    ${this.formData.title}
  </div>
  <div style="font-size: 14px; color: #666;">
    ${this.formData.company}
  </div>
  <div style="height: 1px; background-color: ${this.formData.themeColor}; margin: 10px 0;"></div>
  <div style="font-size: 12px; color: #666;">
    ${this.formData.email ? `Email: <a href="mailto:${this.formData.email}" style="color: ${this.formData.themeColor}; text-decoration: none;">${this.formData.email}</a><br>` : ''}
    ${this.formData.phone ? `Phone: ${this.formData.phone}<br>` : ''}
    ${this.formData.website ? `Web: <a href="${this.formData.website}" style="color: ${this.formData.themeColor}; text-decoration: none;">${this.formData.website.replace(/^https?:\/\//, '')}</a><br>` : ''}
    ${this.formData.linkedin ? `LinkedIn: <a href="${this.formData.linkedin}" style="color: ${this.formData.themeColor}; text-decoration: none;">${this.formData.linkedin.replace(/^https?:\/\//, '')}</a>` : ''}
  </div>
</div>`
    },
    generatePlainText() {
      return `${this.formData.name}
${this.formData.title}
${this.formData.company}

Email: ${this.formData.email}
${this.formData.phone ? `Phone: ${this.formData.phone}` : ''}
${this.formData.website ? `Web: ${this.formData.website}` : ''}
${this.formData.linkedin ? `LinkedIn: ${this.formData.linkedin}` : ''}`
    }
  }
}
</script>

<style scoped>
.signature-generator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.generator-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.input-section, .preview-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2, h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.signature-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

input, select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.style-options {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.color-picker, .font-selector {
  margin-top: 1rem;
}

.generate-button, .action-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-button:hover, .action-button:hover {
  background-color: #2980b9;
}

.signature-preview {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.title, .company {
  font-size: 14px;
  color: #666;
  margin-bottom: 0.25rem;
}

.separator {
  height: 1px;
  margin: 1rem 0;
}

.contact-info {
  font-size: 12px;
  color: #666;
}

.contact-info div {
  margin: 0.25rem 0;
}

.label {
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .generator-container {
    grid-template-columns: 1fr;
  }
}
</style> 