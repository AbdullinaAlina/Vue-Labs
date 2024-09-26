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
    <div class="header">
      <Sidebar @categorySelected="updateSelectedCategory"/>
      <i class="fa-solid fa-user"></i>
    </div>
    
    <Feed :selectedCategory="selectedCategory"/>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header i {
  cursor: pointer;
    border-radius: 100%;
    padding: 16px;
    background-color: #ff6b6b;
    color: #fff;
    margin-bottom: 24px;
  }
</style>
