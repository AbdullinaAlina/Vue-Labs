<template>
    <div class="following-page">
      <h1 class="page-title">Followers</h1>
      <div class="following-list">
        <FollowerUser
          v-for="user in userStore.followerUserData"
          :key="user.id"
          :user="user" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~/stores/userStore';
  import FollowerUser from '~/components/FollowerUser.vue';
  import { onMounted } from 'vue';
  
  const userStore = useUserStore();
  
  onMounted(() => {
    userStore.fetchFollowerUserData();
  });

  </script>
  
  <style scoped>
  .following-page {
    padding: 32px;
    background-image: url('/assets/background.png');
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .page-title {
    font-size: 2rem;
    margin-bottom: 32px;
    color: #333;
  }
  
  .following-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50%;
    max-width: 1200px;
  }
  </style>
  