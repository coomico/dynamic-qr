<script setup lang="ts">
import { defineAsyncComponent, onUnmounted } from "vue";

import SkeletonForm from "@/components/skeleton/SkeletonForm.vue";
import { Separator } from "@/components/ui/separator";

import { useLinkStore } from "@/stores";

const EditOneLink = defineAsyncComponent({
  loader: () => import("@/components/link/EditOneLink.vue"),
  loadingComponent: SkeletonForm
});

const NotFound = defineAsyncComponent(() => import('@/components/error/NotFound.vue'));
const CheckLink = defineAsyncComponent(() => import('@/components/link/CheckLink.vue'));

const linkStore = useLinkStore();

onUnmounted(() => {
  linkStore.SetLink();
})
</script>

<template>
  <div class="p-2 pb-8 flex flex-col gap-4 md:w-2/3">
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        Edit Link
      </h3>
      <p class="text-sm text-muted-foreground">
        Let's modify your link
      </p>
    </div>
    <Separator />
    <CheckLink ref="link"/>

    <EditOneLink v-if="linkStore.link" :key="linkStore.link._id"/>
    <NotFound v-else class="max-w-96 my-auto"/>

  </div>
</template>