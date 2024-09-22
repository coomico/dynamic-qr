<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import SkeletonBox from "@/components/skeleton/SkeletonBox.vue";
import { Separator } from "@/components/ui/separator";

const Logout = defineAsyncComponent({
  loader: () => import('@/components/account/Logout.vue'),
  loadingComponent: SkeletonBox
});

const LogoutEverywhere = defineAsyncComponent({
  loader: () => import('@/components/account/LogoutEverywhere.vue'),
  loadingComponent: SkeletonBox
});
</script>

<template>
  <div class="p-2 pb-8 flex flex-col gap-4 md:w-2/3">
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        Log Out
      </h3>
      <p class="text-sm text-muted-foreground">
        Clear your session for this account
      </p>
    </div>
    <Separator />
    <Logout />
    <LogoutEverywhere />
  </div>
</template>