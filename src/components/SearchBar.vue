<template>
  <div class="search-bar">
    <img :src="iconSearch" class="search-icon" alt="search" />
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      v-if="modelValue"
      class="clear-btn"
      @click="$emit('clear')"
      type="button"
    >
      X
    </button>
  </div>
</template>

<script>
import icSearch from "@/assets/icons/ic_search.png";

export default {
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Search...",
    },
  },
  emits: ["update:modelValue", "clear"],
  setup() {
    return {
      iconSearch: icSearch,
    };
  },
};
</script>

<style scoped>
.search-bar {
  background-color: var(--c-tertiary-light);
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  width: 400px;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  margin-left: 10px;
  width: 100%;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--c-secondary);
}

.search-icon {
  width: 18px;
}

.clear-btn {
  cursor: pointer;
  font-weight: bold;
  color: var(--c-tertiary-dark);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
}

@media (max-width: 768px) {
  .search-bar {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
