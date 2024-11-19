<template>
  <Sidebar @categorySelected="updateSelectedCategory"/>
  <div class="user">
    <div v-if="user" class="user__container">
      <div class="user__profile">
        <img :src="user.Avatar" alt="User Avatar" class="user__avatar" />
        <div class="user__info">
          <div class="user__header">
            <div class="user__name">
              <h3>{{ user.name }}</h3>
            </div>
            
            <div class="user__actions">
              <button @click="followUser" v-if="isFollowShown" class="user__follow">Follow</button>
              <button @click="unfollowUser" v-else class="user__unfollow">Unfollow</button>
              <button @click="chatUser" class="user__message">Message</button>
            </div>
            
          </div> 
          <div class="user__statistic">
            <p>{{ user.followers.length }} followers</p>
            <p>{{ user.following.length }} following</p>
          </div>
          <div class="user__bio">
            <p>Age: {{ user.age }}</p>
            <p>Address: {{ user.address }}</p>
          </div>
        </div>
      </div>

      <div class="user__posts">
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
          <span class="pagination__page"> {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            <font-awesome :icon="['fas', 'chevron-right']" />
          </button>
        </div>
      </div>
    </div>
  <p v-else>User not found.</p>
</div>

</template>

  <script setup>
  import { useRoute } from 'vue-router';
  import { useStore } from '~/stores/useStore';
  import { useUserStore } from '~/stores/userStore';

  import { computed, ref } from 'vue';
  import Post from '~/components/Post.vue';
  import Sidebar from '~/components/Sidebar.vue';


  const store = useStore();
  const userStore = useUserStore();

  const route = useRoute();
  const userId = route.params.id;

  const isFollowing = computed(() => {
    return userStore.user?.followingUsers.includes(String(userId))
  });

  const isFollowShown = computed(() => {
  return !isFollowing.value ;
});

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
    userStore.followUser(String(userId));
    store.followUser(String(userStore.user.id), String(userId)); // Assuming user.id is the user's ID
  };
 
  const unfollowUser = () => {
    userStore.unfollowUser(String(userId));
    store.unfollowUser(String(userStore.user.id), String(userId)); 
  };

  </script>
  
  <style scoped>
.user {
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 16px;
}

.user__container {
  height: fit-content;
  width: 80%;
  background-color: #ffffff;
  max-width: 1200px;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.user__profile {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user__avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.user__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user__header {
  display: flex;
  align-items: center;
}

.user__name {
  margin-right: 20px;
}

.user__name h3 {
  font-size: 1.8rem;
  margin: 0;
}

.user__actions {
  display: flex;
  gap: 12px;
}

.user__follow,
.user__unfollow,
.user__message {
  padding: 8px 16px;
  border-radius: 8px;
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

.user__message {
  background-color: #efefef;
  color: #000000;
  border: none;
}

.user__statistic {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #666;
}

.user__bio p {
  margin: 0;
}

.user__posts {
  width: 100%;
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