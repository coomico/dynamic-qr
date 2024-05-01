<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { saveAs } from 'file-saver';

import QRService from '@/store/QRService';

import Title from '@/components/Title.vue';
import OuterBox from '@/components/OuterBox.vue';
import FooterBox from '@/components/FooterBox.vue';
import ElementBox from '@/components/element/ElementBox.vue';
import ElementLabel from '@/components/element/ElementLabel.vue';
import ElementButton from '@/components/element/ElementButton.vue';

import SubmitButton from '../components/SubmitButton.vue';
import PasswordBox from '@/components/PasswordBox.vue';
import UrlAndPaste from '@/components/UrlAndPaste.vue';

const statusCode = ref();
const errorMessage = {
  400: "Nah bro, it failed!",
  409: "You've made it before, bro.",
  429: "Dont rush bro! Keep calm, okay.",
  503: "Bro, you're going too fast."
};

const imgQRcode = ref();
const save = (data) => {
  saveAs(data, "dynamic-qr.png");
};

const idValid = (url) => {
  const regex = /(https?:\/\/)?(qr.)?coomi.codes\/s\/((?=.{8,8}$)[A-Za-z0-9_-]+)?/i;
  if (url && url.match(regex)?.length === 4) {
      return url.match(regex)[3];
  }
};

const originValid = (url) => {
  const match = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(url);
  if (match) {
    const id = idValid(url);
    if (id) {
      return 'invalid'; 
    }
    return url;
  }
};

const data = reactive({});
const origin = ref();
const password = ref();

watchEffect(() => {
  data.origin = originValid(origin.value?.url);
  data.password = password.value?.password;
})

const gen = (data) => {
  QRService.gen(data)
  .then(res => {
    statusCode.value = res.status;
    imgQRcode.value = res.data.data;
  })
  .catch((err) => {
    statusCode.value = err.response.status;
    imgQRcode.value = null;
  });
};
</script>

<template>
  <OuterBox @keyup.enter="gen(data)">
    <Title>Create new Dynamic QR Code</Title>
    <ElementBox>
      <ElementLabel>Target</ElementLabel>
      <UrlAndPaste placeholder="Put your link here..." ref="origin"/>
      <p v-if="data.origin && data.origin !== 'invalid'" class="text-sm italic text-slate-500">valid</p>
      <p v-else-if="data.origin === 'invalid'" class="text-sm italic text-red-500">invalid</p>
    </ElementBox>

    <PasswordBox placeholder="Put your strongest password here..." ref="password"/>

    <ElementBox>
      <ElementLabel>Ready to generate new Dynamic QR Code?</ElementLabel>
      <div class="my-2 flex">
        <SubmitButton @click="gen(data)" class="min-w-20 mx-auto">Yeah!</SubmitButton>
      </div>
    </ElementBox>

    <ElementBox v-if="!!imgQRcode">
      <ElementLabel>QR Code</ElementLabel>
      <div class="my-2">
        <img :src="imgQRcode" class="mx-auto shadow-md">
        <ElementButton @click="save(imgQRcode)" class="mt-4 w-full">Save</ElementButton>
      </div>
    </ElementBox>

    <ElementBox v-else-if="statusCode >= 400" class="!bg-red-100">
      <Title class="normal-case">{{ statusCode in errorMessage ? errorMessage[statusCode] : errorMessage[400] }}</Title>
    </ElementBox>
  </OuterBox>

  <OuterBox>
    <FooterBox />
  </OuterBox>
</template>