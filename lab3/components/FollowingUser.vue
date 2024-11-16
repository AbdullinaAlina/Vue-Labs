<template>
    <div class="user">
        <NuxtLink :to="`/user/${user.id}`">
          <img
            class="user__avatar"
            :src="user.Avatar ? user.Avatar : '/assets/no_pfp.svg'"
            alt="Avatar"
          />
        </NuxtLink>
        <NuxtLink :to="`/user/${user.id}`">
            <h1>{{ user.name }}</h1>
        </NuxtLink>
        <div>
            <button class="user__unfollow">Unfollow</button>
            <button class="user__chat" @click="handlechat">Chat</button>


        </div>

    </div>
</template>

<script setup>

import { useChatStore } from '~/stores/chatStore';
import { useUserStore } from '~/stores/userStore';
import { useRouter } from 'vue-router';

const chatStore = useChatStore();
const userStore = useUserStore();
const router = useRouter();

    const props = defineProps({
        user: {
            type: Object,
            required: true,
        }
    })

    const handlechat = async () => {
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

<style>
 .user {
    display: flex;
    flex-direction: row;
 }

 .user__avatar {
    width: 96px;
 }

 .user__unfollow {
    text-transform: uppercase;
    background-color: #EC1C1C;
    border-radius: 8px;
    color: #ffffff;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
 }

 .user__chat {
    text-transform: uppercase;
    background-color: #62C370;
    border-radius: 8px;
    color: #ffffff;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
 }
</style>