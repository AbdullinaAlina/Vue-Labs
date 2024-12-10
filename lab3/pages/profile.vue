<template>
  <div class="profile">
    <div v-if="user" class="profile__container">
      <div class="user__profile">
        <img :src="user.avatar" alt="Profile Avatar" class="profile__avatar" />
        <div class="profile__info">
          <div class="profile__header">
            <div class="profile__name">
              <template v-if="isEditing">
                <input
                  v-model="updatedUser.username"
                  type="texr"
                  class="editable-input"
                  placeholder="Enter username"
                />
              </template>
              <template v-else>
                <h3>{{ user.username }}</h3>
              </template>
            </div>
            <div class="profile__actions">
              <button @click="toggleEdit" v-if="!isEditing" class="profile__edit">Edit Profile</button>
              <button @click="handleUpdate" v-if="isEditing" class="profile__save">Save</button>
              <button @click="toggleEdit" v-if="isEditing" class="profile__cancel">Cancel</button>

              <NuxtLink to="/statistics">
               <button @click="goToStatistics" class="profile__stats">Statistics</button> 
              </NuxtLink>
              
            </div>
          </div>
          <div class="profile__statistic">
            <NuxtLink to="/followers">
              <p>{{ user.followerUsers.length }} followers</p>
            </NuxtLink>
            <NuxtLink to="/following">
              <p>{{ user.followingUsers.length }} following</p>
            </NuxtLink>
            
          </div>
          <div class="profile__bio">
            <div class="profile__age">
              <label>Age:</label>
              <template v-if="isEditing">
                <input
                  v-model="updatedUser.age"
                  type="number"
                  min="0"
                  class="editable-input"
                  placeholder="Enter age"
                />
              </template>
              <template v-else>
                <p>{{ user.age }}</p>
              </template>
            </div>
            <div class="profile__address">
              <label>Address:</label>
              <template v-if="isEditing">
                <input
                  v-model="updatedUser.address"
                  type="text"
                  class="editable-input"
                  placeholder="Enter address"
                />
              </template>
              <template v-else>
                <p>{{ user.address }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="create-post">
        <textarea v-model="newPost.Commentary" placeholder="What's on your mind?" rows="4"></textarea>
        <button @click="createPost">Post</button>
      </div>

      <div class="user__posts">
        <h2>Latest Posts</h2>
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
    <p v-else>Profile not found.</p>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/userStore';
import { useStore } from '~/stores/useStore';
import { computed, ref, watch } from 'vue';
import { db } from '~/plugins/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

import Post from '~/components/Post.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const store = useStore();

onMounted(() => {
    console.log("heey");
    userStore.fetchFollowerUserData();
    userStore.fetchFollowingUserData();
  });

const updatedUser = ref({
  username: user.value.username,
  email: user.value.email,
  age: user.value.age,
  address: user.value.address,
  rating: user.value.rating,
});

const newPost = ref({
  Commentary: '',
  userId: null, 
  PubDate: new Date().toISOString(),
  Rating: 0,
  Topic: "",
  isLiked: false,
  likeCount: 0,
  id: null
});

let originalUserData = { ...updatedUser.value };
const isEditing = ref(false);

watch(user, (newUser) => {
  updatedUser.value = {
    username: newUser.username,
    email: newUser.email,
    age: newUser.age,
    address: newUser.address,
    rating: newUser.rating,
  };
  originalUserData = { ...updatedUser.value };
}, { immediate: true });

const toggleEdit = () => {
  if (isEditing.value) {
    updatedUser.value = { ...originalUserData };
  } else {
    originalUserData = { ...updatedUser.value };
  }
  isEditing.value = !isEditing.value;
};

const handleUpdate = () => {
  userStore.updateUserDetails(updatedUser.value);
  alert('Profile updated successfully!');
  isEditing.value = false;
};

const userPosts = computed(() => {
  return store.posts
    .filter((post) => String(post.userId) === String(user.value.id))
    .sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate)); // Sort by date (descending)
});


