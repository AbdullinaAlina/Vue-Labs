import {defineStore} from 'pinia';
import { db } from "@/plugins/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

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
        }
    }
});