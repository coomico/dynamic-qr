<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';

import Toaster from '@/components/ui/toast/Toaster.vue';

import { ClearStateAndStorage, useAccountStore, useNotifStore } from './stores';
import { AuthStorage, storageEventName } from './utils/storage';

const router = useRouter();

async function authChange() {
  if (AuthStorage.auth) {
    await useAccountStore().GetProfile();

    return Promise.all([
      useNotifStore().Notify({
        status: 'success',
        message: 'Redirecting to collection page...'
      }),
      router.push({name: 'collection'})
    ]);
  }

  else {
    ClearStateAndStorage();

    return Promise.all([
      useNotifStore().Notify({
        status: 'success',
        message: 'Redirecting to login page...'
      }),
      router.push({name: 'login'})
    ]);
  }
}

window.addEventListener(storageEventName, authChange);
</script>

<template>
  <Toaster />
  <RouterView />
</template>