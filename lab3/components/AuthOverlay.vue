<template>
    <div class="auth-overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h2 class="overlay__title">Get started</h2>
        <div class="overlay__buttons" v-if="!user.isAuth">
          <button class="auth-button login" @click="showLoginOverlay">Login</button>
          <button class="auth-button sign-up" @click="redirectToRegister">Sign up</button>
        </div>
        <div v-else>
          <h3 class="welcome-message">Welcome, {{ user.username }}!</h3>
          <router-link class="profile-link" to="/profile">My Profile</router-link>
          <button class="auth-button" @click="handleLogout">Log Out</button>
        </div>
  
        <div v-if="showRegisterForm" class="register-form">
          <h3 class="form-title">Register</h3>
          <form @submit.prevent="handleRegister">
            <input class="form-input" type="text" placeholder="Name" v-model="name" />
            <input class="form-input" type="email" placeholder="Email" v-model="email" />
            <input class="form-input" type="password" placeholder="Password" v-model="password" />
            <button class="form-button" type="submit">Register</button>
          </form>
        </div>
  
        <LoginOverlay :isOpen="isLoginOverlayOpen" @close="closeLoginOverlay" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '~/stores/userStore';
  import LoginOverlay from './LoginOverlay.vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  });
  
  const router = useRouter();
  const userStore = useUserStore();
  const email = ref('');
  const password = ref('');
  const name = ref('');
  const showRegisterForm = ref(false);
  const isLoginOverlayOpen = ref(false);
  
  const closeOverlay = () => {
    showRegisterForm.value = false;
    email.value = '';
    password.value = '';
    name.value = '';
    isLoginOverlayOpen.value = false;
    props.onClose();
  };
  
  const redirectToRegister = () => {
    props.onClose();
    router.push('/register');
  };
  
  const showLoginOverlay = () => {
    isLoginOverlayOpen.value = true;
  };
  
  const closeLoginOverlay = () => {
    isLoginOverlayOpen.value = false;
  };
  
  const handleRegister = () => {
    userStore.register(email.value, password.value, name.value);
    closeOverlay();
  };
  
  const handleLogout = () => {
    userStore.logout();
    closeOverlay();
  };
  
  const user = computed(() => userStore.user);
  </script>
  
  <style scoped>
  .auth-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .overlay__content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  .overlay__title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #28536B;
  }
  
  .overlay__buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .auth-button {
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .login {
    background-color: #5bb9cd;
    border: none;
    color: white;
  }
  
  .login:hover {
    background-color: #28536B;
  }

  .sign-up {
    background-color: #ffffff;
    border: 1px solid #5bb9cd;
    color: #5bb9cd;
  }

  .welcome-message {
    font-size: 18px;
    margin: 10px 0;
    color: #555;
  }
  
  .profile-link {
    display: inline-block;
    margin: 10px 0;
    color: #5bb9cd;
    text-decoration: underline;
  }
  
  .register-form {
    margin-top: 20px;
  }
  
  .form-title {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .form-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
  }
  
  .form-button:hover {
    background-color: #218838;
  }
  </style>
  