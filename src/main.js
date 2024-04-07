import { createApp } from "vue";
import { DatePicker, message } from "ant-design-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/main.css";
import "ant-design-vue/dist/reset.css";




import router from "./router";

const app = createApp(App);
app.use(DatePicker);
app.use(router).mount("#app");
app.config.globalProperties.$message = message;
