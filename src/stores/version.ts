import { defineStore } from "pinia";

interface Version {
  version: number;
}

export const useVersionStore = defineStore({
  id: "version",
  state: (): Version => ({
    version: 0,
  }),
  getters: {
    getVersion: (state) => state.version,
  },
  actions: {
    setVersion(ver: number) {
      this.version = ver;
    },
  },
  persist: {
    key: "version",
  },
});
