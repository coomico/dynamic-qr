<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { AutoForm } from '@/components/ui/auto-form';
import { Button } from "@/components/ui/button";
import { DependencyType } from '../ui/auto-form/interface';

import DeleteLink from './DeleteLink.vue';
import { useLinkStore, useNotifStore } from '@/stores';
import type { UpdateLinkRequest } from '@/interfaces';
import { isShortUrl } from '@/utils/regex';

const notifStore = useNotifStore();
const linkStore = useLinkStore();
const { link, loading } = storeToRefs(linkStore);

const editLinkSchema = z.object({
  title: z.string()
    .max(100, {message: 'Too long!'}),
  originUrl: z.string()
    .url({message: 'Invalid URL!'})
    .transform((u, ctx) => {
      try {
        const decoded = decodeURIComponent(u);
        if (isShortUrl(decoded)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Our short link cannot be used as Origin URL!'
          });
        }
      } catch (e) {
        return encodeURI(u);
      }

      return u;
    }),
  isPrivate: z.boolean(),
  password: z.string()
    .min(8, {message: 'Minimum 8 caharcters'}),
  description: z.string()
    .max(300, {message: 'Too long!'}),
  plusQr: z.boolean()
})
.partial()
.refine(data => {
  if (!!data.isPrivate && !data.password && !link.value?.hasPassword) return false;
  return true;
}, {
  message: 'Password is required',
  path: ['password']
});

const editLinkForm = useForm({
  validationSchema: toTypedSchema(editLinkSchema),
  initialValues: {
    isPrivate: !!link.value?.isPrivate
  }
});

const submitAction = async (v: UpdateLinkRequest) => {
  const status = await linkStore.UpdateLink(v);

  if (status === 'success') notifStore.Notify({
    status: status,
    title: 'Updating link successful!',
    message: `Your link (${link.value?._id}) has been successfully updated.`
  });
};

const resetAction = () => {
  editLinkForm.resetForm();
};
</script>

<template>
  <AutoForm
    class="space-y-6"
    :disabled="loading"
    :schema="editLinkSchema"
    :form="editLinkForm"
    :field-config="{
      title: {
        label: 'Title',
        description: 'This is the title that will be displayed on your link.',
        inputProps: {
          defaultValue: link?.title,
          placeholder: link?.title
        }
      },
      originUrl: {
        label: 'Original URL',
        description: 'Link to be targeted.',
        inputProps: {
          type: 'link',
          defaultValue: link?.originUrl,
          placeholder: link?.originUrl
        }
      },
      isPrivate: {
        label: 'Want to keep it a secret?',
        description: 'Turning this on will require a password.',
        component: 'switch'
      },
      password: {
        label: 'Password',
        inputProps: {
          type: 'password',
          placeholder: link?.hasPassword ? '••••••••' : 'Password has never been set'
        }
      },
      description: {
        label: 'Description',
        description: 'Let`s describe what this short is',
        component: 'textarea',
        inputProps: {
          defaultValue: link?.description,
          placeholder: link?.description
        }
      },
      plusQr: {
        label: 'Plus QR code?',
        description: 'This will generate a dynamic QR code linked to your short.'
      }
    }"
    :dependencies="[
      {
        sourceField: 'isPrivate',
        type: DependencyType.HIDES,
        targetField: 'password',
        when: isPrivate => !isPrivate
      },
      {
        sourceField: 'isPrivate',
        type: DependencyType.REQUIRES,
        targetField: 'password',
        when: isPrivate => (!!isPrivate && !link?.hasPassword)
      },
      {
        sourceField: 'plusQr',
        type: DependencyType.HIDES,
        targetField: 'plusQr',
        when: () => !!link?.qrCode
      }
    ]"
    @submit="submitAction">

    <DeleteLink />

    <div class="flex gap-3">
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Saving...' : 'Save edits'}}
      </Button>
      <Button type="reset" variant="secondary" @click="resetAction">
        Reset
      </Button>
    </div>
    
  </AutoForm>
</template>