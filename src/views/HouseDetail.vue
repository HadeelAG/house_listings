<template>
  <div class="detail-page" v-if="house">
    <div class="container desktop-only">
      <BackButton :to="{ name: 'home' }" text="Back to overview" />
    </div>
    <div class="mobile-header mobile-only">
      <img
        src="@/assets/images/img_placeholder_house.png"
        class="mobile-hero-img"
      />
      <div class="mobile-actions">
        <router-link :to="{ name: 'home' }" class="mobile-back">
          <img :src="iconBackWhite" alt="back" />
        </router-link>
        <div class="mobile-edit-controls" v-if="house.madeByMe">
          <img :src="iconEditWhite" @click="goToEdit" class="action-icon" />
          <img
            :src="iconDeleteWhite"
            @click="openDeleteModal"
            class="action-icon"
          />
        </div>
      </div>
    </div>
    <div class="container detail-container">
      <div class="detail-card">
        <div class="image-section desktop-only">
          <img src="@/assets/images/img_placeholder_house.png" />
        </div>
        <div class="info-section">
          <div class="info-header">
            <h1>
              {{ house.location.street }} {{ house.location.houseNumber }}
            </h1>
            <div class="desktop-controls desktop-only" v-if="house.madeByMe">
              <img :src="iconEditRed" @click="goToEdit" class="action-icon" />
              <img
                :src="iconDeleteGrey"
                @click="openDeleteModal"
                class="action-icon"
              />
            </div>
          </div>

          <!-- location info -->
          <div class="location-row">
            <img :src="iconLocation" class="icon-small" />
            <p>{{ house.location.zip }} {{ house.location.city }}</p>
          </div>

          <!-- stats row -->
          <HouseStats :stats="mainStats" />

          <!-- rooms row -->
          <HouseStats :stats="roomStats" />

          <!-- description -->
          <p class="description">
            {{ house.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container loading">Loading...</div>

  <Teleport to="body">
    <DeleteModal
      v-if="showDeleteModal"
      @confirm="executeDelete"
      @cancel="cancelDelete"
    />
  </Teleport>
</template>

<script>
import { computed, onMounted } from "vue";
import { useHouseDetail } from "@/composables/useHouseDetail";
import DeleteModal from "@/components/DeleteModal.vue";
import BackButton from "@/components/BackButton.vue";
import HouseStats from "@/components/HouseStats.vue";

import icBackWhite from "@/assets/icons/ic_back_white.png";
import icEditRed from "@/assets/icons/ic_edit.png";
import icEditWhite from "@/assets/icons/ic_edit_white.png";
import icDeleteGrey from "@/assets/icons/ic_delete.png";
import icDeleteWhite from "@/assets/icons/ic_delete_white.png";
import icLocation from "@/assets/icons/ic_location.png";
import icPrice from "@/assets/icons/ic_price.png";
import icSize from "@/assets/icons/ic_size.png";
import icBed from "@/assets/icons/ic_bed.png";
import icBath from "@/assets/icons/ic_bath.png";
import icGarage from "@/assets/icons/ic_garage.png";
import icConstruction from "@/assets/icons/ic_construction.png";

export default {
  name: "HouseDetail",
  components: {
    DeleteModal,
    BackButton,
    HouseStats,
  },
  setup() {
    const {
      house,
      showDeleteModal,
      fetchHouse,
      goToEdit,
      openDeleteModal,
      executeDelete,
      cancelDelete,
    } = useHouseDetail();

    const mainStats = computed(() => {
      if (!house.value) return [];
      return [
        {
          icon: icPrice,
          value: house.value.price.toLocaleString("nl-NL"),
          label: "price",
        },
        {
          icon: icSize,
          value: `${house.value.size} m²`,
          label: "size",
        },
        {
          icon: icConstruction,
          value: `Built in ${house.value.constructionYear}`,
          label: "year",
        },
      ];
    });

    const roomStats = computed(() => {
      if (!house.value) return [];
      return [
        {
          icon: icBed,
          value: house.value.rooms.bedrooms,
          label: "bedrooms",
        },
        {
          icon: icBath,
          value: house.value.rooms.bathrooms,
          label: "bathrooms",
        },
        {
          icon: icGarage,
          value: house.value.hasGarage ? "Yes" : "No",
          label: "garage",
        },
      ];
    });

    onMounted(() => {
      fetchHouse();
    });

    return {
      house,
      showDeleteModal,
      goToEdit,
      openDeleteModal,
      executeDelete,
      cancelDelete,
      mainStats,
      roomStats,
      iconBackWhite: icBackWhite,
      iconEditRed: icEditRed,
      iconEditWhite: icEditWhite,
      iconDeleteGrey: icDeleteGrey,
      iconDeleteWhite: icDeleteWhite,
      iconLocation: icLocation,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0;
  width: 100%;
}

/* detail card layout */
.detail-card {
  background: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

/* image section */
.image-section {
  width: 100%;
  height: 450px;
  position: relative;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* info section */
.info-section {
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.info-header h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #000;
}

.action-icon {
  width: 20px;
  margin-left: 15px;
  cursor: pointer;
}

.location-row {
  display: flex;
  align-items: center;
  color: var(--c-tertiary-dark);
  font-weight: 600;
  margin-bottom: 20px;
}

.icon-small {
  width: 16px;
  margin-right: 10px;
}

.description {
  margin-top: 30px;
  line-height: 1.6;
  color: var(--c-secondary);
}

/* mobile */
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }

  .detail-card {
    flex-direction: column;
  }

  /* mobile header */
  .mobile-header {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .mobile-header::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
    pointer-events: none;
  }

  .mobile-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mobile-actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 25px 0 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 10;
  }

  .mobile-edit-controls {
    display: flex;
    gap: 15px;
  }

  .mobile-edit-controls .action-icon {
    width: 20px;
    height: 20px;
    margin-left: 0;
    padding: 0;
    background: transparent;
    border-radius: 0;
    cursor: pointer;
    object-fit: contain;
  }

  .mobile-back img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  /* card adjustments */
  .detail-container {
    padding: 0;
    margin-top: -40px;
    position: relative;
    z-index: 2;
  }

  .detail-card {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    width: 100%;
  }

  .info-section {
    width: 100%;
    padding: 25px 20px;
  }
}
</style>
