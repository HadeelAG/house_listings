<template>
  <nav class="navbar">
    <div class="container nav-content">
      <!-- logo -->
      <img :src="logoImage" alt="Logo" class="logo" />

      <!-- navigation links -->
      <div class="nav-links">
        <!-- links for houses -->
        <router-link
          :to="{ name: 'home' }"
          class="nav-item"
          custom
          v-slot="{ isActive, navigate }"
        >
          <a @click="navigate" :class="{ active: isActive }">
            <img
              :src="isActive ? iconHomeActive : iconHomeGrey"
              alt="Home"
              class="nav-icon"
            />
            <span class="nav-text">Houses</span>
          </a>
        </router-link>
        <!-- about link -->
        <router-link
          :to="{ name: 'about' }"
          class="nav-item"
          custom
          v-slot="{ isActive, navigate }"
        >
          <a @click="navigate" :class="{ active: isActive }">
            <img
              :src="isActive ? iconInfoActive : iconInfoGrey"
              alt="About"
              class="nav-icon"
            />
            <span class="nav-text">About</span>
          </a>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import imgLogo from "@/assets/images/img_logo.png";
import icHomeActive from "@/assets/icons/ic_mobile_navigarion_home_active.png";
import icHomeGrey from "@/assets/icons/ic_mobile_navigarion_home.png";
import icInfoActive from "@/assets/icons/ic_mobile_navigarion_info_active.png";
import icInfoGrey from "@/assets/icons/ic_mobile_navigarion_info.png";

export default {
  data() {
    return {
      logoImage: imgLogo, // logo image
      iconHomeActive: icHomeActive, // active state for home icon
      iconHomeGrey: icHomeGrey, // inactive state for home icon
      iconInfoActive: icInfoActive, // active state for about icon
      iconInfoGrey: icInfoGrey, // inactive state for about icon
    };
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--c-bg-2);
  height: 80px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 99;
}

.nav-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo {
  height: 40px;
  margin-right: 60px;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: var(--font-headers);
  font-weight: 500;
  font-size: 18px;
  color: var(--c-tertiary-dark);
  cursor: pointer;
}

.nav-item a.active {
  color: var(--c-secondary);
  font-weight: 700;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

/* mobile styling */
@media (max-width: 768px) {
  .navbar {
    top: auto;
    bottom: 0;
    height: 60px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .logo {
    display: none;
  }

  .nav-content {
    justify-content: center;
  }

  .nav-links {
    width: 100%;
    justify-content: space-around;
  }

  .nav-text {
    display: none;
  }

  .nav-icon {
    width: 25px;
    height: 25px;
    margin-right: 0;
  }
}
</style>
