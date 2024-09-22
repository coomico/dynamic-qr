<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import SkeletonBox from "@/components/skeleton/SkeletonBox.vue";
import { Separator } from "@/components/ui/separator";

const ChangeEmail = defineAsyncComponent({
  loader: () => import('@/components/account/ChangeEmail.vue'),
  loadingComponent: SkeletonBox
});

const ChangePassword = defineAsyncComponent({
  loader: () => import('@/components/account/ChangePassword.vue'),
  loadingComponent: SkeletonBox
});

const DeleteAccount = defineAsyncComponent({
  loader: () => import('@/components/account/DeleteAccount.vue'),
  loadingComponent: SkeletonBox
});
</script>

<template>
  <div class="p-2 pb-8 flex flex-col gap-4 md:w-2/3">
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        Settings
      </h3>
      <p class="text-sm text-muted-foreground">
        Update your account settings
      </p>
    </div>
    <Separator />
    <ChangeEmail />
    <ChangePassword />
    <DeleteAccount />
  </div>
</template>