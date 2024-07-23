<script setup lang="ts">
import { ref } from "vue";
import $toast from "@/components/simple/Toast";

// <s-select :options="optionsOne" v-model="optionOne" :isMultiple="true">
// </s-select>
const optionsOne = ref([
  "Select 1",
  "Select 2",
  "Select 3",
  "Select 4",
  "Select 5",
  "Select 6",
]);
const optionOne = ref(["Select 1", "Select 2"]);

const isShowModal = ref<boolean>(false);

const optionsTwo = ref([
  {
    id: 1,
    name: "Select 3",
  },
  {
    id: 2,
    name: "Select 4",
  },
]);
const optionTwo = ref({
  id: 1,
  name: "Select 3",
});

const optionsThree = ref([
  {
    stt: 1,
    label: "Select 5",
  },
  {
    stt: 2,
    label: "Select 6",
  },
]);
const optionThree = ref();

const tags = ref([]);

const date = ref("2023-08-05");
const dateTime = ref("2023-08-05 10:00");
const time = ref("23:00");
const month = ref("2023-08");
const week = ref("2023-W31");
</script>
<template>
  <div class="space-y-6">
    <s-upload-file-single></s-upload-file-single>

    <s-upload-file-multiple
      :files="[
        {
          id: 1,
          url: 'https://cafefcdn.com/zoom/223_140/203337114487263232/2024/7/18/avatar1689674138694-1689674138883971533512-17212776986441580264534-8-0-408-640-crop-1721277701765741963912.jpg',
        },
      ]"
    ></s-upload-file-multiple>

    <s-button @click="isShowModal = true"> Show modal </s-button>
    <s-modal v-if="isShowModal" @close="isShowModal = false">
      <template #header>
        <h4 class="uppercase text-gray-900">Modal</h4>
      </template>
      <template #body> aaaa </template>
    </s-modal>

    <s-button
      @click="
        $toast(
          '<strong>New message1</strong> New message1 New message1 New message1 New message1 New message1'
        )
      "
    >
      Show toast
    </s-button>

    <s-button
      @click="
        $toast(
          'New message1 New message1 New message1 New message1 New message1 New message1',
          'info'
        )
      "
    >
      Show toast
    </s-button>

    <s-input class="!pl-6">
      <template #prepend> $ </template>
      <template #append> ABC </template>
    </s-input>

    <s-select :options="optionsOne" v-model="optionOne" :isMultiple="true">
    </s-select>

    <s-select :options="optionsTwo" v-model="optionTwo"> </s-select>

    <s-select
      :options="optionsThree"
      trackBy="id"
      label="label"
      v-model="optionThree"
      :isMultiple="true"
    >
    </s-select>

    <s-input-tag v-model="tags"></s-input-tag>

    <s-input type="range"></s-input>
    <s-input type="date" v-model="date"></s-input>
    <s-input type="datetime-local" v-model="dateTime"></s-input>
    <s-input type="time" v-model="time"></s-input>
    <s-input type="month" v-model="month"></s-input>
    <s-input type="week" v-model="week"></s-input>

    <div class="inline-block">
      <s-tooltip>
        <template #content> Lorem ipsum dolor? </template>
        <s-button>Top</s-button>
      </s-tooltip>
    </div>

    <div class="inline-block">
      <s-tooltip placement="bottom">
        <template #content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          quam dicta dignissimos eaque consequuntur perspiciatis voluptas harum
          nam est laborum? Ea odit necessitatibus sed corrupti dolore ratione
          sint repellat eos?
        </template>
        <s-button>Bottom</s-button>
      </s-tooltip>
    </div>

    <div class="inline-block">
      <s-tooltip placement="left">
        <template #content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          quam dicta dignissimos eaque consequuntur perspiciatis voluptas harum
          nam est laborum? Ea odit necessitatibus sed corrupti dolore ratione
          sint repellat eos?
        </template>
        <s-button>Left</s-button>
      </s-tooltip>
    </div>

    <div class="inline-block">
      <s-tooltip placement="right">
        <template #content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          quam dicta dignissimos eaque consequuntur perspiciatis voluptas harum
          nam est laborum? Ea odit necessitatibus sed corrupti dolore ratione
          sint repellat eos?
        </template>
        <s-button>Right</s-button>
      </s-tooltip>
    </div>
  </div>
</template>
