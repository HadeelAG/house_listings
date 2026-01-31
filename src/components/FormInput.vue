<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
      v-if="type !== 'textarea' && type !== 'select'"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{ error: hasError }"
      :placeholder="placeholder"
    />
    <textarea
      v-else-if="type === 'textarea'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{ error: hasError }"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
    <select
      v-else-if="type === 'select'"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="{ error: hasError }"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="hasError" class="error-msg">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "Required field missing",
    },
    rows: {
      type: Number,
      default: 5,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--c-secondary);
  font-size: 14px;
}

input,
select,
textarea {
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--c-secondary);
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

input.error,
select.error,
textarea.error {
  border: 1px solid var(--c-primary);
}

.error-msg {
  color: var(--c-primary);
  font-size: 12px;
  margin-top: 5px;
  font-style: italic;
}
</style>
