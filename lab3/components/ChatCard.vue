<template>
    <div class="chat">
      <div class="chat__info">
        <NuxtLink :to="`/user/${chatUser.id}`">
          <img
            class="chat__avatar"
            :src="chatUser.Avatar ? chatUser.Avatar : '/assets/no_pfp.svg'"
            alt="Avatar"
          />
        </NuxtLink>
        <NuxtLink :to="`/user/${chatUser.id}`">
          <h3 class="chat__name">{{ chatUserName }}</h3>
        </NuxtLink>
      </div>
      <div class="chat__actions">
        <button class="chat__open" @click="openChat">Open Chat</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from "~/stores/userStore";
  import { useStore } from "~/stores/useStore";

  import { useRouter } from "vue-router";
  
  const props = defineProps({
    chat: {
      type: Object,
      required: true,
      default: () => ({ id: '', participants: [] }),
    },
  });
  
  const userStore = useUserStore();
  const store = useStore();
  const router = useRouter();
  
  const loggedInUserId = userStore.user?.id;
  
  // Determine the other participant in the chat
  const chatUser = computed(() => {
    const otherUserId = props.chat.participants.find((id) => id !== loggedInUserId);
    return store.getUserById(otherUserId);
  });
  
  // Display name of the other participant
  const chatUserName = computed(() => userStore.getDisplayName(chatUser.value?.id));
  
  // Navigate to the chat page
  const openChat = () => {
    router.push(`/chats/${props.chat.id}`);
  };
  </script>
  
  <style scoped>
  .chat {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .chat__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  
  .chat__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .chat__name {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }
  
  .chat__actions {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
  }
  
  .chat__open {
    background-color: #62C370;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .chat {
      flex-direction: row;
      align-items: center;
      text-align: center;
      padding: 12px;
      gap: 16px;
    }
  
    .chat__info {
      flex-direction: row;
      gap: 8px;
      text-align: left;
    }
  
    .chat__avatar {
      width: 72px;
      height: 72px;
    }
  
    .chat__name {
      font-size: 1rem;
    }
  
    .chat__actions {
      flex-direction: row;
      gap: 8px;
    }
  
    .chat__open {
      font-size: 0.9rem;
      padding: 6px 10px;
    }
  }
  </style>
  