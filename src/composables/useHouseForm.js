import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "@/composables/useToast";

export function useHouseForm() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const { showToast } = useToast();

  const isSubmitting = ref(false);

  const form = ref({
    streetName: "",
    houseNumber: "",
    numberAddition: "",
    zip: "",
    city: "",
    price: "",
    size: "",
    hasGarage: false,
    bedrooms: "",
    bathrooms: "",
    constructionYear: "",
    description: "",
  });

  const errors = ref({});

  const isEditMode = computed(() => route.name === "house-edit");

  const backLink = computed(() =>
    isEditMode.value
      ? { name: "house-detail", params: { id: route.params.id } }
      : { name: "home" },
  );

  const validate = () => {
    errors.value = {};
    const requiredFields = [
      "streetName",
      "houseNumber",
      "zip",
      "city",
      "price",
      "size",
      "bedrooms",
      "bathrooms",
      "constructionYear",
      "description",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      if (!form.value[field]) {
        errors.value[field] = true;
        isValid = false;
      }
    });

    return isValid;
  };

  const submitForm = async () => {
    if (!validate()) {
      showToast("Please fill in all required fields", "error", 3000);
      return;
    }

    isSubmitting.value = true;

    try {
      if (isEditMode.value) {
        await store.dispatch("updateHouse", {
          id: route.params.id,
          updates: form.value,
        });
        showToast("Listing updated successfully", "success");

        router.push({
          name: "house-detail",
          params: { id: route.params.id },
        });
      } else {
        const newId = await store.dispatch("createHouse", form.value);
        if (newId) {
          showToast("Listing created successfully", "success");
          await store.dispatch("fetchHouseById", newId);

          router.push({
            name: "house-detail",
            params: { id: newId },
          });
        } else {
          showToast("Failed to create listing", "error");
        }
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      isSubmitting.value = false;
    }
  };

  const populateForm = (house) => {
    form.value = {
      streetName: house.location.street,
      houseNumber: house.location.houseNumber,
      numberAddition: house.location.houseNumberAddition,
      zip: house.location.zip,
      city: house.location.city,
      price: house.price,
      size: house.size,
      hasGarage: house.hasGarage,
      bedrooms: house.rooms.bedrooms,
      bathrooms: house.rooms.bathrooms,
      constructionYear: house.constructionYear,
      description: house.description,
    };
  };

  return {
    form,
    errors,
    isSubmitting,
    isEditMode,
    backLink,
    validate,
    submitForm,
    populateForm,
  };
}
