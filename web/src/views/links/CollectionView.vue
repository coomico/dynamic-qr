<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useLinkStore } from '@/stores';

const LinkCollection = defineAsyncComponent(() => import('@/components/link/LinkCollection.vue'));
const NotFound = defineAsyncComponent(() => import('@/components/error/NotFound.vue'));

const linkStore = useLinkStore();
onMounted(async () => await linkStore.GetLinks());
</script>

<template>
  <div class="px-2 pb-8 mx-auto grid grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] gap-4">
    <LinkCollection v-if="linkStore.links.length" />

    <NotFound v-else class="max-w-96 m-auto" />
  </div>
</template>