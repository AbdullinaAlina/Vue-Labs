<template>
    <h1>Following</h1>
    <FollowingUser
        v-for="user in store.followingUserData"
        :user="user" 
    />
</template>

<script setup>
import FollowingUser from '~/components/FollowingUser.vue';
import { useUserStore } from '~/stores/userStore';

const store = useUserStore();
 
onMounted(() => {
    store.fetchFollowingUserData();
});

console.log(store.followingUserData);
</script>