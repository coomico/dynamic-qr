<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';

import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ClearStateAndStorage, useAccountStore, useNotifStore } from '@/stores';

const router = useRouter();
const accountStore = useAccountStore()

const logoutAction = async () => {
    const status = await accountStore.Logout();

    if (status === 'success') return Promise.all([
      ClearStateAndStorage(),
      useNotifStore().Notify({
        status: 'success',
        message: 'Redirecting to home page...'
      }),
      router.push({name: 'home'})
    ]);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="rounded-full">
        <Icon icon="radix-icons:person" class="h-[1.2rem] w-[1.2rem]"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-fit max-w-60" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none max-w-56 truncate">
            {{ accountStore.account?.name }}
          </p>
          <p class="text-xs leading-none text-muted-foreground max-w-56 truncate">
            {{ accountStore.account?.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child class="justify-between space-x-2">
          <RouterLink to="/account">
            <p>Profile</p>
            <Icon icon="radix-icons:person" />
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child class="justify-between space-x-2">
          <RouterLink to="/account/settings">
            <p>Settings</p>
            <Icon icon="radix-icons:gear" />
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child class="justify-between space-x-2">
          <RouterLink to="/links">
            <p>Links collection</p>
            <Icon icon="radix-icons:cube" />
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child class="justify-between space-x-2">
          <RouterLink to="/links/new">
            <p>New link</p>
            <Icon icon="radix-icons:plus" />
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="justify-between space-x-2" @click="logoutAction">
          <p>Logout</p>
          <Icon icon="radix-icons:exit" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>