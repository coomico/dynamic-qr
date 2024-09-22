<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/vue';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface nav {
  to: string,
  title: string,
  icon: string
}

const isActive = (path: string) => useRoute().path === path ? true : false;

const props = defineProps<{
  navs: nav[]
}>();
</script>

<template>
  <ScrollArea class="md:w-fit md:min-w-48 whitespace-nowrap">
    <nav class="pb-3 md:py-4 px-2 md:px-4 flex flex-row md:flex-col items-center md:space-y-1">
      <Button as-child
        variant="ghost"
        v-for="nav in props.navs"
        :key="nav.to"
        class="md:w-full gap-2 md:justify-start">
        <RouterLink
          :to="nav.to"
          class="transition delay-75"
          :class=" isActive(nav.to) ? '' : 'text-muted-foreground'">
            <p>{{ nav.title }}</p>
            <Icon :icon="nav.icon" class="md:order-first"/>
        </RouterLink>
      </Button>
    </nav>

    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>