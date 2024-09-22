<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import SkeletonFormLink from "@/components/skeleton/SkeletonForm.vue";
import { Separator } from "@/components/ui/separator";

const AddNewLink = defineAsyncComponent({
  loader: () => import("@/components/link/AddNewLink.vue"),
  loadingComponent: SkeletonFormLink
});
</script>

<template>
  <div class="p-2 pb-8 flex flex-col gap-4 md:w-2/3">
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        Add New Link
      </h3>
      <p class="text-sm text-muted-foreground">
        Create a short to your link plus a QR code
      </p>
    </div>
    <Separator />
    <AddNewLink />
  </div>
</template>