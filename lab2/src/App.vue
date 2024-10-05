<script setup>
import { ref } from 'vue';
import Feed from './components/Feed.vue';
import Sidebar from './components/Sidebar.vue';

const selectedCategory = ref(null); 

function updateSelectedCategory(category) {
  selectedCategory.value = category;
}
</script>

<template>
  <div class="container">
    <div class="header">
      <Sidebar @categorySelected="updateSelectedCategory"/>
      <i class="fa-solid fa-user"></i>
    </div>
    
    <Feed :selectedCategory="selectedCategory"/>
  </div>
</template>

<style scoped>

.header {
  background-color: rgba(255, 255, 255, 0.74);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:10px 20px;
}

.header i {
  cursor: pointer;
    border-radius: 100%;
    padding: 16px;
    background-color: #2e2e2e;
    color: #fff;
  }
</style>
