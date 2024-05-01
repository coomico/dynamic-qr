<script setup>
import Title from '@/components/Title.vue';
import OuterBox from '@/components/OuterBox.vue';
import FooterBox from '@/components/FooterBox.vue';
import ElementBox from '@/components/element/ElementBox.vue';
import ElementLabel from '@/components/element/ElementLabel.vue';
</script>

<template>
  <OuterBox>
    <div>
      <Title class="!pb-1">Welcome ma Fellas!</Title>
      <p class="text-center font-thin">(￣▽￣)ノ</p>
    </div>

    <ElementBox>
      <ElementLabel>A Little Briefing</ElementLabel>
      <figure class="text-pretty">
        <p>Met malam, sore, siang, pagi or whenever u r.</p>
        <br/>
        <p>To start this briefing,
          I would like to thank those of u who have made effort and taken the time to use this App.</p>
        <br/>
        <p>Ok,
          this is an app that generate a QR Code which the target
          <span class="text-sm italic text-slate-500">(the url contained in it)</span>
          can be changed at will without generating new code.</p>
        <br/>
        <p>Of course,
          the benefits can be many things,
          one of which is u can stick it on the clothes or whatever u want without having to re-paste a new QR Code that containing new target.</p>
        <br/>
        <div class="font-thin text-sm">
          <p>Well,</p>
          <p>basically it's just a combination of QR Code + URL Shortener.
            <span class="text-nowrap text-xs">(￢‿￢ )</span></p>
        </div>
        <br/>
        <p>However,
          I hope this app can help and make things easier for u in many ways.</p>
        <p>― Coomico</p>
      </figure>
    </ElementBox>
  </OuterBox>

  <OuterBox>
    <FooterBox />
  </OuterBox>
</template>