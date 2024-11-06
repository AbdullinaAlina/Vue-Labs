// stores/userStore.js
import { defineStore } from 'pinia';
import { auth } from '~/plugins/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useStore } from './useStore';

export const useUserStore = defineStore('user', () => {
    const mainStore = useStore();
    const user = ref({
        isAuth: false,
        id: '',
        username: '',
        email: '',
        age: null,
        address: '',
        rating: 0,
        followedUsers: [], // Array to store followed users
  });

  // Set user details after authentication
  const setUserDetails = (userData) => {
    user.value.isAuth = true;
    user.value.id = userData.id || '';
    user.value.username = userData.name || '';
    user.value.email = userData.email || '';
    user.value.age = userData.age || null;
    user.value.address = userData.address || '';
    user.value.rating = userData.rating || 0;
  };

  // Register a new user
  const register = async (email, password, username, age, address, rating) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        email,
        username,
        age,
        address,
        rating,
      };
      setUserDetails(userData);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Login an existing user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      const matchedUser = mainStore.users.find((user) => user.email === email);
      console.log(matchedUser);

      if (matchedUser) {
        setUserDetails(matchedUser);
      } else {
        console.warn('User not found in local users list');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Logout the user
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = { isAuth: false, username: '', email: '', age: null, address: '', rating: 0, followedUsers: [] };
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user details
  const updateUserDetails = (updatedData) => {
    user.value.username = updatedData.username || user.value.username;
    user.value.email = updatedData.email || user.value.email;
    user.value.age = updatedData.age || user.value.age;
    user.value.address = updatedData.address || user.value.address;
    user.value.rating = updatedData.rating || user.value.rating;
  };

  // Follow a user
  const followUser = (userId) => {
    if (!user.value.followedUsers.includes(userId)) {
      user.value.followedUsers.push(userId);
    }
  };

  // Unfollow a user
  const unfollowUser = (userId) => {
    user.value.followedUsers = user.value.followedUsers.filter(id => id !== userId);
  };

  return { user, register, login, logout, updateUserDetails, followUser, unfollowUser };
});
