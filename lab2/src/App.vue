<script setup>
import { ref } from 'vue';
import Feed from './components/Feed.vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const selectedCategory = ref(null); 

function updateSelectedCategory(category) {
  selectedCategory.value = category;
}
</script>

<template>
  <div>
    <Sidebar @categorySelected="updateSelectedCategory"/>
    <Feed :selectedCategory="selectedCategory"/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
