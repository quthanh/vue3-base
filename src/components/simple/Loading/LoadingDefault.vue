<template>
  <div class="space-y-5 animate-pulse">
    <div
      v-for="i in [
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-2',
        'grid-cols-1',
        'grid-cols-2',
      ]"
      class="grid gap-5"
      :key="i"
      :class="i"
    >
      <div class="h-9 w-full bg-gray-100 rounded-lg"></div>
      <div class="h-9 w-full bg-gray-100 rounded-lg"></div>
    </div>
  </div>
</template>
