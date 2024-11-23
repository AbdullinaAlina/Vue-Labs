
  <template>
    <div>
      <button @click="fixPostIds">Fix Post IDs</button>
      <p v-if="statusMessage">{{ statusMessage }}</p>
    </div>
  </template>
  
  <script>
  import { getDocs, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
  import { db } from '~/plugins/firebase';
  
  export default {
    data() {
      return {
        statusMessage: '', // This will hold the status message
      };
    },
    methods: {
      async fixPostIds() {
        const postsCollectionRef = collection(db, "posts");
  
        try {
          // Display the loading message
          this.statusMessage = 'Fixing post IDs...';
  
          // Fetch all documents in the 'posts' collection
          const querySnapshot = await getDocs(postsCollectionRef);
  
          // Loop through each document in the collection
          for (const docSnap of querySnapshot.docs) {
            const docData = docSnap.data();
            const docId = docData.id; // Get the id field from the document data
  
            // If the document id is not the same as the post's id
            if (docSnap.id !== docId) {
              // Create a reference to the new document with the 'id' field as the document ID
              const newDocRef = doc(db, "posts", docId);
              
              // Copy the document data to the new document reference
              await setDoc(newDocRef, docData);
  
              // After the new document is created, delete the old one
              await deleteDoc(docSnap.ref);
  
              console.log(`Updated document id from ${docSnap.id} to ${docId}`);
            }
          }
  
          // Once all IDs are fixed, update the status message
          this.statusMessage = 'Document IDs updated successfully!';
        } catch (error) {
          // Handle any errors
          console.error("Error updating document IDs:", error);
          this.statusMessage = 'Error occurred while fixing post IDs.';
        }
      }
    }
  };
  </script>
  
  