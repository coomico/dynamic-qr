<script setup lang="ts">
import { saveAs } from "file-saver";
import { useClipboard, useDateFormat } from "@vueuse/core";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";

import type { Link } from "@/interfaces";

const { copy, copied} = useClipboard({
  legacy: true
});

defineProps<{
  link: Link
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 md:space-x-4">
    <div class="flex flex-col gap-2">
      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Status
        </p>
        <small class="flex items-center gap-1 text-muted-foreground">
          <Icon :icon="link.isPrivate ? 'radix-icons:lock-closed' : 'radix-icons:lock-open-1'" />
          {{ link.isPrivate ? 'Private' : 'Public' }}
        </small>
      </div>

      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Short URL
        </p>
        <div class="flex items-center space-x-6">
          <small
            @click="copy(link.shortUrl)"
            class="flex items-center gap-1 cursor-pointer text-muted-foreground transition delay-150 hover:text-primary peer">
            <Icon icon="radix-icons:link-2" />
            <span>{{ link.shortUrl }}</span>
          </small>
          <p class="text-xs font-extralight text-muted-foreground hidden peer-hover:block">
            {{ copied ? 'Copied ✓' : 'Click to copy' }}
          </p>
        </div>
      </div>
      
      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Original URL
        </p>
        <small class="flex items-start gap-1 text-muted-foreground">
          <Icon icon="radix-icons:link-2" class="flex-none mt-1" />
          <span class="break-all line-clamp-4">
            {{ link.originUrl }}
          </span>
        </small>
      </div>

      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Description
        </p>
        <small class="flex items-start gap-1 text-muted-foreground">
          <Icon icon="radix-icons:file-text" class="flex-none mt-1"/>
          <span class="text-wrap line-clamp-[10]">
            {{ link.description }}
          </span>
        </small>
      </div>

      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Total visits
        </p>
        <small class="flex items-center gap-1 text-muted-foreground">
          <Icon icon="radix-icons:eye-open" />
          {{ link.visitCount }}
        </small>
      </div>

      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Created
        </p>
        <small class="flex items-center gap-1 text-muted-foreground">
          <Icon icon="radix-icons:calendar" />
          {{ useDateFormat(link.createdAt, 'DD MMM YYYY HH:mm') }}
        </small>
      </div>

      <div class="flex-col space-y-0">
        <p class="text-sm font-medium items-center gap-1">
          Modified
        </p>
        <small class="flex items-center gap-1 text-muted-foreground">
          <Icon icon="radix-icons:calendar" />
          {{ useDateFormat(link.updatedAt, 'DD MMM YYYY HH:mm') }}
        </small>
      </div>

    </div>

    <div class="flex-none flex-col w-fit">
      <p class="text-sm font-medium">
        QR Code
      </p>
      
      <img v-if="link.qrCode" :src="link.qrCode" alt="qr-code" class="w-auto h-24"/>
      <img v-else src="/src/assets/error/no-picture.png" alt="no-qr-code" class="w-auto h-24"/>

      <Button
        v-if="link.qrCode"
        variant="outline"
        size="sm"
        class="mt-2 w-full"
        @click="saveAs(link.qrCode, `qr-${link._id}.png`)">
        Download
      </Button>
    </div>
  </div>
</template>