<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import QrIcon from '../externals/icons/QrIcon.vue';

const ColorMode = defineAsyncComponent(() => import('@/components/ColorMode.vue'))

const router = useRouter();

const enableComponent = (...route: string[]) => {
  const current = useRoute().name;
  const enable = route.indexOf(current as string) !== -1 ? true : false;
  if (!enable) return 'hidden';
};
</script>

<template>
  <header class="absolute top-0 w-full px-4 my-4 max-w-6xl lg:max-w-7xl flex flex-row self-center items-center justify-between">
    <RouterLink to="/" class="w-fit text-nowrap select-none">
      <h2 class="text-lg font-bold md:text-xl">
          Dynamic QR
      </h2>
    </RouterLink>

    <div class="w-fit md:divide-x flex md:flex-row items-center justify-end space-x-2">
      <div class="hidden md:flex gap-2 select-none">
        <Button variant="ghost" as-child class="gap-2" :class="enableComponent('home')">
          <RouterLink to="/links">
            <QrIcon />
            Get Dynamic QR
          </RouterLink>
        </Button>
        <Button as-child :class="enableComponent('home', 'login')">
          <RouterLink to="/signup">
            Sign Up
          </RouterLink>
        </Button>
        <Button variant="outline" as-child :class="enableComponent('home', 'signup')">
          <RouterLink to="/login">
            Login
          </RouterLink>
        </Button>
      </div>
      
      <div class="md:pl-2">
        <ColorMode />
      </div>

      <div class="flex md:hidden" :class="enableComponent('home')">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <Icon icon="radix-icons:hamburger-menu">
                <span sr-only>Menu</span>
              </Icon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-40">
            <DropdownMenuItem as-child class="justify-between">
              <RouterLink to="/links">
                Get Dynamic QR
                <QrIcon />
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child class="justify-between">
              <RouterLink to="/signup">
                Sign Up
                <Icon icon="radix-icons:person">
                  <span sr-only>Sign Up</span>
                </Icon>
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child class="justify-between">
              <RouterLink to="/login">
                Login
                <Icon icon="radix-icons:enter">
                  <span sr-only>Login</span>
                </Icon>
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>