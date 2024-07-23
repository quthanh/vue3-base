import type { App, Plugin } from "vue";

const formatNumber = (number: number, toFixed = 0): string => {
  if (!number) return "0";

  // let newNumber = number.toString();

  // if (toFixed) {
  //   newNumber = number.toFixed(toFixed);
  // }

  // const [integerPart, decimalPart] = newNumber.split(".");

  // const formattedIntegerPart = integerPart
  //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  //   .replace(/(\.\d*?[1-9])0+|\.0+$/g, "$1");

  // return decimalPart
  //   ? `${formattedIntegerPart}.${decimalPart}`
  //   : formattedIntegerPart;

  return Number(number)
    .toFixed(toFixed)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export interface DisplayPlugin {
  formatNumber: (number: number, toFixed?: number) => string;
}

const display: DisplayPlugin = {
  formatNumber,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$display = display;
    app.provide("display", display);
  },
} as Plugin;
