<template>
    <header class="header">
      <Sidebar @categorySelected="handleCategorySelected" />
      <div class="profile">
        <i class="fa-solid fa-user"></i>
      </div>
    </header>
  </template>
  
  <script>
  import Sidebar from './Sidebar.vue';
  
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between; /* Adjust spacing between sidebar and profile icon */
    align-items: center; /* Center items vertically */
    padding: 1em; /* Add padding for aesthetic spacing */
    background-color: #333; /* Header background color */
  }
  
  .profile {
    cursor: pointer; /* Indicate that the profile icon is clickable */
  }
  
  .profile-icon {
    height: 40px; /* Adjust height of the profile icon */
    width: 40px; /* Adjust width of the profile icon */
    border-radius: 50%; /* Make the icon circular */
    transition: transform 0.3s; /* Transition effect on hover */
  }
  
  .profile-icon:hover {
    transform: scale(1.1); /* Scale effect on hover */
  }
  </style>
  