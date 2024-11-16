<template>
    <Sidebar />
    <div class="chat" v-if="userId">
      <h2>Chat with {{ otherUserName }}</h2>
      <div class="chat__messages">
        <div v-for="message in messages" :key="message.id">
          <SentMessage
            v-if="String(message.senderId) === String(userId)"
            :content="message.content"
            :userName="userName"
            :userAvatar="userAvatar"
          />
          <ReceivedMessage
            v-else
            :content="message.content"
            :userName="otherUserName"
            :userAvatar="otherUserAvatar"
          />
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
    <div v-else> 
        Log in to see
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  import { useChatStore } from "~/stores/chatStore";
  import { useUserStore } from "~/stores/userStore";
  import { useStore } from "~/stores/useStore";

  import SentMessage from "~/components/SentMessage.vue";
  import ReceivedMessage from "~/components/ReceivedMessage.vue";
import Sidebar from "~/components/Sidebar.vue";
  
  const route = useRoute();
  const chatId = route.params.id;
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const mainStore = useStore();

  const userId = userStore.user.id; // Replace with the logged-in user ID
  const userName = userStore.user.username; // Replace with the logged-in user's name
  const userAvatar = userStore.user.avatar; // Replace with the logged-in user's avatar
  const message = ref("");
  
  onMounted(() => {
    chatStore.loadChats(userId);
    chatStore.loadMessages(chatId);
  });
  
  const messages = computed(() => chatStore.messages);

  const otherUserId = computed(() => {
    const chat = chatStore.chats.find((chat) => String(chat.id) === String(chatId));
    return chat ? chat.participants.find((id) => String(id) !== String(userId)) : null;
  });

  const otherUser = computed(() => {
    console.log(otherUserId.value);
    console.log(mainStore.users.find((user) => String(user.id) === String(otherUserId.value)));
    return mainStore.users.find((user) => String(user.id) === String(otherUserId.value));
  })

  const otherUserName = computed(() => otherUser.value?.name || "Unknown User");
    const otherUserAvatar = computed(() => otherUser.value?.Avatar || "/assets/no_pfp.svg");
  
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
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}
  .chat__messages {
    display: flex;
    flex-direction: column;
    width: 50%;

  }
  </style>
  