<template>
  <div class="user">
    <div v-if="user">
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
            
          </div> <!-- Properly close the header div -->
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
          <span> {{ currentPage }} / {{ totalPages }}</span>
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
    background-color: #ffffff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user__profile {
    display: flex;
  flex-direction: row;}

  .user__header {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  .user__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .user__name{
    display: flex;
    align-items: center;
  }

  .user__actions {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .user__statistic {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  
  .user__follow {
    background-color: #5bb9cd;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    padding: 8px 16px;
  }

  .user__unfollow {
    background-color: #ffffff;
    border: 1px solid #5bb9cd;
    border-radius: 8px;
    color: #5bb9cd;
    padding: 8px 16px;
  }

  .user__message {
    background-color: #efefef;
    border: none;
    border-radius: 8px;
    color: #000000;
    padding: 8px 16px;
  }

  .user__avatar {
    width: 150px;
  }
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
  