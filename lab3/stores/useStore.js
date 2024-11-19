import {defineStore} from 'pinia';
import { db } from "@/plugins/firebase";
import { collection, doc, addDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useUserStore } from './userStore';

export const useStore = defineStore('main', {
    state: () => ({
        users: [],
        posts: [],
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
        getUserById(userId) {
            return this.users.find(user => String(user.id) === String(userId));
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

                const userStore = useUserStore();
                if (!userStore.user.followingUsers.includes(followedUserId)){
                    userStore.user.followingUsers.push(followedUserId);
                }
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

            const userStore = useUserStore();
            const index = userStore.user.followingUsers.indexOf(followedUserId);
            if (index !== 1) {
              userStore.user.followingUsers.splice(index, 1);
            }
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
      }
    }
});