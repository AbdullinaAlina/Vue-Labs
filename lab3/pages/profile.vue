<template>
  <Sidebar @categorySelected="updateSelectedCategory" />
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <img :src="user.avatar" alt="Profile Picture" class="profile-avatar" />
        <div class="profile-info">
          <h2>{{ user.username }}</h2>
          <div class="profile-details">
            <div class="profile-item">
              <label v-if="isEditing">Username:</label>
              <div v-else>Username: {{ user.username }}</div>
              <input v-if="isEditing" v-model="updatedUser.username" />
            </div>
            <div class="profile-item">
              <label v-if="isEditing">Email:</label>
              <div v-else>Email: {{ user.email }}</div>
              <input v-if="isEditing" v-model="updatedUser.email" type="email" />
            </div>
            <div class="profile-item">
              <label v-if="isEditing">Age:</label>
              <div v-else>Age: {{ user.age }}</div>
              <input v-if="isEditing" v-model="updatedUser.age" type="number" />
            </div>
            <div class="profile-item">
              <label v-if="isEditing">Address:</label>
              <div v-else>Address: {{ user.address }}</div>
              <input v-if="isEditing" v-model="updatedUser.address" />
            </div>
            <div class="profile-item">
              <label v-if="isEditing">Rating:</label>
              <div v-else>Rating: {{ user.rating }}</div>
              <input v-if="isEditing" v-model="updatedUser.rating" type="number" />
            </div>
          </div>
          <div class="profile-actions">
            <button @click="toggleEdit">{{ isEditing ? "Cancel" : "Edit Profile" }}</button>
            <button v-if="isEditing" @click="handleUpdate">Save</button>
          </div>
        </div>
      </div>
      <div class="user-posts">
        <h3>My Posts</h3>
        <div class="posts-grid">
          <Post 
            v-for="post in paginatedPosts" 
            :key="post.id" 
            :post="post" 
            @delete-post="deletePost" 
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
      <div class="profile-navigation">
        <router-link to="/following">Following</router-link>
        <router-link to="/statistics">Statistics</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/userStore';
import { useStore } from '~/stores/useStore';
import { computed, ref, watch } from 'vue';
import { db } from '~/plugins/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

import Post from '~/components/Post.vue';
import Sidebar from '~/components/Sidebar.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const store = useStore();

const updatedUser = ref({
  username: user.value.username,
  email: user.value.email,
  age: user.value.age,
  address: user.value.address,
  rating: user.value.rating,
});

let originalUserData = { ...updatedUser.value };
const isEditing = ref(false);

// Watch for changes in the user data
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
  return store.posts.filter((post) => String(post.userId) === String(user.value.id));
});

const deletePost = async (postId) => {
  try {
    // Delete post from Firestore
    await deleteDoc(doc(db, 'posts', postId));
    alert('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete post.');
  }
};

// Pagination Setup
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
.profile-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.profile-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.profile-header {
  display: flex;
  gap: 20px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-item {
  display: flex;
  flex-direction: column;
}

.profile-item label {
  font-weight: bold;
  margin-bottom: 5px;
}

.profile-item div {
  margin-bottom: 10px;
}

.profile-item input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.profile-actions {
  margin-top: 10px;
}

.user-posts {
  margin-top: 30px;
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
