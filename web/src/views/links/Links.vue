<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';

import { ScrollArea } from "@/components/ui/scroll-area";

const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'));
const SubNav = defineAsyncComponent(() => import('@/components/nav/SubNav.vue'));

const navs = [
  {to: '/links', title: 'Collections', icon: 'radix-icons:cube'},
  {to: '/links/new', title: 'New', icon: 'radix-icons:plus'},
  {to: '/links/edit', title: 'Edit', icon: 'radix-icons:pencil-1'}
];
</script>

<template>
  <main class="flex flex-col divide-y-0 md:divide-y mx-auto min-h-screen w-full">
    <div class="pt-4 md:py-4 px-4 md:px-8">
      <NavBar title="Links" />
    </div>
    <div class="flex flex-col md:flex-row divide-y md:divide-y-0">
      <SubNav :navs="navs"/>

      <ScrollArea class="w-full pt-4 px-4 md:px-8 h-[calc(100svh-100px)] md:h-[calc(100svh-70px)]">
        <RouterView />
      </ScrollArea>
    </div>
  </main>
</template>