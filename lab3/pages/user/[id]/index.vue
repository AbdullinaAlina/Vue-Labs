<template>
  <div class="user">
    <div v-if="user" class="user__container">
      <div class="user__profile">
        <img :src="user.Avatar" alt="User Avatar" class="user__avatar" />
        <div class="user__info">
          <div class="user__header">
            <div class="user__name">
              <h3 v-if="!isNicknameEditing">{{ userStore.getDisplayName(user.id) }}</h3>
              <input v-else v-model="nicknameInput" placeholder="Enter nickname" />
            </div>
            
            <div class="user__actions" v-if="userStore.user.isAuth">
              <button v-if="isNicknameEditing" @click="saveNickname" class="user__nickname-btn">
                Save
              </button>
              <button v-if="isNicknameEditing" @click="cancelNicknameEdit" class="user__unfollow">
                Cancel
              </button>
              <button v-else @click="toggleNicknameEdit" class="user__nickname-btn">
                <font-awesome :icon="['fas', 'pen']" />
              </button>
              <button @click="followUser" v-if="isFollowShown" class="user__follow">Follow</button>
              <button @click="unfollowUser" v-else class="user__unfollow">Unfollow</button>
              <button @click="chatUser" class="user__message">Message</button>
            </div>
            
          </div> 
          <div class="user__statistic">
            <NuxtLink :to="`/user/${user.id}/followers`">
              <p>{{ user.followers.length }} followers</p>
            </NuxtLink>
            <NuxtLink :to="`/user/${user.id}/followings`">
              <p>{{ user.following.length }} following</p>
            </NuxtLink>
            
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
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from '~/stores/useStore';
  import { useUserStore } from '~/stores/userStore';
  import { useChatStore } from '~/stores/chatStore';


  import { computed, ref } from 'vue';
  import Post from '~/components/Post.vue';
  import Sidebar from '~/components/Sidebar.vue';

  const store = useStore();
  const userStore = useUserStore();
  const chatStore = useChatStore();

  const route = useRoute();
  const router = useRouter();
  const userId = route.params.id;

  const isNicknameEditing = ref(false); // Tracks whether the nickname is being edited
const nicknameInput = ref(''); // Holds the value of the nickname input


  onMounted(() => {
    console.log("heey");
    userStore.fetchFollowerUserData();
    userStore.fetchFollowingUserData();
  });

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
  };
 
  const unfollowUser = () => {
    userStore.unfollowUser(String(userId));
  };

  const chatUser = async() => {
    const loggedInUserId = userStore.user.id;
    const targetUserId = userId;
    try {
      const chatId = await chatStore.createChat([loggedInUserId, targetUserId]);
      await chatStore.loadMessages(chatId);
      router.push(`/chats/${chatId}`);
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

//   const toggleNicknameEdit = async () => {
//   const currentNickname = userStore.user.nicknames?.[userId] || ''; // Safe access
//   if (isNicknameEditing.value) {
//     if (nicknameInput.value.trim() === '') {
//       await userStore.removeNickname(userId); // Remove nickname for the target user
//     } else {
//       await userStore.setNickname(userId, nicknameInput.value); // Set the nickname for the target user
//     }
//   } else {
//     nicknameInput.value = currentNickname; // Pre-fill with existing nickname
//   }
//   isNicknameEditing.value = !isNicknameEditing.value;
// };

const toggleNicknameEdit = async () => {
  // Get the current nickname from the logged-in user's nicknames map for the target user
  const currentNickname = userStore.user.nicknames?.[userId] || ''; // Safe access
  
  // Pre-fill the input with the existing nickname (if available) or empty string
  nicknameInput.value = currentNickname;

  // Toggle edit mode
  isNicknameEditing.value = !isNicknameEditing.value;
};

// Function to save the new nickname
const saveNickname = async () => {
  if (nicknameInput.value.trim() === '') {
    // If the input is empty, remove the nickname
    await userStore.removeNickname(userId);
  } else {
    // Otherwise, save the new nickname
    await userStore.setNickname(userId, nicknameInput.value);
  }
  // Exit edit mode after saving
  isNicknameEditing.value = false;
};

// Function to cancel nickname editing and revert to the previous value
const cancelNicknameEdit = () => {
  // Exit edit mode
  isNicknameEditing.value = false;

  // Revert the input to the original nickname (before editing)
  nicknameInput.value = userStore.user.nicknames?.[userId] || ''; // Use original nickname
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

/* .user__name {
  margin-right: 20px;
} */

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

.user__nickname-btn {
  font-size: 1rem;
  padding: 6px 12px;
  background-color: #5bb9cd;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

.user__nickname-btn i {
  font-size: 1.2rem; /* Adjust size of the pen icon */
}

.user__statistic {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #666;
}

.user__bio {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user__bio p {
  margin: 0;
}

.user__posts {
  width: 100%;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

/* Mobile styles */
@media (max-width: 768px) {
  .user {
    padding: 8px;
    padding-bottom: 96px;
  }

  .user__container {
    width: 100%;
    padding: 16px;
    gap: 16px;
  }

  .user__profile {
    flex-direction: column; /* Stack profile info vertically */
    align-items: center;
    gap: 16px;
  }

  .user__avatar {
    width: 100px;
    height: 100px;
  }

  .user__info {
    align-items: center;
    gap: 12px;
  }

  .user__header {
    flex-direction: column; /* Stack header content vertically */
    align-items: center;
    gap: 8px;
  }

  .user__name h3 {
    font-size: 1.5rem;
  }

  .user__actions {
    flex-direction: row; /* Stack buttons vertically */
    gap: 8px;
  }

  .user__follow,
  .user__unfollow,
  .user__message {
    width: 100%;
    font-size: 0.8rem;
  }

  .user__statistic {
    flex-direction: row; /* Stack stats vertically */
    align-items: center;
    gap: 12px;
  }

  .user__bio {
    text-align: center; /* Center-align bio text */
  }

  .user__posts {
    text-align: center;
    width: 100%;
  }

  .posts-grid {
    grid-template-columns: 1fr; /* Single column grid for posts */
    gap: 12px; /* Reduce gap between posts */
  }

  .pagination {
    gap: 4px;
    margin-top: 12px;
  }

  .pagination button {
    padding: 6px 8px;
    font-size: 0.8rem;
  }

  .pagination__page {
    font-size: 0.9rem;
  }
}

</style>