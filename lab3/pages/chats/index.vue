<template>
    <div class="chats-page">
      <h1 class="page-title">Chats</h1>
      <div class="chats-list">
        <ChatCard
          v-for="chat in chatStore.chats"
          :key="chat.id"
          :chat="chat"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useChatStore } from "~/stores/chatStore";
  import { useUserStore } from "~/stores/userStore";
  import ChatCard from "~/components/ChatCard.vue";
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const loggedInUserId = userStore.user?.id; // Assumes userStore contains the logged-in user's data
  
  onMounted(() => {
    if (loggedInUserId) {
      chatStore.loadChats(loggedInUserId);
    }
  });
  </script>
  
  <style scoped>
  .chats-page {
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
  
  .chats-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50%;
    max-width: 1200px;
  }
  
  @media (max-width: 768px) {
    .chats-page {
      padding: 16px;
    }
  
    .page-title {
      color: white;
      margin-bottom: 16px;
    }
  
    .chats-list {
      width: 100%;
    }
  }
  </style>
  