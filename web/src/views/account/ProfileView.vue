<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import SkeletonForm from "@/components/skeleton/SkeletonForm.vue";
import { Separator } from "@/components/ui/separator";

const UpdateProfile = defineAsyncComponent({
  loader: () => import('@/components/account/UpdateProfile.vue'),
  loadingComponent: SkeletonForm
});
</script>

<template>
  <div class="p-2 pb-8 flex flex-col gap-4 md:w-2/3">
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        Your Profile
      </h3>
      <p class="text-sm text-muted-foreground">
        Your profile is visible to the public
      </p>
    </div>
    <Separator />
    <UpdateProfile />
  </div>
</template>