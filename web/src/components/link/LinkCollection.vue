<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { RouterLink } from "vue-router";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogScrollContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import LinkBodyDialog from "@/components/link/LinkBodyDialog.vue";
import SkeletonCard from "@/components/skeleton/SkeletonCard.vue";

import { useLinkStore } from "@/stores";

const LinkCard = defineAsyncComponent({
  loader: () => import("@/components/link/LinkCard.vue"),
  loadingComponent: SkeletonCard
});

const linkStore = useLinkStore();
</script>

<template>
  <Dialog
    v-for="link in linkStore.links"
    :key="link._id">
    <DialogTrigger>

      <LinkCard
        :link="link"
        class="text-left"
      />

    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>
          {{ link.title }}
        </DialogTitle>
        <DialogDescription>
          ID: {{ link._id }}
        </DialogDescription>
      </DialogHeader>

      <LinkBodyDialog :link="link" />

      <DialogFooter class="flex gap-1">
        <DialogClose as-child>
          <Button variant="secondary">
            Close
          </Button>
        </DialogClose>

        <Button as-child>
          <RouterLink :to="`/links/edit/${link._id}`">
            Edit link
          </RouterLink>
        </Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>