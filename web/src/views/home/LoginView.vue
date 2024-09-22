<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Login = defineAsyncComponent(() => import('@/components/auth/Login.vue'));
</script>

<template>
  <main>
    <Login />
  </main>
</template>