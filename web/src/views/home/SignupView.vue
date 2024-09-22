<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Signup = defineAsyncComponent(() => import('@/components/auth/Signup.vue'));
</script>

<template>
  <main>
    <Signup />
  </main>
</template>