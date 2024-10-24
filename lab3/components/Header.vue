<template>
    <div class="header">
      <div class="sidebar__icon" @click="toggleSideBar">
        <font-awesome :icon="['fas', 'bars']" />
      </div>
  
      <div class="sidebar__menu" v-show="isSideBarOpen">
        <button class="sidebar__button" @click="toggleSideBar">Menu</button>
        <ul class="sidebar__categories">
          <li v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
            {{ category }}
          </li>
        </ul>
      </div>
  
      <div class="profile-icon" @click="openProfile">
        <font-awesome :icon="['fas', 'user']" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSideBarOpen: false,
        categories: ['Show All', 'Design', 'Technology', 'Science', 'Business', 'Health'],
      };
    },
    methods: {
      toggleSideBar() {
        this.isSideBarOpen = !this.isSideBarOpen;
      },
      selectCategory(category) {
        this.$emit('categorySelected', category === 'Show All' ? null : category);
        this.toggleSideBar();
      },
      openProfile() {
        // Implement profile functionality here
        console.log('Profile icon clicked!');
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between; /* Adjust to position the burger menu and profile icon */
    align-items: center;
    padding: 16px;
  }
  
  .profile-icon {
    cursor: pointer;
    margin-left: auto; /* Pushes the profile icon to the right */
    font-size: 28px; /* Adjust size as needed */
  }
  
  /* Include your existing sidebar styles here */
  </style>
  