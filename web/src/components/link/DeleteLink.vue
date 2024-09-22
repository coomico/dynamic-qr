<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

import { useLinkStore, useNotifStore } from '@/stores';

const router = useRouter();
const notifStore = useNotifStore();
const linkStore = useLinkStore();
const { link, loading } = storeToRefs(linkStore);

const deleteSchema = toTypedSchema(z.object({
  confirm: z.string({message: ''}).refine(v => v === link.value?._id, {message: ''})
}));

const deleteAction = async () => {
  if (link.value?._id) {
    const status = await linkStore.DeleteLink(link.value?._id);

    if (status === 'success') return Promise.all([
      notifStore.Notify({
        status: status,
        title: 'Delete link successful!',
        message: `Your link has been successfully deleted.`
      }),
      router.push({
        name: 'collection'
      })
    ]);
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 items-start">
    <Label>Delete this link?</Label>

    <Form
      v-slot="{ meta, validate }"
      as=""
      keep-values
      :validation-schema="deleteSchema">

      <Dialog>
        <DialogTrigger as-child>
          <Button
            type="button"
            variant="outline"
            :class="cn(buttonVariants, 'text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground')">
            Delete link
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle class="text-wrap line-clamp-1">
              Delete {{ link?.title }}
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <form @submit="(e) => {
            e.preventDefault();
            validate();
            deleteAction()
            }"
            
            class="flex flex-col gap-4">
            <FormField v-slot="{ componentField }" name="confirm">
              <FormItem>
                <FormLabel class="select-none text-destructive">
                  To confirm, type "{{ link?._id }}" in the box bellow
                </FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" autocomplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button
              variant="destructive"
              type="submit"
              :disabled="!meta.valid || loading"
              class="w-full select-none"
              >
                {{ loading ? 'Deleting...' : 'Delete this link'}}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Form>

    

    <small class="font-medium text-muted-foreground">
      Once you delete a link, there is no going back. Please be certain.
    </small>
  </div>
</template>