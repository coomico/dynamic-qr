<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ColorMode = defineAsyncComponent(() => import('./ColorMode.vue'));
const UserNav = defineAsyncComponent(() => import('./nav/UserNav.vue'));

defineProps<{
  title: string
}>();
</script>

<template>
  <nav class="flex content-center items-center justify-between">
    <h2 class="text-2xl font-semibold tracking-tight">
      {{ title }}
    </h2>

    <div class="flex items-center">
      <ColorMode class="rounded-full" />
      <UserNav />
    </div>
  </nav>
</template>