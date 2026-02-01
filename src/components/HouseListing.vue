<template>
  <router-link
    :to="{ name: 'house-detail', params: { id: house.id } }"
    class="house-card"
  >
    <div class="image-container">
      <img
        :src="`/images/img_placeholder_house_${Math.floor(Math.random() * 7) + 1}.png`"
        alt="Placeholder house image"
        class="house-image"
      />
    </div>

    <div class="content-container">
      <div class="header-row">
        <h2 class="street-text">
          {{ house.location.street }} {{ house.location.houseNumber }}
        </h2>
        <div class="card-actions" v-if="house.madeByMe">
          <button class="icon-btn edit" @click.prevent.stop="navigateToEdit">
            <img src="@/assets/icons/ic_edit.png" alt="Edit" />
          </button>
          <button class="icon-btn delete" @click.prevent.stop="openDeleteModal">
            <img src="@/assets/icons/ic_delete.png" alt="Delete" />
          </button>
        </div>
      </div>

      <p class="price-text">€ {{ formattedPrice }}</p>

      <p class="address-text">
        {{ house.location.zip }} {{ house.location.city }}
      </p>

      <div class="features-row">
        <div class="feature">
          <img src="@/assets/icons/ic_bed.png" alt="Bed" class="feature-icon" />
          <span>{{ house.rooms.bedrooms }}</span>
        </div>
        <div class="feature">
          <img
            src="@/assets/icons/ic_bath.png"
            alt="Bath"
            class="feature-icon"
          />
          <span>{{ house.rooms.bathrooms }}</span>
        </div>
        <div class="feature">
          <img
            src="@/assets/icons/ic_size.png"
            alt="Size"
            class="feature-icon"
          />
          <span>{{ house.size }} m²</span>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <DeleteModal
        v-if="showDeleteModal"
        @confirm="executeDelete"
        @cancel="cancelDelete"
      />
    </Teleport>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "@/composables/useToast";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "HouseListing",
  components: { DeleteModal },
  props: {
    house: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const { showToast } = useToast();
    return { showToast };
  },
  data() {
    return { showDeleteModal: false };
  },
  computed: {
    // Formats the price with a thousands separator.
    formattedPrice() {
      return (this.house.price || 0).toLocaleString("nl-NL");
    },
  },
  methods: {
    ...mapActions(["deleteHouse"]),

    // Navigates to the edit page for this specific listing.
    navigateToEdit() {
      this.$router.push({
        name: "house-edit",
        params: { id: this.house.id },
      });
    },

    // Handles the deletion of a house with a confirmation warning.
    async openDeleteModal() {
      this.showDeleteModal = true;
    },
    async executeDelete() {
      try {
        await this.deleteHouse(this.house.id);
        this.showToast("Listing deleted successfully.", "success");
        this.showDeleteModal = false;
      } catch (err) {
        console.error("Delete failed:", err);
        this.showToast("Failed to delete listing.", "error");
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped>
.house-card {
  background-color: var(--c-bg-2);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
}

.house-card:hover {
  transform: translateY(-2px);
}

.image-container {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

.house-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.icon-btn img {
  width: 16px;
  height: 16px;
}

.icon-btn.delete {
  background: rgba(255, 255, 255, 0.95);
}

.icon-btn.edit {
  background: rgba(255, 255, 255, 0.95);
}

.street-text {
  font-size: 20px;
  margin-bottom: 5px;
}

.price-text {
  color: var(--c-secondary);
  font-weight: 600;
  margin: 0 0 5px 0;
  font-size: 16px;
}

.address-text {
  color: var(--c-tertiary-dark);
  margin: 0 0 15px 0;
  font-size: 14px;
}

.features-row {
  display: flex;
  gap: 20px;
}

.feature {
  display: flex;
  align-items: center;
  color: var(--c-secondary);
  font-size: 14px;
}

.feature-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* mobile  */
@media (max-width: 768px) {
  .house-card {
    flex-direction: row;
    padding: 10px;
  }

  .image-container {
    width: 90px;
    height: 90px;
    margin-right: 15px;
  }

  .street-text {
    font-size: 16px;
  }
}
</style>
