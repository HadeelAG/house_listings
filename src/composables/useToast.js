import { ref } from "vue";

// global toasts array and id counter for all components using this composable
const toasts = ref([]);
let toastId = 0; // unique id for each toast to enable removal

export function useToast() {
  // display toast message with optional auto-dismiss duration
  const showToast = (message, type = "success", duration = 3000) => {
    const id = toastId++;
    const toast = { id, message, type };

    // add toast to global array
    toasts.value.push(toast);

    // auto-remove after duration expires
    if (duration > 0) {
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id);
      }, duration);
    }

    return id;
  };

  // manually remove toast by id
  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts, // ref for component binding
    showToast, // function to add toast
    removeToast, // function to remove toast
  };
}
