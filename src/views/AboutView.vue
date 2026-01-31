<template>
  <div class="about-page">
    <div class="container about-container">
      <!-- back button -->
      <div class="back-nav">
        <router-link :to="{ name: 'home' }" class="back-link">
          <img src="@/assets/icons/ic_back_grey.png" class="back-icon" />
          Back to Houses
        </router-link>
      </div>

      <!-- about content -->
      <div class="about-content">
        <h1>About This App and The Developer</h1>

        <!-- developer intro section -->
        <section class="about-section">
          <h2>About the Developer</h2>
          <p>
            Hello! My name is Hadeel, and I'm the maker of this web application!
            I'm 16 years old and currently studying Software Development at ROC
            van Flevoland. I'm a fast-track student and have completed all first
            year and second year material within just a few months. This
            includes Processing, HTML/CSS, JavaScript, SQL, PHP, frameworks, and
            fullstack development.
          </p>
        </section>

        <!-- app features list -->
        <section class="about-section">
          <h2>Features of this app</h2>
          <ul class="features-list">
            <li>Browse all available house listings</li>
            <li>Search houses by street, city, or postal code</li>
            <li>Sort listings by price or size</li>
            <li>View information about each property</li>
            <li>Create, edit, and delete your own listings</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.back-nav {
  margin-top: 30px;
  margin-bottom: 40px;
}

.back-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--c-secondary);
  font-weight: 600;
}

.back-icon {
  width: 18px;
  margin-right: 10px;
}

.about-content {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.about-content h1 {
  margin-bottom: 30px;
  border-bottom: 3px solid var(--c-primary);
  padding-bottom: 15px;
}

.about-section {
  margin-bottom: 35px;
}

.about-section h2 {
  margin-bottom: 15px;
}

.about-section p {
  line-height: 1.8;
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 10px 0 10px 25px;
  position: relative;
  line-height: 1.6;
}

.features-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--c-primary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .about-content {
    padding: 25px;
  }

  .about-content h1 {
    font-size: 24px;
  }

  .about-section h2 {
    font-size: 18px;
  }

  .about-section p,
  .features-list li {
    font-size: 14px;
  }
}
</style>
