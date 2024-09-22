<script setup lang="ts">
import { RouterView } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
</script>

<template>
  <!-- TODO: make it flex column with routerview flexible to grow / shrink
  header and footer stay in size
  so, routerview will be fill in the rest with specific gap -->
  <div class="relative px-4 mx-auto min-h-screen flex flex-col w-full max-w-6xl lg:max-w-7xl">
    <Header />
    
    <RouterView class="my-auto mx-auto px-2 max-w-xl"/>

    <Footer />
  </div>
</template>