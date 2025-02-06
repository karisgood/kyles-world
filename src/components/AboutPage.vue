<template>
  <div class="about-page">
    <h1>A Decade of Web Development</h1>
    
    <div class="timeline">
      <div class="timeline-item" v-for="(item, index) in experiences" :key="index">
        <div class="timeline-year">{{ item.year }}</div>
        <div class="timeline-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="tech-stack">
            <span v-for="(tech, techIndex) in item.technologies" 
                  :key="techIndex" 
                  class="tech-badge">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      experiences: [
        {
          year: '2024',
          title: 'Modern Full-Stack Development',
          description: 'Leading development of cloud-native applications using microservices architecture and modern frontend frameworks.',
          technologies: ['Vue 3', 'Docker', 'Kubernetes', 'GraphQL', 'AWS']
        },
        {
          year: '2022',
          title: 'Cloud Architecture & DevOps',
          description: 'Implementing CI/CD pipelines and cloud infrastructure automation for scalable applications.',
          technologies: ['Azure', 'Jenkins', 'Terraform', 'Node.js', 'React']
        },
        {
          year: '2020',
          title: 'Progressive Web Apps',
          description: 'Building responsive and progressive web applications with focus on performance and offline capabilities.',
          technologies: ['React', 'TypeScript', 'Service Workers', 'Redux', 'MongoDB']
        },
        {
          year: '2018',
          title: 'Single Page Applications',
          description: 'Developing complex single page applications with modern JavaScript frameworks.',
          technologies: ['Angular', 'Vue.js', 'Webpack', 'Express', 'PostgreSQL']
        },
        {
          year: '2016',
          title: 'Full Stack JavaScript',
          description: 'Transitioning to full JavaScript stack development with Node.js backend services.',
          technologies: ['Node.js', 'Express', 'MongoDB', 'jQuery', 'Bootstrap']
        },
        {
          year: '2014',
          title: 'Frontend Development',
          description: 'Focusing on responsive design and modern frontend development practices.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'SASS']
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: #3498db;
}

.timeline-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-year {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

.timeline-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 45%;
  margin-top: 2rem;
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-right: 55%;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 55%;
}

.timeline-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background-color: #f8f9fa;
  color: #2c3e50;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid #e9ecef;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 1rem;
  }
  
  .timeline-year {
    left: 1rem;
    transform: none;
  }
  
  .timeline-content {
    width: 80%;
    margin-left: 3rem !important;
  }
}
</style> 