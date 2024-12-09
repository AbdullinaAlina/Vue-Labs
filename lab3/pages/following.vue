<template>
    <div class="following-page">
      <h1 class="page-title">Following</h1>
      <div class="following-list">
        <FollowingUser
          v-for="user in store.followingUserData"
          :key="user.id"
          :user="user" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~/stores/userStore';
  import FollowingUser from '~/components/FollowingUser.vue';
  import { onMounted } from 'vue';
  
  const store = useUserStore();
  
  onMounted(() => {
    store.fetchFollowingUserData();
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
  
  @media (max-width: 768px) {
    .following-page {
      padding: 16px;
    }
  
    .page-title {
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
  
    .following-list {
      width: 100%;
    }
  }
  </style>
  