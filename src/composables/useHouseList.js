import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useHouseList() {
  const router = useRouter();
  const store = useStore();

  const searchQuery = ref("");
  const sortBy = ref("price");
  const isLoading = ref(true);

  const allHouses = computed(() => store.getters.allHouses);

  const filteredHouses = computed(() => {
    if (!allHouses.value) return [];

    let houses = [...allHouses.value];

    // Search logic: Filter by street, city, or zip code
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      houses = houses.filter((h) => {
        const street = (h.location?.street || "").toLowerCase();
        const city = (h.location?.city || "").toLowerCase();
        const zip = String(h.location?.zip || "");

        return (
          street.includes(query) || city.includes(query) || zip.includes(query)
        );
      });
    }

    // Sort logic: Apply selected sort criteria
    houses.sort((a, b) => {
      if (sortBy.value === "price") {
        return a.price - b.price;
      } else if (sortBy.value === "size") {
        return a.size - b.size;
      } else if (sortBy.value === "bedrooms") {
        const aBeds = (a.rooms && a.rooms.bedrooms) || 0;
        const bBeds = (b.rooms && b.rooms.bedrooms) || 0;
        return aBeds - bBeds;
      }
      return 0;
    });

    return houses;
  });

  const fetchHouses = async () => {
    try {
      await store.dispatch("fetchHouses");
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const goToCreate = () => {
    router.push({ name: "house-create" });
  };

  const clearSearch = () => {
    searchQuery.value = "";
  };

  return {
    searchQuery,
    sortBy,
    isLoading,
    filteredHouses,
    fetchHouses,
    goToCreate,
    clearSearch,
  };
}
