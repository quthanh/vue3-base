<template>
  <div class="layout-component h-screen">
    <div class="flex h-screen">
      <div class="w-[255px] h-full border-r">
        <ul class="p-3">
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/color'"
              >Color</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/dropdown'"
              >Dropdown</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/input'"
              >Input</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/textarea'"
              >Textarea</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/button'"
              >Button</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/checkbox'"
              >Checkbox</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/toggle'"
              >Toggle</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/radio'"
              >Radio</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/select'"
              >Select</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/tooltip'"
              >Tooltip</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/modal'"
              >Modal</router-link
            >
          </li>
          <li class="py-2">
            <router-link class="hover:text-blue-600" :to="'/component/table'"
              >Table</router-link
            >
          </li>
        </ul>
      </div>
      <div class="w-[calc(100%-255px)] p-3 h-full overflow-y-auto">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>
