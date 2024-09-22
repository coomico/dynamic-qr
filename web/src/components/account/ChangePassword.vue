<script setup lang="ts">
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
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";

import { useAccountStore, useNotifStore } from '@/stores';
import type { ChangePasswordRequest } from '@/interfaces';

const notifStore = useNotifStore();
const accountStore = useAccountStore();

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string()
  .min(8, {message: 'Minimum 8 characters!'}),
  confirmNewPassword: z.string(),
})
.refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'New password does not match',
  path: ['confirmNewPassword']
});

const changePasswordForm = useForm({
  validationSchema: toTypedSchema(changePasswordSchema)
});

const updateAction = async (v: ChangePasswordRequest) => {
  const status = await accountStore.ChangePassword(v);

  if (status === 'success') notifStore.Notify({
    status: status,
    title: 'Password update successful!',
    message: 'Your password has been successfully updated.'
  });
};

const resetAction = () => {
  changePasswordForm.resetForm();
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Password</CardTitle>
      <CardDescription>Want to change your password?</CardDescription>
    </CardHeader>
    <CardContent>
      <Dialog>
        <DialogTrigger as-child>
          <Button type="button" variant="secondary">
            Change password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Please use a new, stronger password.
            </DialogDescription>
          </DialogHeader>

          <AutoForm
            class="space-y-3"
            :schema="changePasswordSchema"
            :form="changePasswordForm"
            :field-config="{
              currentPassword: {
                label: 'Current password',
                inputProps: {
                  type: 'password',
                  placeholder: '••••••••'
                }
              },
              newPassword: {
                label: 'New password',
                inputProps: {
                  type: 'password',
                  placeholder: 'enter your new stronger password'
                }
              },
              confirmNewPassword: {
                label: 'Confirm new password',
                inputProps: {
                  type: 'password',
                  placeholder: 'confirm your new password'
                }
              }
            }"
            @submit="updateAction">

            <div class="flex gap-3">
              <Button
                type="submit"
                :disabled="!changePasswordForm.meta.value.valid || !changePasswordForm.values || accountStore.loading"
                class="select-none">
                  {{ accountStore.loading ? 'Changing...' : 'Change'}}
              </Button>

              <DialogClose as-child>
                <Button type="reset" variant="secondary" @click="resetAction">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </AutoForm>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</template>