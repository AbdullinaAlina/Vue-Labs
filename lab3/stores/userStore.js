// stores/userStore.js
import { defineStore } from 'pinia';
import { auth, db } from '~/plugins/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useStore } from './useStore';
import { arrayRemove, arrayUnion, deleteField, doc, getDoc, getDocs, increment, updateDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', () => {
    const mainStore = useStore();
    const user = ref({
        isAuth: false,
        id: '',
        username: '',
        avatar: '',
        email: '',
        age: null,
        address: '',
        rating: 0,
        followingUsers: [],
        followerUsers: [], 
        likedPosts: [],
        nicknames: {},
  });

  function setUserDetails (userData) {
    user.value.isAuth = true;
    user.value.id = userData.id || '';
    user.value.username = userData.name || '';
    user.value.avatar = userData.Avatar || '/assets/no_pfp.svg';
    user.value.email = userData.email || '';
    user.value.age = userData.age || null;
    user.value.address = userData.address || '';
    user.value.rating = userData.rating || 0;
    user.value.followingUsers = userData.following || [];
    user.value.followerUsers = userData.followers || [];
    user.value.likedPosts = userData.likedPosts || [];
    user.value.nicknames = userData.nicknames || {}; 
  };

  // Register a new user
  async function register (email, password, username, age, address, rating) {
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
  async function login(email, password) {
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
  async function logout() {
    try {
      await signOut(auth);
      user.value = { isAuth: false, username: '', email: '', age: null, address: '', rating: 0, followedUsers: [], followerUsers: [] };
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user details
  function updateUserDetails (updatedData) {
    user.value.username = updatedData.username || user.value.username;
    user.value.email = updatedData.email || user.value.email;
    user.value.age = updatedData.age || user.value.age;
    user.value.address = updatedData.address || user.value.address;
  };

  const followingUserData = ref([]);
  const followerUserData = ref([]); 

    // Fetch data for all followed users based on their IDs
    async function fetchFollowingUserData() {
        try {
            const followingData = [];
            for (const userId of user.value.followingUsers) {
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    followingData.push({ id: userDoc.id, ...userDoc.data() });
                }
            }
            followingUserData.value = followingData;
        } catch (error) {
            console.error('Error fetching followed users:', error);
        }
    };

    async function fetchFollowerUserData() {
      try {
        console.log('Fetching follower users:', user.value.followerUsers); // Add this log
        const followerData = [];
        for (const userId of user.value.followerUsers) {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            followerData.push({ id: userDoc.id, ...userDoc.data() });
          }
        }
        console.log('Fetched followers:', followerData); // Add this log
        followerUserData.value = followerData;
      } catch (error) {
        console.error('Error fetching follower users:', error);
      }
    }

    const likedPostsData = ref([]); 

    async function fetchLikedPostsData() {
      try {
        console.log('Fetching liked posts:', user.value.likedPosts); // Add this log
        const likedPosts = [];
        for (const postId of user.value.likedPosts) {
          const postDocRef = doc(db, 'posts', String(postId));
          const postDoc = await getDoc(postDocRef);
          if (postDoc.exists()) {
            likedPosts.push({ id: postDoc.id, ...postDoc.data() });
          }
        }
        console.log('Fetched liked posts:', likedPosts); // Add this log
        likedPostsData.value = likedPosts;
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }

    async function updateUserLikedPostsInFirestore(userId, postId, action) {
      const userDocRef = doc(db, "users", userId);
      console.log(typeof postId); // Should log 'string'

      const postDocRef = doc(db, "posts", postId);

      try {
          if (action === 'like') {
              await updateDoc(userDocRef, {
                  likedPosts: arrayUnion(postId)
              });
              await updateDoc(postDocRef, {
                likeCount: increment(1)
            });
          } else if (action === 'unlike') {
              await updateDoc(userDocRef, {
                  likedPosts: arrayRemove(postId)
              });
              await updateDoc(postDocRef, {
                likeCount: increment(-1) 
            });
          }
      } catch (error) {
          console.error("Error updating liked posts in Firestore:", error);
      }
  }

    async function likePost(postId) {
      if (!user.value.likedPosts.includes(postId)) {
          user.value.likedPosts.push(postId);

          const posts = mainStore.posts;
    
          await updateUserLikedPostsInFirestore(user.value.id, postId, 'like');
      }
  }

  async function unlikePost(postId) {
    user.value.likedPosts = user.value.likedPosts.filter(id => id !== postId);
    await updateUserLikedPostsInFirestore(user.value.id, postId, 'unlike');
}
    
  // Follow a user
  async function followUser(userId) {
    if (!user.value.followingUsers.includes(userId)) {
      user.value.followingUsers.push(userId);
      const store = useStore();
      await store.followUser(user.value.id, userId);
      await fetchFollowingUserData();
    }
  };

  // Unfollow a user
  async function unfollowUser(userId) {
    user.value.followingUsers = user.value.followingUsers.filter(id => id !== userId);
    const store = useStore();
    await store.unfollowUser(user.value.id, userId);
    await fetchFollowingUserData();
  };

  function removeFollower(userId) {
    user.value.followerUsers = user.value.followerUsers.filter(id => id !== userId);
    fetchFollowerUserData();
  };

  function getDisplayName(userId) {
    const nicknames = user.value.nicknames || {};
    const realName = mainStore.users.find((user) => user.id === userId)?.name || "No Name";
    
    if (nicknames[userId]) {
      return nicknames[userId]; // Return nickname if it exists
    }
    
    return realName; // Fallback to the real name
  };
  
// Set a nickname for a specific user by the logged-in user
async function setNickname(userId, nickname) {
  try {
    const userDocRef = doc(db, 'users', user.value.id); // Use the logged-in user's id (user.value.id)
    
    // Ensure the nickname is properly set for the target user (userId)
    await updateDoc(userDocRef, {
      [`nicknames.${userId}`]: nickname, // Set the nickname for the target user by userId
    });

    // Update the local state (Pinia store)
    user.value.nicknames[userId] = nickname; // Update the local state to reflect the new nickname
  } catch (error) {
    console.error('Error setting nickname:', error);
  }
}

// Remove a nickname for a specific user by the logged-in user
async function removeNickname(userId) {
  try {
    const userDocRef = doc(db, 'users', user.value.id); // Use the logged-in user's id (user.value.id)
    
    // Remove the nickname for the target user (userId)
    await updateDoc(userDocRef, {
      [`nicknames.${userId}`]: deleteField(), // Remove the nickname for the target user by userId
    });

    // Update the local state (Pinia store)
    delete user.value.nicknames[userId]; // Remove from local state as well
  } catch (error) {
    console.error('Error removing nickname:', error);
  }
}





  return {
    user, 
    register, 
    login, 
    logout, 
    updateUserDetails, 
    fetchFollowingUserData, 
    fetchFollowerUserData, 
    fetchLikedPostsData,
    followUser, 
    unfollowUser, 
    followingUserData, 
    followerUserData, 
    likedPostsData,
    removeFollower,
    likePost,
    unlikePost,
    getDisplayName,
    setNickname,
    removeNickname
  };
});
