<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import LayoutAuth from "@/layouts/LayoutAuth.vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import LayoutProduct from "./layouts/LayoutProduct.vue";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { isLogged } = storeToRefs(accountStore);
const router = useRouter();
const route = useRoute();

watch(isLogged, () => {
  if (isLogged.value) {
    hasLogin();
  }
});

const hasLogin = () => {
  [
    "login",
    "oauth_callback",
    // 'register',
    "register_verify",
    "resend",
    "invite",
    "forgot_password",
    "reset_password",
  ].includes(String(route.name)) && router.push({ name: "dashboard" });
};

hasLogin();

const layoutName = computed(() => {
  return route.meta.layout;
});
</script>

<template>
  <LayoutAuth v-if="!isLogged && layoutName === 'auth'" />
  <template v-else-if="isLogged">
    <LayoutProduct v-if="layoutName === 'product'" />
    <LayoutDefault class="cafe" v-else-if="layoutName === 'default'" />
    <LayoutAuth v-else-if="layoutName === 'auth'" />
  </template>
</template>

<style></style>
