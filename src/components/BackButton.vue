<template>
  <div class="back-nav">
    <router-link :to="to" class="back-link">
      <img :src="icon" class="back-icon" />
      {{ text }}
    </router-link>
  </div>
</template>

<script>
import icBackGrey from "@/assets/icons/ic_back_grey.png";

export default {
  name: "BackButton",
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    text: {
      type: String,
      default: "Back",
    },
    icon: {
      type: String,
      default: icBackGrey,
    },
  },
};
</script>

<style scoped>
.back-nav {
  padding-top: 30px;
  margin-bottom: 20px;
}

.back-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--c-secondary);
  font-weight: 600;
  font-size: 16px;
}

.back-icon {
  width: 18px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .back-nav {
    padding-top: 20px;
  }
}
</style>
