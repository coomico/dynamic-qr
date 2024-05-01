<script setup>
import { ref } from 'vue';

import ElementBox from '@/components/element/ElementBox.vue';
import ElementLabel from '@/components/element/ElementLabel.vue';

import EyeIcon from '@/components/icons/EyeIcon.vue';
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue';

const password = ref('');
const showPassword = ref('password');

const switchEye = () => {
  showPassword.value = (showPassword.value === 'password') ? 'text' : 'password';
};

defineProps({
  placeholder: {
    type: String,
    required: true
  }
})

defineExpose({
  password
})
</script>

<template>
  <ElementBox>
    <ElementLabel>Password</ElementLabel>
    <div class="my-2 flex-auto">
      <input :type="showPassword" v-model="password" class="w-full rounded-md
      focus:outline-none focus:ring-1 focus:border-slate-300" :placeholder="placeholder">
      <button @click="switchEye()" class="">
        <EyeIcon v-if="showPassword === 'password'" />
        <EyeSlashIcon v-else />
      </button>
    </div>
  </ElementBox>
</template>