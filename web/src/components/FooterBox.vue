<script setup>
import ElementBox from './element/ElementBox.vue';

import GithubIcon from '../components/icons/GithubIcon.vue';
import InstaIcon from '../components/icons/InstaIcon.vue';
</script>

<template>
  <ElementBox class="my-4 mx-auto w-40">
    <div class="flex felx-row justify-center">
      <a type="button" class="m-1" href="https://github.com/coomico">
        <GithubIcon />
      </a>
      <a type="button" class="mx-1" target="_blank" href="https://coomi.codes">@Coomico</a>
      <a type="button" class="m-1" href="https://instagram.com/aaazhhh_">
        <InstaIcon />
      </a>
    </div>
  </ElementBox>
</template>