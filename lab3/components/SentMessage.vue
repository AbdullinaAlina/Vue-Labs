<template>
    <div class="message sent">
      <div class="message__content">
        <div class="message__info">
          <span class="message__sender">{{ userName }}</span>
        </div>
        <p>{{ content }}</p>
      </div>
      <img :src="userAvatar" alt="User Avatar" class="message__avatar" />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    content: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .message {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
  .message__sender {
    color: #5BB9CD;
  }
  .message__content {
    max-width: 60%;
    background-color: #f4f4f4;
    padding: 16px;
    border-radius: 12px;
    text-align: right;
  }
  .message__info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 4px;
  }
  .message__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 8px;
  }
  </style>
  