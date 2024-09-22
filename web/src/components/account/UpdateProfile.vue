<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { AutoForm } from '@/components/ui/auto-form';

import { useAccountStore, useNotifStore } from '@/stores';
import { regUsername } from '@/utils/regex';

const notifStore = useNotifStore();
const accountStore = useAccountStore();
const { account, loading } = storeToRefs(accountStore);

const updateProfileSchema = z.object({
  name: z.string()
    .max(60, {message: 'Sorry, too long!'}),
  username: z.string()
    .min(3, {message: 'At least 3 character!'})
    .max(30, {message: 'Too long!'})
    .refine(u => !u.includes(' '), {message: 'Can not include whitespace!'})
    .refine(u => regUsername.test(u), {message: '3-30 non-capital characters can only be alphanumerics, underscores, and periods.'})
})
.partial();

const updateProfileForm = useForm({
  validationSchema: toTypedSchema(updateProfileSchema)
});

const updateAction = async (v: Record<string, any>) => {
  const status = await accountStore.UpdateAccount(v);

  if (status === 'success') notifStore.Notify({
    status: status,
    title: 'Updating profile successful!',
    message: 'Your profile has been successfully updated.'
  })
};

const resetAction = () => {
  updateProfileForm.resetForm();
};
</script>

<template>
  <AutoForm
    class="space-y-6"
    :schema="updateProfileSchema"
    :form="updateProfileForm"
    :field-config="{
      name: {
        label: 'Name',
        description: 'Your name may appear on your link.',
        inputProps: {
          defaultValue: account?.name,
          placeholder: account?.name,
          autocomplete: 'on'
        }
      },
      username: {
        label: 'Username',
        description: 'Choose a new username.',
        inputProps: {
          defaultValue: account?.username,
          placeholder: account?.username,
          autocomplete: 'on'
        }
      }
    }"
    @submit="updateAction">

    <div class="flex gap-3">
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update profile' }}
      </Button>
      <Button type="reset" variant="secondary" @click="resetAction">
        Reset
      </Button>
    </div>
  </AutoForm>
</template>