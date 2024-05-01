<script setup>
import { ref } from 'vue';
import ElementButton from './element/ElementButton.vue';

const url = ref('');

const paste = () => {
  navigator.clipboard.readText().then(clipText => {
    url.value = clipText;
  });
};

defineProps({
  placeholder: {
    type: String,
    required: true
  }
})

defineExpose({
  url
})
</script>

<template>
  <div class="my-2 flex-auto">
    <input type="url" v-model="url" class="w-full md:mr-4 md:w-4/5 rounded-md
    focus:outline-none focus:ring-1 focus:border-slate-300" :placeholder="placeholder">
    <ElementButton @click="paste()" class="my-1 w-full md-custom:max-w-20">Paste</ElementButton>
  </div>
</template>