<template>
    <div class="profile-page">
      <h2>User Profile</h2>
      <div class="profile-content" v-if="user.isAuth">
        <div class="profile-details">
          <img :src="profilePicture" alt="Profile Picture" v-if="profilePicture" class="profile-pic" />
          <p><strong>Username:</strong> </p>
          <p><strong>Email:</strong> </p>
          <p><strong>Age:</strong> </p>
          <p><strong>Location:</strong> </p>
          <p><strong>Rating:</strong></p>
        </div>
        <div class="profile-edit">
          <h3>Edit Profile</h3>
          <form @submit.prevent="handleUpdate">
            <input v-model="updatedUser.username" placeholder="Username" />
            <input v-model="updatedUser.email" type="email" placeholder="Email" />
            <input v-model="updatedUser.age" type="number" placeholder="Age" />
            <input v-model="updatedUser.location" placeholder="Location" />
            <input v-model="updatedUser.rating" type="number" placeholder="Rating" />
  
            <input type="file" @change="handleFileUpload" accept="image/*" />
            <button type="submit">Update Profile</button>
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
  
  // Reactive reference for the profile picture
  const profilePicture = ref(null);
  
  // Watch for changes in user and update the form values accordingly
  watch(user, (newUser) => {
    updatedUser.value = {
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      location: newUser.location,
      rating: newUser.rating,
    };
  }, { immediate: true });
  
  // Function to handle profile picture upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result; // Base64 image data
        // Here, you can implement your own logic to handle the image data as needed
        profilePicture.value = imageData; // Preview the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to handle profile update
  const handleUpdate = () => {
    userStore.updateUserDetails(updatedUser.value); // Update the store with new data
    alert('Profile updated successfully!');
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
    margin-bottom: 10px;
    display: block; /* Ensure inputs are block elements for layout */
  }
  </style>
  