import { useVersionStore } from "@/stores/version";
import { storeToRefs } from "pinia";

export function useVersion() {
  const versionStore = useVersionStore();

  const { getVersion } = storeToRefs(versionStore);

  const checkVersion = async () => {
    try {
      const res = await fetch("/version.json", {
        headers: {
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      });
      const data = await res.json();

      const appVersion = data?.version || 0;

      if (getVersion.value === appVersion) {
        return;
      }

      versionStore.setVersion(appVersion);
      window.location.reload();
    } catch (error) {}
  };

  return {
    checkVersion,
  };
}
