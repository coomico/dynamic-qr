<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper';
import { CheckIcon, CircleIcon, DotIcon } from '@radix-icons/vue';

import Password from '../Password.vue';
import { useAuthStore, useNotifStore } from '@/stores';
import { regUsername } from '@/utils/regex';

const router = useRouter();
const authStore = useAuthStore();
const notifStore = useNotifStore();

const signupSchema = [
  z.object({
    email: z.string()
      .email({message: 'Invalid email address!'})
      // .refine() TODO: do checking wether email exist or not
  }),
  z.object({
    name: z.string()
      .max(60, {message: 'Sorry, too long!'}),
    username: z.string()
      .min(3, {message: 'At least 3 character!'})
      .max(30, {message: 'Too long!'})
      .refine(u => !u.includes(' '), {message: 'Can not include whitespace!'})
      .refine(u => regUsername.test(u), {message: '3-30 non-capital characters can only be alphanumerics, underscores, and periods'})
  }),
  z.object({
    password: z.string()
      .min(8, {message: 'Minimum 8 characters!'}),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  })
];

const steps = [
  {
    index: 1,
    title: 'Your email',
    description: 'Enter your active email address'
  },
  {
    index: 2,
    title: 'Your details',
    description: 'Provide your name and username'
  },
  {
    index: 3,
    title: 'Your password',
    description: 'Type your strongest password'
  }
];
const stepIndex = ref(1);

const submitAction = async (values: any) => {
  const { confirmPassword, ...rest } = values;

  const status = await authStore.Regist(rest);

  if (status === 'success') return Promise.all([
    notifStore.Notify({
      status: 'success',
      title: 'Registration success!',
      message: 'Regist a new account has been successful'
    }),
    router.push({
      name: 'collection'
    })
  ])
};
</script>

<template>
  <Card>
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Create an account</CardTitle>
      <CardDescription>Enter your details bellow to create your account</CardDescription>
    </CardHeader>
    <CardContent class="pb-2">

      <Form
        v-slot="{ meta, values, validate }"
        as=""
        keep-values
        :validation-schema="toTypedSchema(signupSchema[stepIndex - 1])">

        <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full">

          <form 
            @submit="(e) => {
              e.preventDefault();
              validate();

              if (stepIndex === steps.length && meta.valid) {
                submitAction(values);
              }
            }">

            <div class="flex flex-start w-full gap-2">
              <StepperItem
                v-for="step in steps"
                :key="step.index"
                v-slot="{ state }"
                :step="step.index"
                class="relative flex flex-col w-full items-center justify-center">
                <StepperSeparator 
                  v-if="step.index !== steps[steps.length - 1].index"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                    :disabled="state !== 'completed' && !meta.valid">

                    <CheckIcon v-if="state === 'completed'" class="size-5" />
                    <CircleIcon v-if="state === 'active'" />
                    <DotIcon v-if="state === 'inactive'" />
                  </Button>
                </StepperTrigger>

                <div
                  :class="[state === 'active' && 'text-primary']"
                  class="mt-2 lex flex-col items-center text-center">
                  <StepperTitle
                    class="text-sm font-semibold transition lg:text-base">
                    {{ step.title }}
                  </StepperTitle>
                  <StepperDescription
                    class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                    {{ step.description }}
                  </StepperDescription>
                </div>
              </StepperItem>
            </div>

            <div class="flex flex-col gap-4 mt-4">
              <template v-if="stepIndex === 1">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="coomico@mail.co" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 2">
                <FormField v-slot="{ componentField }" name="name">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Coomico" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="username">
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="coomico" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 3">
                <Password requireConfirm />
              </template>
            </div>

            <div class="flex items-center justify-between mt-4">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                size="sm"
                @click="prevStep()">
                  Back
              </Button>
              <div class="flex items-center gap-3">
                <Button
                  v-if="stepIndex !== 3"
                  :type="meta.valid ? 'button' : 'submit'"
                  :disabled="isNextDisabled"
                  size="sm"
                  @click="meta.valid && nextStep()">
                    Next
                </Button>
                <Button
                  v-if="stepIndex === 3"
                  size="sm"
                  :disabled="authStore.loading"
                  type="submit">
                    {{ authStore.loading ? 'Registering...' : 'Create an account' }}
                </Button>
              </div>
            </div>
          </form>
        </Stepper>
      </Form>

    </CardContent>
    <CardFooter>
      <small class="text-muted-foreground">Already have an account? 
        <RouterLink to="/login" class="underline">
          Login here
        </RouterLink>
      </small>
    </CardFooter>
  </Card>
</template>