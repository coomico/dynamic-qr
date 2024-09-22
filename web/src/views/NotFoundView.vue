<script setup lang="ts">
import NotFound from '@/components/error/NotFound.vue';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
</script>

<template>
  <!-- TODO: make it flex column with routerview flexible to grow / shrink
  header and footer stay in size
  so, routerview will be fill in the rest with specific gap -->
  <div class="relative px-4 mx-auto min-h-screen flex flex-col w-full max-w-6xl lg:max-w-7xl">    
    <div class="flex flex-col items-center my-auto mx-auto px-2 max-w-xl gap-6">
      <NotFound />

      <Button as-child size="lg" class="text-lg">
        <RouterLink to="/">
          Back to home page
        </RouterLink>
      </Button>
    </div>
  </div>
</template>