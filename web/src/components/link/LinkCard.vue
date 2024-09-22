<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import moment from "moment";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/vue";

import type { Link } from "@/interfaces";

defineProps<{
  link: Link
}>();
</script>

<template>
  <Card class="w-full h-fit">
    <CardHeader class="pb-4">
      <CardTitle class="flex space-x-1">
        <span class="w-full truncate">
          {{ link.title }}
        </span>
        <Icon :icon="link.isPrivate ? 'radix-icons:lock-closed' : 'radix-icons:lock-open-1'" />
      </CardTitle>
      <CardDescription class="flex items-center space-x-1">
        <Icon icon="radix-icons:link-2" />
        <p>{{ link.shortUrl }}</p>
      </CardDescription>
    </CardHeader>
    <CardContent class="py-0 h-28 flex space-x-2 justify-between">
      <div class="flex flex-col gap-y-1">
        <p class="inline-flex text-sm font-medium items-center gap-1">
          Original URL
        </p>
        <small class="text-sm text-muted-foreground break-all line-clamp-4">
            {{ link.originUrl }}
        </small>
      </div>

      <img v-if="link.qrCode" :src="link.qrCode" alt="qr-code" class="w-auto h-24"/>
      <img v-else src="/src/assets/error/no-picture.png" alt="no-qr-code" class="w-auto h-24"/>

    </CardContent>
    <CardFooter class="bottom-0 py-4">
      <small class="inline-flex items-center text-muted-foreground gap-1">
        <Icon icon="radix-icons:eye-open" />
        {{ link.visitCount }}
        <Icon icon="radix-icons:divider-horizontal" />
          {{ formatTimeAgo(new Date(moment.utc().format(link.updatedAt))) }}
      </small>
    </CardFooter>
  </Card>
</template>