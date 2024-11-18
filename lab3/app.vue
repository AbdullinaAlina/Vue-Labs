<template>
  <div>
    <NuxtPage />
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>

<script setup>
import { useStore } from '/stores/useStore';

const store = useStore();

onMounted(() => {
  store.fetchUsers();
  store.fetchPosts();
});

</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Roboto;
  }
</style>