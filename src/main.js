// import global styles with color variables and typography
import "./assets/main.css";

import { createApp } from "vue";

// import root app component, vue router, and vuex store
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);

// register vuex store for centralized state management
app.use(store);

app.mount("#app");
