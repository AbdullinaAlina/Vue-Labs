<template>
    <div>
      <button @click="addFollowFields">Add Followers and Following Fields to All Users</button>
    </div>
  </template>
  
  <script>
  import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
  import { db } from '~/plugins/firebase'; // Adjust path as needed to your Firebase config
  
  export default {
    name: 'UpdateUsers',
  
    methods: {
      async addFollowFields() {
        try {
          const usersCollection = collection(db, 'users');
          const snapshot = await getDocs(usersCollection);
  
          snapshot.forEach(async (userDoc) => {
            const userRef = doc(db, 'users', userDoc.id);
            await updateDoc(userRef, {
              followers: [], // Initialize followers as an empty array
              following: []  // Initialize following as an empty array
            });
            console.log(`Updated user ${userDoc.id} with followers and following fields.`);
          });
  
          console.log('All users updated with followers and following fields.');
        } catch (error) {
          console.error('Error updating users:', error);
        }
      }
    }
  };
  </script>
  