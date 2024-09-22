<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { AutoForm, AutoFormField } from '@/components/ui/auto-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAccountStore, useNotifStore } from '@/stores';

const notifStore = useNotifStore();
const accountStore = useAccountStore();
const { account, loading } = storeToRefs(accountStore);

const changeEmailSchema = z.object({
  email: z.string()
    .email({message: 'Invalid email address!'})
    .refine(v => v !== account.value?.email, {message: 'Try a new one'})
    .optional()
});

const changeEmailForm = useForm({
  validationSchema: toTypedSchema(changeEmailSchema)
});

const updateAction = async (v: Record<string, any>) => {
  const status = await accountStore.UpdateAccount(v);

  if (status === 'success') notifStore.Notify({
    status: status,
    title: 'Email update successful!',
    message: 'Your email has been successfully updated.'
  });
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Email</CardTitle>
      <CardDescription>Enter the email address you want to use to login</CardDescription>
    </CardHeader>
    <CardContent>
      <AutoForm
        :schema="changeEmailSchema"
        :form="changeEmailForm"
        :field-config="{
          email: {
            hideLabel: true,
            inputProps: {
              type: 'email',
              placeholder: account?.email,
              autocomplete: 'on'
            }
          }
        }"
        @submit="updateAction">

        <template #email="slotProps">
          <div class="flex flex-col gap-3">
            <AutoFormField v-bind="slotProps" />
            <Button
              type="submit"
              :disabled="!changeEmailForm.meta.value.valid || !changeEmailForm.values.email || loading"
              class="w-fit select-none">
                {{ loading ? 'Changing...' : 'Change'}}
            </Button>
          </div>
        </template>

      </AutoForm>
    </CardContent>
  </Card>
</template>