<template>
    <div class="user">
        <div class="user__info">
            <NuxtLink :to="`/user/${user.id}`">
                <img
                class="user__avatar"
                :src="user.Avatar ? user.Avatar : '/assets/no_pfp.svg'"
                alt="Avatar"
                />
            </NuxtLink>
            <NuxtLink :to="`/user/${user.id}`">
              <h3 class="user__name">{{ userStore.getDisplayName(user.id) }}</h3>
            </NuxtLink>   
        </div>
      
      <div class="user__actions">
        <button class="user__unfollow" @click="unfollowUser">Unfollow</button>
        <button class="user__chat" @click="handleChat">Chat</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useChatStore } from '~/stores/chatStore';
  import { useUserStore } from '~/stores/userStore';
  import { useStore } from '~/stores/useStore';
  import { useRouter } from 'vue-router';
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const store = useStore();

  const router = useRouter();
  
  const props = defineProps({
    user: {
      type: Object,
      required: true,
      default: () => ({ id: '', name: '', Avatar: '', followers: [] }),
    }
  });
  
  const unfollowUser = () => {
    console.log(props.user); 
    const userId = props.user.id;
    
    if (!userId) {
    console.error('User ID is not defined');
  }
    console.log(userId);
    userStore.unfollowUser(String(userId));
    store.unfollowUser(String(userStore.user.id), String(userId)); 
  }
  
;
  const handleChat = async () => {
    const loggedInUserId = userStore.user.id;
    const targetUserId = props.user.id;
    try {
      const chatId = await chatStore.createChat([loggedInUserId, targetUserId]);
      await chatStore.loadMessages(chatId);
      router.push(`/chats/${chatId}`);
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  }
  
  </script>
  
  <style scoped>
  .user {
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
  
  .user__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .user__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user__name {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }
  
  .user__actions {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
  }
  
  .user__unfollow {
    background-color: #EC1C1C;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .user__chat {
    background-color: #62C370;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
  }
  </style>
  