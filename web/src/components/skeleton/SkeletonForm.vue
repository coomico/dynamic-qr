<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex flex-col space-y-6">
    <div class="space-y-2">
      <Skeleton class="h-5 max-w-64" />
      <Skeleton class="h-9 px-2 py-1" />
      <Skeleton class="h-5 max-w-96" />
    </div>
  </div>
</template>