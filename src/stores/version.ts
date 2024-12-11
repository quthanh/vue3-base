import { defineStore } from "pinia";

interface Version {
  version: string;
}

export const useVersionStore = defineStore({
  id: "version",
  state: (): Version => ({
    version: "0",
  }),
  getters: {
    getVersion: (state) => state.version,
  },
  actions: {
    setVersion(ver: string) {
      this.version = ver;
    },
  },
  persist: {
    key: "version",
  },
});
