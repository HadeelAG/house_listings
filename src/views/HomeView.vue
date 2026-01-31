<template>
  <div class="home-page">
    <div class="container header-section">
      <h1>Houses</h1>
      <button class="btn-create" @click="goToCreate">
        <img :src="iconPlus" alt="plus" class="btn-icon" />
        <span class="btn-text">CREATE NEW</span>
      </button>
    </div>
    <div class="container controls-section">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search for a house"
        @clear="clearSearch"
      />

      <SortButtons v-model="sortBy" :options="sortOptions" />
    </div>
    <div class="container results-info" v-if="searchQuery && !isLoading">
      <h2 class="result-count">
        {{ filteredHouses.length }} result{{
          filteredHouses.length !== 1 ? "s" : ""
        }}
        found
      </h2>
    </div>
    <div class="container">
      <div v-if="isLoading" class="message">Loading houses...</div>
      <div v-else-if="!filteredHouses.length" class="message">
        <img
          src="@/assets/images/img_empty_houses.png"
          alt="No results"
          class="empty-img"
        />
        <p>No results found. Please try another keyword.</p>
      </div>
    </div>

    <!-- House list -->
    <div class="container house-list">
      <HouseListing
        v-for="house in filteredHouses"
        :key="house.id"
        :house="house"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useHouseList } from "@/composables/useHouseList";
import HouseListing from "@/components/HouseListing.vue";
import SearchBar from "@/components/SearchBar.vue";
import SortButtons from "@/components/SortButtons.vue";

import icPlusWhite from "@/assets/icons/ic_plus_white.png";

export default {
  name: "HomeView",
  components: {
    HouseListing,
    SearchBar,
    SortButtons,
  },
  setup() {
    const {
      searchQuery,
      sortBy,
      isLoading,
      filteredHouses,
      fetchHouses,
      goToCreate,
      clearSearch,
    } = useHouseList();

    const sortOptions = [
      { label: "Price", value: "price" },
      { label: "Size", value: "size" },
      { label: "Bedrooms", value: "bedrooms" },
    ];

    onMounted(() => {
      fetchHouses();
    });

    return {
      searchQuery,
      sortBy,
      isLoading,
      filteredHouses,
      goToCreate,
      clearSearch,
      sortOptions,
      iconPlus: icPlusWhite,
    };
  },
};
</script>

<style scoped>
/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

/* Create Button */
.btn-create {
  background-color: var(--c-primary);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 16px;
  font-family: var(--font-head);
}

.btn-icon {
  width: 16px;
  margin-right: 10px;
}

/* Controls Section */
.controls-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* Result Indication */
.results-info {
  margin-bottom: 20px;
}

.result-count {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 700;
  color: var(--c-secondary);
}

/* Messages */
.message {
  text-align: center;
  margin-top: 50px;
  color: var(--c-secondary);
}

.empty-img {
  width: 300px;
  margin-bottom: 20px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .header-section {
    align-items: center;
  }

  .header-section h1 {
    flex-grow: 0;
    text-align: left;
  }

  .btn-create {
    position: static;
    right: 1px;
    top: 50%;
    transform: none;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .btn-create .btn-text {
    display: none;
  }

  .btn-icon {
    margin-right: 0;
    width: 18px;
  }

  .controls-section {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
