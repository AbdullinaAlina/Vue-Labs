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
                <button class="user__chat">Chat</button>
                <NuxtLink to="/chats/1">
                    Chat with user 2
                </NuxtLink>
            

        </div>

    </div>
</template>

<script setup>

    const props = defineProps({
        user: {
            type: Object,
            required: true,
        }
    })
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