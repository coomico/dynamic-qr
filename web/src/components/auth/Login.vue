<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Password from '../Password.vue';
import { useAuthStore, useNotifStore } from '@/stores';
import type { LoginEmailRequest, LoginUsernameRequest } from '@/interfaces';

const router = useRouter();
const authStore = useAuthStore();
const notifStore = useNotifStore();

const loginEmail = ref(true);

const loginUsernameSchema = toTypedSchema(z.object({
  username: z.string(),
  password: z.string()
}));

const loginEmailSchema = toTypedSchema(z.object({
  email: z.string()
    .email({message: 'I do not think it is an email address'}),
  password: z.string()
}));

const loginForm = useForm({
  validationSchema: computed(() => loginEmail.value ? loginEmailSchema : loginUsernameSchema),
});

const submitAction = loginForm.handleSubmit(async (v: LoginEmailRequest | LoginUsernameRequest) => {
  const status = loginEmail.value ? await authStore.LoginEmail(v as LoginEmailRequest) : await authStore.LoginUsername(v as LoginUsernameRequest);

  if (status === 'success') return Promise.all([
    notifStore.Notify({
      status: 'success',
      title: 'Login success!',
      message: 'Login to your account has been successful'
    }),
    router.push({
      name: 'collection'
    })
  ])
});

const changeLoginMethod = () => {
  if (typeof loginEmail.value === 'boolean') {
    loginEmail.value = loginEmail.value ? false : true;
  }
};
</script>

<template>

  <Card class="max-w-80">
    <CardHeader>
      <CardTitle class="text-2xl">Login to your account</CardTitle>
      <CardDescription>Enter your email and password to login to your account.</CardDescription>
    </CardHeader>
    <CardContent class="pb-2">

      <form @submit="submitAction" class="flex flex-col gap-4">
        <div class="space-y-4">
          <KeepAlive>
            <FormField v-slot="{ componentField }" name="email" v-if="loginEmail">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="coomico@mail.co" v-bind="componentField" autocomplete="on" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="username" v-else>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="coomico" v-bind="componentField" autocomplete="on"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </KeepAlive>
          
          <Password />
          
        </div>

        <Button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </Button>
      </form>

      <div class="flex flex-col pt-4 gap-4">
        <div class="relative w-full">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button variant="outline" class="w-full" @click="changeLoginMethod">
          Continue with {{ loginEmail ? 'username' : 'email' }}
        </Button>
      </div>
    </CardContent>

    <CardFooter>
      <small class="text-muted-foreground">Not have an account? 
        <RouterLink to="/signup" class="underline">
          Sign up here
        </RouterLink>
      </small>
    </CardFooter>
  </Card>

</template>