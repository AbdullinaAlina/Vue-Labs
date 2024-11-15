<template>
    <div class="profile">
      <h1>User Profile</h1>
      <div v-if="user">
        <img :src="user.Avatar" alt="User Avatar" />
        <p>Name: {{ user.name }}</p>
        <p>Age: {{ user.age }}</p>
        <p>Address: {{ user.address }}</p>
        <button @click="followUser" v-if="isFollowShown">Follow</button>
        <button @click="unfollowUser" v-else="isFollowShown">Unfollow</button>

        <h2>Latest Posts</h2>
        <div class="posts-grid">
          <Post 
            v-for="post in paginatedPosts"
            :key="post.userId"
            :post="post" 
            :user="user"
          />
        </div>
  
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            <font-awesome :icon="['fas', 'chevron-left']" />
          </button>
          <span> {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            <font-awesome :icon="['fas', 'chevron-right']" />
          </button>
        </div>
  
      </div>
      <p v-else>User not found.</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { useStore } from '~/stores/useStore';
  import { computed, ref } from 'vue';
  import Post from '~/components/Post.vue';
  
  const store = useStore();
  const userStore = useUserStore();

  const route = useRoute();
  const userId = route.params.id;

  const isFollowing = userStore.user.followingUsers.includes(String(userId));

  const isFollowShown = (!isFollowing) && (userId != userStore.user.id);
  
  const user = computed(() => {
    return store.users.find(user => String(user.id) === String(userId)) || null;
  });  
  
  const userPosts = computed(() => {
    return store.posts.filter(post => String(post.userId) === String(userId));
  });
  
  const currentPage = ref(1);
  const itemsPerPage = 4;
  
  const totalPages = computed(() => {
    return Math.ceil(userPosts.value.length / itemsPerPage);
  });
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return userPosts.value.slice(start, start + itemsPerPage);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const followUser = () => {
    console.log(userStore.user.id, String(userId));
    store.followUser(String(userStore.user.id), String(userId)); // Assuming user.id is the user's ID
  };
 
  </script>
  
  <style scoped>
  .profile {
    background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
    height: 100vh;

  }
  /* Add styles for the posts grid and pagination */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px; /* Adjust the gap between cards as needed */
    margin-bottom: 24px;
    justify-content: center;
  }
  
  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  
  .pagination button {
    padding: 8px;
  }
  </style>
  