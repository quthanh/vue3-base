import type { App, Plugin } from "vue";
import scrollByClassName from "@/utils/scrollByClassName";

export interface FormPlugin {
  scrollByClassName: () => void;
}

const form: FormPlugin = {
  scrollByClassName,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$form = form;
    app.provide("form", form);
  },
} as Plugin;
