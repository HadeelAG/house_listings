<template>
  <div class="modal-overlay" @click.self.stop="onCancel">
    <div class="modal-container">
      <h2 class="modal-title">Delete listing</h2>

      <p class="modal-message">
        Are you sure you want to delete this listing?<br />
        This action cannot be undone.
      </p>

      <button type="button" class="btn btn-delete" @click="onConfirm">
        YES, DELETE
      </button>
      <button type="button" class="btn btn-cancel" @click="onCancel">
        GO BACK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  emits: ["confirm", "cancel"],
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  padding: 40px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 25px 0;
  color: #000;
}

.modal-message {
  text-align: center;
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 30px 0;
}

.btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-delete {
  background: #e76f51;
  color: white;
  margin-bottom: 15px;
}

.btn-delete:hover {
  background: #d65d41;
}

.btn-cancel {
  background: #4a4a4a;
  color: white;
}

.btn-cancel:hover {
  background: #3a3a3a;
}
</style>
