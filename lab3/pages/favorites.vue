<template>
    <div class="following-page">
      <!-- <h1 class="page-title">Liked posts</h1> -->
      <!-- <div class="following-list">
        <Post
          v-for="post in userStore.likedPostsData"
          :post="post" 
          :key="post.id"
        />
      </div> -->
      <div class="user__posts">
        <h1>Liked posts</h1>
        <div class="posts-grid">
          <Post
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post"
          />
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            <font-awesome :icon="['fas', 'chevron-left']" />
          </button>
          <span class="pagination__page"> {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            <font-awesome :icon="['fas', 'chevron-right']" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~/stores/userStore';
  import { onMounted } from 'vue';
import Post from '~/components/Post.vue';
  
  const userStore = useUserStore();
  
  onMounted(() => {
    userStore.fetchLikedPostsData();
  });

  const currentPage = ref(1);
const itemsPerPage = 2;  // Change to 2 posts per page
const totalPages = computed(() => Math.ceil(userStore.likedPostsData.length / itemsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return userStore.likedPostsData.slice(start, end);
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

  </script>
  
  <style scoped>
  .following-page {
    padding: 32px;
    background-image: url('/assets/background.png');
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .page-title {
    font-size: 2rem;
    margin-bottom: 32px;
    color: #333;
  }
  
  .following-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50%;
    max-width: 1200px;
  }

  .user__posts {
    height: fit-content;
  width: 80%;
  background-color: #ffffff;
  max-width: 1200px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.pagination__page {
  display: flex;
  align-items: center;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #efefef;
  color: #000000;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
  </style>
  