<script setup lang="ts">
import { useRouter } from "vue-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ClearStateAndStorage, useAccountStore, useNotifStore } from "@/stores";

const router = useRouter();
const notifStore = useNotifStore();
const accountStore = useAccountStore();

const logoutAction = async () => {
  const status = await accountStore.Logout();

  if (status === 'success') return Promise.all([
    ClearStateAndStorage(),
    notifStore.Notify({
      status: 'success',
      message: 'Redirecting to home page...'
    }),
    router.push({
      name: 'home'
    })
  ]);
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Log out</CardTitle>
      <CardDescription>This will log you out of your account on this device only.</CardDescription>
    </CardHeader>
    <CardContent>
      <Button
        variant="outline"
        :disabled="accountStore.loading"
        @click="logoutAction">
        {{ accountStore.loading ? 'Logging out...' : 'Log out' }}
      </Button>
    </CardContent>
  </Card>
</template>