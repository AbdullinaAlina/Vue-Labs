// stores/userStore.js
import { defineStore } from 'pinia';
import { auth } from '~/plugins/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    isAuth: false,
    username: '',
    email: '',
    age: null,
    location: '',
    rating: 0,
  });

  const setUserDetails = (userData) => {
    user.value.isAuth = true;
    user.value.username = userData.username;
    user.value.email = userData.email;
    user.value.age = userData.age;
    user.value.location = userData.location;
    user.value.rating = userData.rating;
  };

  const register = async (email, password, username, age, location, rating) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUserDetails({ email, username, age, location, rating });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value.isAuth = true;
      user.value.email = email;
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = { isAuth: false, username: '', email: '', age: null, location: '', rating: 0 };
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserDetails = (updatedData) => {
    user.value.username = updatedData.username || user.value.username;
    user.value.email = updatedData.email || user.value.email;
    user.value.age = updatedData.age || user.value.age;
    user.value.location = updatedData.location || user.value.location;
    user.value.rating = updatedData.rating || user.value.rating;
  };

  return { user, register, login, logout, updateUserDetails };
});
