<script setup>
import { reactive, ref, watchEffect } from 'vue';

import URLService from '@/store/URLService';

import Title from '@/components/Title.vue';
import OuterBox from '@/components/OuterBox.vue';
import FooterBox from '@/components/FooterBox.vue';
import ElementBox from '@/components/element/ElementBox.vue';
import ElementLabel from '@/components/element/ElementLabel.vue';

import PasswordBox from '@/components/PasswordBox.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import UrlAndPaste from '@/components/UrlAndPaste.vue';

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

const short = ref();
const newOrigin = ref();
const password = ref();

const statusCode = ref();
const errorMessage = {
  400: "Nah bro, it failed!",
  401: "Sorry bro, invalid. Please check again!",
  404: "Not found, dude. Please check again!",
  429: "Dont rush bro! Keep calm, okay.",
  503: "Bro, you're going too fast."
};

watchEffect(() => {
  data.id = idValid(short.value?.url);
  data.neworigin = originValid(newOrigin.value?.url);
  data.password = password.value?.password;
})

const update = (data) => {
  URLService.updateOrigin(data)
  .then(res => {
    statusCode.value = res.status;
  })
  .catch(err => {
    statusCode.value = err.response.status;
  });
};
</script>

<template>
  <OuterBox @keyup.enter="update(data)">
    <Title>Modify existing QR Code</Title>

    <ElementBox>
      <ElementLabel>Short URL</ElementLabel>
      <UrlAndPaste placeholder="https://coomi.codes/s/xxx..." ref="short" />
      <p v-if="data.id" class="text-sm italic text-slate-500">valid</p>
    </ElementBox>

    <ElementBox>
      <ElementLabel>New Target</ElementLabel>
      <UrlAndPaste placeholder="Put your link here..." ref="newOrigin"/>
      <p v-if="data.neworigin && data.neworigin !== 'invalid'" class="text-sm italic text-slate-500">valid</p>
      <p v-else-if="data.neworigin === 'invalid'" class="text-sm italic text-red-500">invalid</p>
    </ElementBox>

    <PasswordBox placeholder="Put your password here..." ref="password" />

    <ElementBox>
      <ElementLabel>Ready to modify?</ElementLabel>
      <div class="my-2 flex">
        <SubmitButton @click="update(data)" class="min-w-24 mx-auto">Yuupppp!</SubmitButton>
      </div>
    </ElementBox>

    <ElementBox v-if="statusCode === 200" class="!bg-green-100">
      <Title class="normal-case">Yeay success!</Title>
    </ElementBox>

    <ElementBox v-else-if="statusCode >= 400" class="!bg-red-100">
      <Title class="normal-case">{{ statusCode in errorMessage ? errorMessage[statusCode] : errorMessage[400] }}</Title>
    </ElementBox>
  </OuterBox>

  <OuterBox>
    <FooterBox />
  </OuterBox>
</template>