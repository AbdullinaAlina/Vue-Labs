<template>
    <div class="message received">
      <img :src="userAvatar" alt="User Avatar" class="message__avatar" />
      <div class="message__content">
        <div class="message__info">
          <span class="message__sender">{{ userName }}</span>
        </div>
        <p>{{ content }}</p>
      </div>
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
    justify-content: flex-start;
    margin: 10px 0;
  }
  .message__sender {
    color: #5BB9CD;
  }
  .message__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .message__content {
    max-width: 60%;
    background-color: #f4f4f4;
    padding: 16px;
    border-radius: 12px;
    text-align: left;
  }

  .message__info {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  </style>
  