const createPost = () => {
  newPost.value.userId = user.value.id;
  newPost.value.id = newPost.value.userId + (new Date()).toISOString();

  console.log(newPost.value.userId);
  if (newPost.value.Commentary.trim() === '') {
    alert('Post Commentary cannot be empty');
    return;
  }

  store.createPost(newPost.value).then(() => {
    newPost.value.Commentary = ''; // Clear the post Commentary
    alert('Post created successfully');
  }).catch((error) => {
    alert('Error creating post: ' + error.message);
  });
};

const deletePost = async (postId) => {
  await store.deletePost(postId);
};

const currentPage = ref(1);
const itemsPerPage = 2;  // Change to 2 posts per page
const totalPages = computed(() => Math.ceil(userPosts.value.length / itemsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return userPosts.value.slice(start, end);
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
.profile {
  align-items: center;
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
}

.user__profile {
  display: flex;
  align-items: center;
  gap: 24px;
}

.profile__actions {
  display: flex;
  gap: 12px;
}

.profile__edit,
.profile__save {
  background-color: #5bb9cd;
  color: #ffffff;
  border: none;
}

.profile__cancel {
  background-color: #ffffff;
  color: #5bb9cd;
  border: 1px solid #5bb9cd;
}

.profile__statistic {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #666;
}

.user__edit,
.user__save,
.user__stats {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
}

.profile__avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile__container {
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

.profile__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile__header {
  display: flex;
  align-items: center;
  gap: 24px;
}

.profile__name h3 {
  font-size: 1.8rem;
  margin: 0;
}

.profile__stats {
  background-color: #efefef;
  color: #000000;
  border: none;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile__age,
.profile__address {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.profile-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.profile-item {
  flex: 1 1 calc(50% - 16px);
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #666;
}

.profile-actions {
  display: flex;
  gap: 12px;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
}

.user-posts {
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

.profile-navigation {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.profile-navigation a {
  text-decoration: none;
  color: #5bb9cd;
  font-weight: bold;
}

.create-post {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-post textarea {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
}

.create-post button {
  padding: 10px 16px;
  background-color: #5bb9cd;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
/* Mobile styles */
@media (max-width: 768px) {
  .profile {
    padding-bottom: 96px;
  }

  .profile__container {
    width: 90%;
    padding: 16px;
    gap: 16px;
  }

  .user__profile {
    flex-direction: column; /* Stack avatar and info vertically */
    align-items: center;
    gap: 16px;
  }

  .profile__avatar {
    width: 100px;
    height: 100px;
  }

  .profile__info {
    align-items: center;
    gap: 12px;
  }

  .profile__header {
    flex-direction: column; /* Stack name and actions vertically */
    align-items: center;
    gap: 8px;
  }

  .profile__name h3 {
    font-size: 1.5rem;
  }

  .profile__actions {
    flex-direction: row;
    gap: 8px;
    width: 100%;
  }

  .profile__edit,
  .profile__save,
  .profile__cancel,
  .profile__stats {
    font-size: 0.8rem;
    width: 100%; /* Full width buttons for mobile */
  }

  .profile__statistic {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .profile__bio {
    gap: 8px;
    display: flex
;
    flex-direction: column;
    align-items: center;
  }

  .profile__age,
  .profile__address {
    flex-direction: row; 
    align-items: center;
    gap: 4px;
  }

  .create-post {
    width: 100%;
    gap: 8px;
  }

  .create-post textarea {
    font-size: 0.9rem;
  }

  .user-posts {
    width: 100%;
  }

  .posts-grid {
    grid-template-columns: 1fr; /* Single column grid for posts */
    gap: 12px;
  }

  .pagination {
    gap: 4px;
    margin-top: 12px;
  }

  .pagination__page {
    font-size: 0.8rem;
  }

  .pagination button {
    padding: 6px 8px;
    font-size: 0.8rem;
  }

  .profile-navigation {
    flex-direction: column; /* Stack navigation links */
    gap: 12px;
  }

  .profile-navigation a {
    font-size: 0.9rem;
    text-align: center;
  }
}

</style>
