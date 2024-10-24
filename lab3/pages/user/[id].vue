<template>
    <div>
      <h1>User Profile</h1>
      <p>Viewing profile for user ID: {{ userId }}</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const userId = route.params.id;
  console.log("Navigated to user ID:", userId); // Check if this logs the expected ID

  </script>
  