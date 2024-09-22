<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

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
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { ClearStateAndStorage, useAccountStore, useNotifStore } from '@/stores';

const router = useRouter();
const notifStore = useNotifStore();
const accountStore = useAccountStore();
const { account, loading } = storeToRefs(accountStore);

const deleteSchema = toTypedSchema(z.object({
  username: z.string().refine(v => v === account.value?.username, {message: 'Did not match.'}),
  password: z.string()
}));

const deleteAction = async (v: Record<string, any>) => {
  const status = await accountStore.DeleteAccount(v.password);

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
}
</script>

<template>
  <Card class="border-destructive">
    <CardHeader>
      <CardTitle>Delete account</CardTitle>
      <CardDescription>
        Permanently remove your account and all of its links.
        This action is not reversible, so please continue with caution.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger as-child>
          <Button
            type="button"
            variant="outline"
            :class="cn(buttonVariants, 'text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground')">
            Delete my account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete my account</DialogTitle>
            <DialogDescription class="text-left">
              <div class="mb-3">
                This will <span class="font-bold">permanently delete all of your links</span> along with your account
                and remove your data from our servers.
              </div>

              <p class="w-fit rounded bg-destructive/15 dark:bg-destructive px-[0.5rem] py-[0.2rem] text-destructive dark:text-destructive-foreground">
                This action cannot be undone. Please be certain.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Form
            v-slot="{ meta, values, validate, resetForm }"
            as=""
            keep-values
            :validation-schema="deleteSchema">
            <form @submit="(e) => {
              e.preventDefault();
              validate();
              deleteAction(values)
              }"
              
              class="flex flex-col gap-4">

              <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                  <FormLabel class="select-none">
                    Enter your username <span class="font-bold">{{ account?.username }}</span> to continue:
                  </FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" autocomplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel class="select-none">
                    To verifiy, type your password in the box bellow:
                  </FormLabel>
                  <FormControl>
                    <Input type="password" v-bind="componentField" autocomplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <div class="flex gap-3">
                <Button
                  variant="destructive"
                  type="submit"
                  :disabled="!meta.valid || loading"
                  class="select-none"
                  >
                    {{ loading ? 'Deleting...' : 'Delete my account'}}
                </Button>

                <DialogClose as-child>
                  <Button type="reset" variant="secondary" @click="resetForm">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</template>