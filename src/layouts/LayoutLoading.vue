<script setup lang="ts"></script>
<template>
  <div>
    <div class="flex h-screen w-full animate-pulse">
      <div class="w-[280px] h-full bg-gray-100 py-5 px-6">
        <div class="w-40 h-10 bg-gray-100"></div>
        <div class="mt-6 space-y-6">
          <div v-for="i in 6" :key="i" class="h-10 w-full bg-gray-100"></div>
        </div>
      </div>
      <div class="w-[calc(100%-280px)] h-full overflow-y-auto bg-gray-100">
        <!-- <nav class="bg-white border-b border-gray-300 z-30 w-full sticky top-0">
          <div
            class="grid grid-cols-3 flex items-center justify-between h-[60px] px-6"
          >
            <div class="col-span-2 w-40 h-10 bg-gray-100"></div>
            <div class="flex justify-end col-span-1">
              <div class="w-40 h-10 bg-gray-100"></div>
            </div>
          </div>
        </nav> -->
        <div
          class="p-6 bg-white min-h-screen shadow-[0_0.3px_0.9px_rgba(0,0,0,0.1),0_1.6px_3.6px_rgba(0,0,0,0.13)]"
        >
          <div class="max-w-[800px] space-y-6">
            <div v-for="i in 6" :key="i" class="h-10 w-full bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
