<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="to" class="p-2 rounded-full 
  active:outline-dashed active:outline-1 active:outline-slate-300 
  hover:bg-slate-100 
  aria-[current=page]:bg-slate-50 aria-[current=page]:ring-1 aria-[current=page]:ring-slate-200">
    <slot></slot>
  </RouterLink>
</template>