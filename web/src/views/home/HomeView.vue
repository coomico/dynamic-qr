<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-icons/vue";
</script>

<template>
  <main class="flex grow flex-col items-center">
    <div class="my-auto">
      <div class="text-center py-4 space-y-6">
        <div>
          <h1 class="text-7xl font-bold tracking-tight md:text-9xl text-transparent !bg-clip-text !bg-cover !bg-center"
          style="background: var(--custom-gradient);">
            Just one,
          </h1>
          <h2 class="text-4xl font-bold tracking-tight md:text-6xl">change it as u want</h2>
        </div>
      </div>

      <div class="my-10 flex flex-col items-center justify-center">
        <p class="leading-relaxed text-base md:text-lg text-center tracking-wide text-pretty">
          <span class="font-semibold italic text-lg">QR codes, evolved!</span>
          Update links on the fly, no reprinting required.
          And, add a secret password to gatekeep your links.
        </p>

        <Button class="mt-4 md:size-fit flex" as-child>
          <RouterLink to="/links" class="inline-flex space-x-1 items-center justify-center">
            <p class="text-lg md:text-xl select-none">Let's create one</p>
            <ArrowTopRightIcon class="size-4"/>
          </RouterLink>
        </Button>
      </div>
    </div>
  </main>
</template>