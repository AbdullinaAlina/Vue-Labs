<template>
    <div class="user">
        <NuxtLink :to="`/user/${user.id}`">
            <div class="card__user">
          <img
            class="card__avatar"
            :src="user.Avatar ? user.Avatar : '/assets/no_pfp.svg'"
            alt="Avatar"
          />
        </div>
        </NuxtLink>
        <NuxtLink :to="`/user/${user.id}`">
            <h1>{{ user.name }}</h1>
        </NuxtLink>

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