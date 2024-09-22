<script setup lang="ts">
import { ref } from 'vue';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';


const typePassword = ref('password');
const showPassword = () => {
  typePassword.value = (typePassword.value === 'password') ? 'text' : 'password';
};

const props = defineProps<{
  requireConfirm?: boolean
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" name="password">
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input :type="typePassword" placeholder="minimum 8 characters" v-bind="componentField"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="confirmPassword" v-if="props.requireConfirm">
    <FormItem>
      <FormLabel>Confirm Password</FormLabel>
      <FormControl>
        <Input :type="typePassword" placeholder="type again the password" v-bind="componentField"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
  
  <div class="flex items-center space-x-2">
    <Checkbox id="show-password" @click="showPassword"/>
    <Label for="show-password" class="text-sm font-medium leading-none">
      Show your password
    </Label>
  </div>
</template>