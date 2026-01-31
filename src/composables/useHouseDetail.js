import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "@/composables/useToast";

export function useHouseDetail() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const { showToast } = useToast();

  const showDeleteModal = ref(false);

  const house = computed(() => store.getters.currentHouse);

  const fetchHouse = async () => {
    const id = route.params.id;
    await store.dispatch("fetchHouseById", id);
  };

  const goToEdit = () => {
    router.push({
      name: "house-edit",
      params: { id: house.value.id },
    });
  };

  const openDeleteModal = () => {
    showDeleteModal.value = true;
  };

  const executeDelete = async () => {
    try {
      await store.dispatch("deleteHouse", house.value.id);
      showToast("Listing deleted successfully", "success");
      showDeleteModal.value = false;
      router.push({ name: "home" });
    } catch (error) {
      showToast("Failed to delete listing", "error");
      showDeleteModal.value = false;
    }
  };

  const cancelDelete = () => {
    showDeleteModal.value = false;
  };

  return {
    house,
    showDeleteModal,
    fetchHouse,
    goToEdit,
    openDeleteModal,
    executeDelete,
    cancelDelete,
  };
}
