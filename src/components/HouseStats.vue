<template>
  <div class="stats-container">
    <div class="stat-item" v-for="stat in stats" :key="stat.label">
      <img :src="stat.icon" class="icon-small" />
      <span>{{ stat.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseStats",
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.stats-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  color: var(--c-secondary);
  flex-wrap: nowrap;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-right: 25px;
  font-size: 16px;
  white-space: nowrap;
}

.icon-small {
  width: 16px;
  margin-right: 10px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .stat-item {
    font-size: 14px;
    margin-right: 15px;
  }
}
</style>
