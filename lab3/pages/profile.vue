<template>
  <Uploaddata />
  <div class="profile-page">
    <div class="header">
      <h2>User Profile</h2>
      <p v-if="user.isAuth">Welcome, {{ user.username }}!</p>
    </div>
    <div class="profile-content" v-if="user.isAuth">
      <div class="profile-details">
        <img :src="profilePicture" alt="Profile Picture" v-if="profilePicture" class="profile-pic" />
        <div class="details">
          <p><strong>Username:</strong>
            <input v-model="updatedUser.username" :disabled="!isEditing" />
          </p>
          <p><strong>Email:</strong>
            <input v-model="updatedUser.email" type="email" :disabled="!isEditing" />
          </p>
          <p><strong>Age:</strong>
            <input v-model="updatedUser.age" type="number" :disabled="!isEditing" />
          </p>
          <p><strong>Address:</strong>
            <input v-model="updatedUser.address" :disabled="!isEditing" />
          </p>
          <p><strong>Rating:</strong>
            <input v-model="updatedUser.rating" type="number" :disabled="!isEditing" />
          </p>
        </div>
      </div>

      <div class="profile-edit">
        <h3>Edit Profile</h3>
        <form @submit.prevent="handleUpdate">
          <input type="file" @change="handleFileUpload" accept="image/*" />
          <button type="submit" :disabled="!isEditing">Update Profile</button>
          <button type="button" @click="toggleEdit">{{ isEditing ? 'Cancel' : 'Edit' }}</button>
        </form>
      </div>

      <div class="user-posts">
        <h3>My Posts</h3>
        <div class="posts-grid">
          <Post 
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post" 
            :user="getUserById(post.userId)"
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

      <div class="followed-users">
        <h3>Followed Users</h3>
        <ul>
          <li v-for="(followedUserId, index) in user.followedUsers" :key="index">
            {{ getUserById(followedUserId)?.name || 'Unknown User' }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>Please log in to see your profile information.</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/userStore';
import { useStore } from '~/stores/useStore';
import { computed, ref, watch } from 'vue';
import Post from '~/components/Post.vue';
import Uploaddata from '~/components/Uploaddata.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const store = useStore();

const userPosts = store.posts.filter((post) => post.userId === user.value.id);

const getUserById = (id) => {
  return store.users.find(user => user.id === id) || null;
};

const updatedUser = ref({
  username: user.value.username,
  email: user.value.email,
  age: user.value.age,
  address: user.value.address,
  rating: user.value.rating,
});

let originalUserData = { ...updatedUser.value };
const profilePicture = ref(null);
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

// Pagination Setup
const currentPage = ref(1);
const itemsPerPage = 2;  // Change to 2 posts per page
const totalPages = computed(() => Math.ceil(userPosts.length / itemsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return userPosts.slice(start, end);
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

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target.result;
      profilePicture.value = imageData;
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdate = () => {
  userStore.updateUserDetails(updatedUser.value);
  alert('Profile updated successfully!');
  isEditing.value = false;
};

const toggleEdit = () => {
  if (isEditing.value) {
    updatedUser.value = { ...originalUserData };
  } else {
    originalUserData = { ...updatedUser.value };
  }
  isEditing.value = !isEditing.value;
};

</script>

<style scoped>
.profile-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/assets/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  color: #fff;
}

.profile-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.profile-details {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin-bottom: 20px;
}

.details {
  text-align: left;
  flex: 1;
}

.profile-edit {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin-bottom: 20px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

input {
  margin-left: 10px;
}

button {
  margin-top: 10px;
}

.posts-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.followed-users {
  margin-top: 20px;
}

.followed-users ul {
  list-style: none;
  padding: 0;
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
