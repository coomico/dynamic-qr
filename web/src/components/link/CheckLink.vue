<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { useLinkStore } from '@/stores';

const router = useRouter();
const route = useRoute();
const linkStore = useLinkStore();
const { link, loading } = storeToRefs(linkStore);

const checkIdSchema = z.object({
  id: z.string().optional()
});

const checkLink = async (id: string) => {
  linkStore.GetLink(id);
};

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(checkIdSchema)
});

const checkAction = handleSubmit((v) => {
  if (!v.id) {
    return router.push({
      name: 'edit',
      params: {id: ''}
    });
  };
  return router.push({
    name: 'edit',
    params: {id: v.id}
  });
});

onMounted(() => {
  if (!route.params.id) return linkStore.SetLink();

  return checkLink(route.params.id as string);
});

onBeforeRouteUpdate((to, from) => {
  if (!to.params.id) return linkStore.SetLink();

  return checkLink(to.params.id as string);
});
</script>

<template>
  <form 
    class="flex gap-3 items-start"
    @submit="checkAction">
    <FormField v-slot="{ componentField }" name="id">
      <FormItem>
        <FormControl>
          <Input
            type="text"
            :placeholder="!!link ? link._id as string : 'Short ID `_AB-cD12`'"
            :disabled="loading"
            v-bind="componentField"
            autocomplete="on"/>
        </FormControl>
        <FormDescription>
          Check if you have that short.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="loading">
      {{ loading ? 'Checking...' : 'Check'}}
    </Button>
  </form>
</template>