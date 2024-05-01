<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import RouterLink from './components/RouterLink.vue';
import NavBar from './components/NavBar.vue';

onMounted(async () => {
  try {
    await navigator.clipboard.read();
  } catch(err) {
    if (err.name === 'NotAllowedError') {
      alert('please allow clipboard access 	(*_ _)人');
    }
  }
});
</script>

<template>
  <div class="min-h-screen overflow-hidden font-sans">
    <div class="divide-y divide-dashed">
      <div class="py-2">

        <NavBar>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/create">Create</RouterLink>
          <RouterLink to="/modify">Modify</RouterLink>
        </NavBar>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>