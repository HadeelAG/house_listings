<template>
  <div class="background-image">
    <div class="container form-page">
      <!-- back button -->
      <BackButton
        :to="backLink"
        :text="`Back to ${isEditMode ? 'detail page' : 'overview'}`"
      />

      <h1>{{ isEditMode ? "Edit listing" : "Create new listing" }}</h1>

      <form @submit.prevent="submitForm" class="house-form">
        <!-- street name -->
        <FormInput
          v-model="form.streetName"
          label="Street name*"
          type="text"
          placeholder="Enter the street name"
          :has-error="errors.streetName"
        />

        <!-- house number and addition -->
        <div class="form-row">
          <FormInput
            v-model="form.houseNumber"
            label="House number*"
            type="number"
            placeholder="Enter house number"
            :has-error="errors.houseNumber"
          />
          <FormInput
            v-model="form.numberAddition"
            label="Addition (optional)"
            type="text"
            placeholder="e.g. A"
          />
        </div>

        <!-- zip and city -->
        <FormInput
          v-model="form.zip"
          label="Postal code*"
          type="text"
          placeholder="e.g. 1000AA"
          :has-error="errors.zip"
        />
        <FormInput
          v-model="form.city"
          label="City*"
          type="text"
          placeholder="e.g. Amsterdam"
          :has-error="errors.city"
        />

        <!-- price -->
        <FormInput
          v-model="form.price"
          label="Price*"
          type="number"
          placeholder="e.g. 150000"
          :has-error="errors.price"
        />

        <!-- size and garage -->
        <div class="form-row">
          <FormInput
            v-model="form.size"
            label="Size*"
            type="number"
            placeholder="e.g. 60"
            :has-error="errors.size"
          />
          <FormInput
            v-model="form.hasGarage"
            label="Garage*"
            type="select"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]"
            :has-error="errors.hasGarage"
          />
        </div>

        <!-- bed and bath -->
        <div class="form-row">
          <FormInput
            v-model="form.bedrooms"
            label="Bedrooms*"
            type="number"
            placeholder="Enter amount"
            :has-error="errors.bedrooms"
          />
          <FormInput
            v-model="form.bathrooms"
            label="Bathrooms*"
            type="number"
            placeholder="Enter amount"
            :has-error="errors.bathrooms"
          />
        </div>

        <!-- construction year -->
        <FormInput
          v-model="form.constructionYear"
          label="Construction year*"
          type="number"
          placeholder="e.g. 1990"
          :has-error="errors.constructionYear"
        />

        <!-- description -->
        <FormInput
          v-model="form.description"
          label="Description*"
          type="textarea"
          placeholder="Enter description"
          :rows="5"
          :has-error="errors.description"
        />

        <!-- submit button -->
        <div class="submit-btn-container">
          <button type="submit" class="post-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="btn-spinner"></span>
            {{
              isSubmitting
                ? isEditMode
                  ? "SAVING..."
                  : "POSTING..."
                : isEditMode
                  ? "SAVE"
                  : "POST"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { useHouseForm } from "@/composables/useHouseForm";
import FormInput from "@/components/FormInput.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  name: "HouseForm",
  components: {
    FormInput,
    BackButton,
  },
  setup() {
    const {
      form,
      errors,
      isSubmitting,
      isEditMode,
      backLink,
      submitForm,
      populateForm,
    } = useHouseForm();

    return {
      form,
      errors,
      isSubmitting,
      isEditMode,
      backLink,
      submitForm,
      populateForm,
    };
  },
  computed: {
    ...mapGetters(["currentHouse"]),
  },
  async created() {
    // if in edit mode fetch and populate form with existing house data
    if (this.isEditMode) {
      const id = this.$route.params.id;
      if (!this.currentHouse || this.currentHouse.id !== parseInt(id)) {
        await this.$store.dispatch("fetchHouseById", id);
      }

      if (this.currentHouse) {
        this.populateForm(this.currentHouse);
      }
    }
  },
};
</script>

<style scoped>
.background-image {
  background-image:
    linear-gradient(
      90deg,
      rgba(246, 246, 246, 1) 0%,
      rgba(246, 246, 246, 0.9) 30%,
      rgba(246, 246, 246, 0.6) 45%,
      rgba(246, 246, 246, 0.2) 60%,
      rgba(246, 246, 246, 0) 80%
    ),
    url("@/assets/images/img_background.png");

  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;

  min-height: 100vh;
  width: 100%;
  padding-bottom: 40px;
}

@media (min-width: 1200px) {
  .background-image {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    background-size: cover;
    background-position: center;
    padding-left: 0;
    padding-right: 0;
  }

  .form-page {
    margin-left: 10%;
    margin-right: auto;
    max-width: 450px;
  }
}

.form-page {
  max-width: 450px;
  margin: 0;
  margin-left: 10%;
}

h1 {
  margin-bottom: 30px;
}

.house-form {
  background: transparent;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row > * {
  flex: 1;
}

/* submit btn */
.submit-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.post-btn {
  background-color: var(--c-primary);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 60px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.3s;
  width: auto;
}

.post-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* mobile */
@media (max-width: 768px) {
  .background-image {
    background: var(--c-bg-1); /* remove image on mobile */
    min-height: auto;
  }

  .form-page {
    margin: 0 auto;
    padding: 20px;
    max-width: 100%;
  }

  .post-btn {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .post-btn {
    width: auto;
  }
}
</style>
