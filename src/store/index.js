import { createStore } from "vuex";
import { API_URL, HEADERS } from "../config";

const createHouseFormData = (houseData) => {
  return {
    price: parseInt(houseData.price),
    rooms: {
      bedrooms: parseInt(houseData.bedrooms),
      bathrooms: parseInt(houseData.bathrooms),
    },
    size: parseInt(houseData.size),
    description: houseData.description,
    location: {
      street: houseData.streetName,
      houseNumber: parseInt(houseData.houseNumber),
      houseNumberAddition: houseData.houseNumberAddition,
      city: houseData.city,
      zip: houseData.zip,
    },
    createdAt: new Date().toISOString().split("T")[0],
    constructionYear: parseInt(houseData.constructionYear),
    hasGarage: houseData.hasGarage,
    madeByMe: true,
  };
};

export default createStore({
  state: {
    houses: [],
    currentHouse: null,
    isLoading: false,
    error: null,
  },
  getters: {
    allHouses: (state) => state.houses,
    currentHouse: (state) => state.currentHouse,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setHouses(state, data) {
      state.houses = data;
    },
    setCurrentHouse(state, data) {
      state.currentHouse = data;
    },
    removeHouse(state, id) {
      state.houses = state.houses.filter((h) => h.id !== id);
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    // fetch all houses
    async fetchHouses({ commit }) {
      commit("setLoading", true);
      try {
        const response = await fetch(`${API_URL}/houses`, { headers: HEADERS });
        if (!response.ok) throw new Error("Failed to fetch houses");

        const data = await response.json();
        data.sort((a, b) => b.price - a.price);
        commit("setHouses", data);
      } catch (error) {
        console.error("Error fetching houses:", error);
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchHouseById({ commit }, id) {
      commit("setLoading", true);
      commit("setCurrentHouse", null);

      try {
        const response = await fetch(`${API_URL}/houses/${id}`, {
          headers: HEADERS,
        });
        if (!response.ok) throw new Error("Failed to fetch details");

        const data = await response.json();

        commit("setCurrentHouse", data);
      } catch (error) {
        console.error("Error fetching details:", error);
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
    async deleteHouse({ commit }, id) {
      try {
        const response = await fetch(`${API_URL}/houses/${id}`, {
          method: "DELETE",
          headers: HEADERS,
        });

        if (response.ok) {
          commit("removeHouse", id);
          return true;
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        console.error("Error deleting:", error);
        throw error;
      }
    },
    async createHouse({ dispatch }, newHouse) {
      try {
        const body = createHouseFormData(newHouse);

        const response = await fetch(`${API_URL}/houses`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch("fetchHouses");
          return data.id;
        } else {
          const text = await response.text();
          throw new Error(`Server Error: ${text}`);
        }
      } catch (error) {
        console.error("Create Error:", error);
        throw error;
      }
    },

    async updateHouse({ dispatch }, { id, updates }) {
      try {
        const body = createHouseFormData(updates);

        const response = await fetch(`${API_URL}/houses/${id}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          dispatch("fetchHouseById", id);
          dispatch("fetchHouses");
          return true;
        } else {
          throw new Error("Failed to update");
        }
      } catch (error) {
        console.error("Update Error:", error);
        throw error;
      }
    },
  },
});
