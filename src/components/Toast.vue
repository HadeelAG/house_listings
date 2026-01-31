<template>
  <!-- only show container if toasts exist -->
  <div v-if="toasts.length > 0" class="toast-container">
    <!-- loop through active toasts and display each one -->
    <div v-for="toast in toasts" :key="toast.id" :class="['toast', toast.type]">
      <span>{{ toast.message }}</span>
      <!-- close button to manually dismiss toast -->
      <button @click="removeToast(toast.id)" class="toast-close">×</button>
    </div>
  </div>
</template>

<script>
import { useToast } from "@/composables/useToast";

export default {
  name: "Toast",
  setup() {
    // get toasts array and removeToast method from composable
    const { toasts, removeToast } = useToast();

    return {
      toasts, // reactive array from composable
      removeToast, // function to remove toast
    };
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background-color: #4caf50;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-in-out;
}

.toast.error {
  background-color: #f44336;
}

.toast.warning {
  background-color: #ff9800;
}

.toast.info {
  background-color: #2196f3;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 15px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .toast-container {
    top: 120px;
    right: 10px;
    left: 10px;
  }

  .toast {
    min-width: auto;
  }
}
</style>
