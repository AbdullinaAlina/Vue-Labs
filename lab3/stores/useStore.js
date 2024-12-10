// useStore
import {defineStore} from 'pinia';
import { db } from "@/plugins/firebase";
import { collection, doc, addDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove, deleteDoc, setDoc } from "firebase/firestore";
import { useUserStore } from './userStore';

export const useStore = defineStore('main', {
    state: () => ({
        users: [],
        posts: [],
        selectedCategory: null,
    }),
    actions: {
        fetchUsers() {
            const usersCollection = collection(db, "users");
            onSnapshot(usersCollection, (snapshot) => {
              this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            });
        },
        fetchPosts() {
            const postsCollection = collection(db, "posts");
            onSnapshot(postsCollection, (snapshot) => {
              this.posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            });
        },
        setSelectedCategory(category) {
          this.selectedCategory = category; 
        },
        resetCategory() {
          this.selectedCategory = null; 
        },
        getUserById(userId) {
            return this.users.find(user => String(user.id) === String(userId));
        },
        async uploadDataToFirestore() {
          try {
            // Upload users
            for (const user of this.users) {
              await addDoc(collection(db, "users"), user);
            }
            console.log("Users uploaded successfully");
    
            // Upload posts
            for (const post of this.posts) {
              await addDoc(collection(db, "posts"), post);
            }
            console.log("Posts uploaded successfully");
          } catch (error) {
            console.error("Error uploading data to Firestore:", error);
          }
        },

        async createPost(post) {
          try {
            const postId = post.id || Date.now().toString();
            const postRef = doc(db, 'posts', postId); 
            await setDoc(postRef, { ...post, id: postId }); // Ensure id is included in the document
          } catch (error) {
            console.error("Error adding post:", error);
          }
        },

        async deletePost(postId) {
          try {
            const postRef = doc(db, 'posts', postId); 
            await deleteDoc(postRef); 
            } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
          }
        },
        
        
        async followUser(currentUserId, followedUserId) {
            try {
                const currentUserDocRef = doc(db, 'users', String(currentUserId));
                const followedUserDocRef = doc(db, 'users', String(followedUserId));

                await updateDoc(currentUserDocRef, {
                    following: arrayUnion(String(followedUserId))
                }, { merge: true });

                await updateDoc(followedUserDocRef, {
                    followers: arrayUnion(String(currentUserId))
                }, { merge: true });

                
            }
            catch (error) {
                console.log("Error following user", error);
            }
        },
        async unfollowUser(currentUserId, followedUserId) {
          try {
            const currentUserDocRef = doc(db, 'users', String(currentUserId));
            const followedUserDocRef = doc(db, 'users', String(followedUserId));

            await updateDoc(currentUserDocRef, {
                following: arrayRemove(String(followedUserId))
            });

            await updateDoc(followedUserDocRef, {
                followers: arrayRemove(String(currentUserId))
            });

            
        }
        catch (error) {
            console.log("Error unfollowing user", error);
        }
      },
      async removeFollower(currentUserId, followerUserId) {
        try {
          const currentUserDocRef = doc(db, 'users', String(currentUserId));
          const followerUserDocRef = doc(db, 'users', String(followerUserId));

          await updateDoc(currentUserDocRef, {
              followers: arrayRemove(String(followerUserId))
          });

          await updateDoc(followerUserDocRef, {
              following: arrayRemove(String(currentUserId))
          });

          const userStore = useUserStore();
          const index = userStore.user.followerUsers.indexOf(followerUserId);
          if (index !== 1) {
            userStore.user.followerUsers.splice(index, 1);
          }
      }
      catch (error) {
          console.log("Error removing follower", error);
        }
      },
      async fetchFollowingUserData(userId) {
        try {
            const followingData = [];
            const user = getUserById(userId);
            console.log(user);
            for (const followingUserId of user.value.followingUsers) {
                const userDocRef = doc(db, 'users', followingUserId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    followingData.push({ id: userDoc.id, ...userDoc.data() });
                }
            }
            followingUserData.value = followingData;
        } catch (error) {
            console.error('Error fetching followed users:', error);
        }
    },

    async fetchFollowerUserData(userId) {
      try {
        console.log(userId);
        const user = this.getUserById(userId);
        console.log(user);
        console.log('Fetching follower users:', user.value.followerUsers); // Add this log
        const followerData = [];
        for (const followerUserId of user.value.followerUsers) {
          const userDocRef = doc(db, 'users', followerUserId);
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
    }
});