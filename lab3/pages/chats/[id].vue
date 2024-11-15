<template>
    <div class="chat">
      <h2>Chat with {{ otherUserName }}</h2>
      <div class="chat__messages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.senderId === userId ? 'sent' : 'received']"
        >
          {{ message.content }}
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input
          v-model="message"
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  import { useChatStore } from "~/stores/chatStore";
  
  const route = useRoute();
  const chatId = route.params.id;
  
  const chatStore = useChatStore();
  const userId = "user1"; // Replace with the logged-in user ID
  const message = ref("");
  
  onMounted(() => {
    chatStore.loadMessages(chatId);
  });
  
  const messages = computed(() => chatStore.messages);
  const otherUserName = computed(() =>
    chatStore.chats.find((chat) => chat.id === chatId)?.participants.find(
      (id) => id !== userId
    )
  );
  
  const sendMessage = async () => {
    if (message.value.trim()) {
      await chatStore.sendMessage(chatId, message.value, userId);
      message.value = "";
  
      // Simulate an auto-reply
      setTimeout(() => {
        chatStore.sendMessage(chatId, "Automated reply", "bot");
      }, 1000);
    }
  };
  </script>
  
  <style scoped>
  .chat {
    /* Add your chat styling here */
  }
  .message.sent {
    /* Styling for messages sent by the user */
  }
  .message.received {
    /* Styling for messages received */
  }
  </style>
  