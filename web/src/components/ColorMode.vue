<script setup lang="ts">
import { useColorMode } from '@vueuse/core';

import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({
  disableTransition: true
})
</script>

<template>
  <Button variant="ghost" size="icon" @click="mode = (mode === 'light') ? 'dark' : 'light' ">
    <Icon v-if="mode === 'light'" icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon v-if="mode === 'dark'" icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Color mode</span>
  </Button>
</template>