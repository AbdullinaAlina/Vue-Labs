<template>
</template>

<script>
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

async function migrateUsersToCustomIds() {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);

        for (const docSnap of snapshot.docs) {
            const userData = docSnap.data();
            
            // Check if the user has an `id` field in the data; this will be used as the new document ID.
            if (userData.id) {
                const newDocRef = doc(db, "users", String(userData.id)); // Use `userData.id` as document ID

                // Set the new document with the desired ID
                await setDoc(newDocRef, userData);

                // Delete the old document with the auto-generated ID
                await deleteDoc(docSnap.ref);
                
                console.log(`Migrated user with temporary ID ${docSnap.id} to custom ID ${userData.id}`);
            } else {
                console.warn(`User document ${docSnap.id} has no 'id' field, skipping migration.`);
            }
        }
        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Error migrating users to custom IDs:", error);
    }
}

// Call this function only once to perform the migration
migrateUsersToCustomIds();

</script>