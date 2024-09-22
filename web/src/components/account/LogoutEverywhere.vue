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

const logoutEverywhereAction = async () => {
  const status = await accountStore.LogoutEverywhere();

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
      <CardTitle>Log out everywhere</CardTitle>
      <CardDescription>This logs you out of your account everywhere you're logged in, including the mobile, tablet, and desktop browser.</CardDescription>
    </CardHeader>
    <CardContent>
      <Button
        variant="outline"
        :disabled="accountStore.loading"
        @click="logoutEverywhereAction">
        {{ accountStore.loading ? 'Logging out...' : 'Log out everywhere'}}
      </Button>
    </CardContent>
  </Card>
</template>