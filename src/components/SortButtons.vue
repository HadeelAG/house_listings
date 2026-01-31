<template>
  <div class="sort-buttons">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['btn-sort', { active: modelValue === option.value }]"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SortButtons",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.sort-buttons {
  display: flex;
}

.btn-sort {
  background-color: var(--c-tertiary-dark);
  color: white;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
  font-size: 16px;
  font-family: var(--font-head);
}

.btn-sort:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.btn-sort:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.btn-sort.active {
  background-color: var(--c-primary);
}

@media (max-width: 768px) {
  .sort-buttons {
    width: 100%;
    display: flex;
  }

  .btn-sort {
    flex: 1;
    padding: 10px 2px;
    font-size: 13px;
  }
}
</style>
