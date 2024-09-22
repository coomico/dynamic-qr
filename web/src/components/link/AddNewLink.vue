<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { AutoForm } from '@/components/ui/auto-form';
import { Button } from "@/components/ui/button";
import { DependencyType } from '../ui/auto-form/interface';

import { useLinkStore, useNotifStore } from '@/stores';
import type { LinkRequest } from '@/interfaces';
import { isShortUrl } from '@/utils/regex';

const notifStore = useNotifStore();
const linkStore = useLinkStore();

const newLinkSchema = z.object({
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
.partial({
  isPrivate: true,
  password: true,
  description: true,
  plusQr: true
})
.refine(data => {
  if (data.isPrivate && !data.password) return false;
  return true;
}, {
  message: 'Password required',
  path: ['password']
});

const createForm = useForm({
  validationSchema: toTypedSchema(newLinkSchema)
});

const submitAction = async (v: LinkRequest) => {
  const status = await linkStore.CreateLink(v);

  if (status === 'success') notifStore.Notify({
    status: status,
    title: 'Add new link successful!',
    message: `Your new link has been successfully added.`
  });
};
</script>

<template>
  <AutoForm
    class="space-y-6"
    :disabled="linkStore.loading"
    :schema="newLinkSchema"
    :form="createForm"
    :field-config="{
      title: {
        label: 'Title',
        description: 'This is the title that will be displayed on your link.',
        inputProps: {
          placeholder: 'Study Material Link'
        }
      },
      originUrl: {
        label: 'Original URL',
        description: 'Link to be targeted.',
        inputProps: {
          type: 'link',
          placeholder: 'https://the.link/targeted-has-to-be-here'
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
          placeholder: '••••••••'
        }
      },
      description: {
        label: 'Description',
        description: 'Let`s describe what this short is',
        component: 'textarea'
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
        when: isPrivate => !!isPrivate
      }
    ]"
    @submit="submitAction">

    <Button type="submit" :disabled="linkStore.loading">
      {{ linkStore.loading ? 'Adding new link...' : 'Add new link'}}
    </Button>
    
  </AutoForm>
</template>