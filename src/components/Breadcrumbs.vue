<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const breadcrumbs = computed(() => {
  return route?.meta?.breadcrumbs || [];
});
</script>
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-4">
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <li class="w-6 h-6 flex items-center justify-center" v-if="index !== 0">
          <s-icon
            class="!text-gray-500 -rotate-90 svg-line w-6 h-6"
            name="down"
          ></s-icon>
        </li>
        <li class="inline-flex items-center">
          <template v-if="item.router">
            <router-link
              :to="{
                name: item?.router.name,
              }"
              class="inline-flex items-center text-blue-600"
            >
              <h3 :class="{ 'text-blue-600': item.active }">{{ item.name }}</h3>
            </router-link>
          </template>
          <template v-else>
            <h3 :class="{ 'text-blue-600': item.active }">{{ item.name }}</h3>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>
