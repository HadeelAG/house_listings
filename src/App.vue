<template>
  <div class="app-container">
    <NavBar />
    <Toast />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Toast from "@/components/Toast.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Toast,
  },
};
</script>
