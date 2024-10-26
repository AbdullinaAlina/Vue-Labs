<!-- pages/index.vue -->

<template>
    <Sidebar @categorySelected="updateSelectedCategory"/>
    <Feed :selectedCategory="selectedCategory"/>
</template>

<script setup>
    import Feed from '~/components/Feed.vue';
import Header from '~/components/Header.vue';
    import Sidebar from '~/components/Sidebar.vue';

    const selectedCategory = ref(null);

    const updateSelectedCategory = (category) => {
        selectedCategory.value = category;
    }
</script>