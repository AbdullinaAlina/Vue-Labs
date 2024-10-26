<template>
    <div class="profile-page">
      <h2>User Profile</h2>
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
            <p><strong>Location:</strong>
              <input v-model="updatedUser.location" :disabled="!isEditing" />
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
      </div>
      <div v-else>
        <p>Please log in to see your profile information.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~/stores/userStore';
  import { computed, ref, watch } from 'vue';
  
  // Access the user store
  const userStore = useUserStore();
  const user = computed(() => userStore.user);
  
  // Local state for updated user data
  const updatedUser = ref({
    username: user.value.username,
    email: user.value.email,
    age: user.value.age,
    location: user.value.location,
    rating: user.value.rating,
  });
  
  // Store original user data for cancel functionality
  let originalUserData = { ...updatedUser.value };
  
  // Reactive reference for the profile picture
  const profilePicture = ref(null);
  const isEditing = ref(false); // State to track if editing is enabled
  
  // Watch for changes in user and update the form values accordingly
  watch(user, (newUser) => {
    updatedUser.value = {
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      location: newUser.location,
      rating: newUser.rating,
    };
    // Update original user data whenever user data changes
    originalUserData = { ...updatedUser.value };
  }, { immediate: true });
  
  // Function to handle profile picture upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result; // Base64 image data
        profilePicture.value = imageData; // Preview the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to handle profile update
  const handleUpdate = () => {
    userStore.updateUserDetails(updatedUser.value); // Update the store with new data
    alert('Profile updated successfully!');
    isEditing.value = false; // Disable editing after update
  };
  
  // Function to toggle editing state
  const toggleEdit = () => {
    if (isEditing.value) {
      // If editing is currently enabled, revert to original data
      updatedUser.value = { ...originalUserData };
    } else {
      // If not editing, enable editing mode
      originalUserData = { ...updatedUser.value }; // Save the current state as original
    }
    isEditing.value = !isEditing.value;
  };
  </script>
  
  <style scoped>
  .profile-page {
    padding: 20px;
    display: flex; /* Use flexbox to layout the profile page */
    flex-direction: column;
    align-items: center;
  }
  
  .profile-content {
    display: flex; /* Flexbox for side-by-side layout */
    justify-content: space-between;
    width: 100%;
  }
  
  .profile-details {
    flex: 1; /* Allow this section to grow */
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .details {
    text-align: left; /* Align text to the left for better readability */
  }
  
  .profile-edit {
    flex: 1; /* Allow this section to grow */
    padding: 20px;
    border-left: 1px solid #ccc; /* Optional: add a separator */
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
  }
  
  input {
    margin-left: 10px; /* Add space between label and input */
  }
  
  button {
    margin-top: 10px; /* Add some space between buttons */
  }
  </style>
  