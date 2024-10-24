<template>
    <div class="sidebar">
      <div
        class="sidebar__icon"
        :style="{ visibility: isSideBarOpen ? 'hidden' : 'visible' }"
        @click="toggleSideBar"
      >
        <font-awesome :icon="['fas', 'bars']" />
      </div>
  
      <div class="sidebar__menu" v-show="isSideBarOpen">
        <button class="sidebar__button" @click="toggleSideBar">
          Menu
        </button>
  
        <ul class="sidebar__categories">
          <li
            v-for="(category, index) in categories"
            :key="index"
            @click="selectCategory(category)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
  
      <div class="profile-icon" @click="openOverlay">
        <font-awesome :icon="['fas', 'user']" />
      </div>
  
      <!-- Authentication Overlay -->
      <AuthOverlay :isOpen="isOverlayOpen" @close="closeOverlay" />
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import AuthOverlay from './AuthOverlay.vue';
  
  // Define emits for the component
  const emit = defineEmits(['categorySelected']);
  
  const categories = ['Show All', 'Design', 'Technology', 'Science', 'Business', 'Health'];
  const isSideBarOpen = ref(false);
  const isOverlayOpen = ref(false);
  
  const toggleSideBar = () => {
    isSideBarOpen.value = !isSideBarOpen.value;
  };
  
  const selectCategory = (category) => {
    // Emit category selection to parent component
    emit('categorySelected', category === 'Show All' ? null : category);
    toggleSideBar(); // Close the sidebar after selection
  };
  
  // Open and close overlay methods
  const openOverlay = () => {
    isOverlayOpen.value = true;
  };
  
  const closeOverlay = () => {
    isOverlayOpen.value = false;
  };
  </script>
  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    transition: width 1s ease-in;
    z-index: 1;
  }
  
  .sidebar__icon {
    cursor: pointer;
    border-radius: 100%;
    padding: 16px;
    background-color: #2e2e2e;
    color: #fff;
    text-align: center;
  }
  
  .sidebar__menu {
    background-color: #f4f4f4;
    width: 420px;
    padding: 16px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .profile-icon {
    cursor: pointer;
    margin-left: auto; /* Aligns the profile icon to the right */
    padding: 16px;
    color: #000; /* Adjust color as needed */
  }
  
  .sidebar__categories li:hover {
    color: #dadada;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 12px;
  }
  
  .sidebar__button {
    background-color: #43ef27;
    border: none;
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    margin-bottom: 16px;
    display: inline-block;
  }
  </style>
  