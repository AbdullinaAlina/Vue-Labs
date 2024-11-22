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
                <h3 class="user__name">{{ user.name }}</h3>
            </NuxtLink>   
        </div>
      
      <div class="user__actions" v-if="!isFollowerMe">
        <button @click="followUser" v-if="isFollowShown" class="user__follow">Follow</button>
        <button @click="unfollowUser" v-else class="user__unfollow">Unfollow</button>
        <button class="user__message" @click="handleChat">Chat</button>
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

  const isFollowing = computed(() => {
    const userId = props.user.id;
    return (userStore.user?.followingUsers.includes(String(userId)));
  });

  const isFollowerMe = computed(() => {
    const userId = props.user.id;
    return (String(userId) === String(userStore.user?.id));
  })

  const isFollowShown = computed(() => {
  return !isFollowing.value ;
});

    const followUser = () => {
        userStore.followUser(String(props.user.id));
  };

  const unfollowUser = () => {
    userStore.unfollowUser(String(props.user.id));
  };

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
  .user__follow,
.user__unfollow,
.user__message {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
}
  .user__follow {
  background-color: #5bb9cd;
  color: #ffffff;
  border: none;
}

.user__unfollow {
  background-color: #ffffff;
  color: #5bb9cd;
  border: 1px solid #5bb9cd;
}


  </style>
  