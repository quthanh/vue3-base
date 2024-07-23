import "./assets/index.scss";

import { createApp } from "vue";

import simple from "./components/simple";

import App from "./App.vue";
import router from "./router";
import stores from "./stores";
import date from "./plugins/date";
import display from "./plugins/display";
import permission from "./plugins/permission";
import icon from "./plugins/icon";
import form from "./plugins/form";
import svgIcon from "./svgIcon";
import CheckPermission from "./components/CheckPermission.vue";
import loading from "./directives/loading";
import $toast from "./components/simple/Toast";

const app = createApp(App);
simple(app);
svgIcon(app);

app.use(router);
app.use(stores);
app.use(date);
app.use(permission);
app.use(icon);
app.use(form);
app.use(display);

app.component("CheckPermission", CheckPermission);

app.directive("loading", loading);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.config.errorHandler = (err: any) => {
  $toast(err.message, "error");
  console.log(err);
};

app.mount("#app");
