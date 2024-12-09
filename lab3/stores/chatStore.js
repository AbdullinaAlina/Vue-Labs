// stores/chatStore.js
import { defineStore } from "pinia";
import { collection, doc, addDoc, onSnapshot, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "~/plugins/firebase";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: [], // List of all chats for the logged-in user
    messages: [], // Messages for the currently active chat
    activeChatId: null, // ID of the currently active chat
  }),
  actions: {
    async loadChats(userId) {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", userId));

      onSnapshot(q, (snapshot) => {
        this.chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Chats fetched:", this.chats); // Debugging line

      });
    },

    async loadMessages(chatId) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const q = query(messagesRef, orderBy("createdAt"));

      onSnapshot(q, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });

      this.activeChatId = chatId;
    },

    async sendMessage(chatId, content, senderId) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      await addDoc(messagesRef, {
        content,
        senderId,
        createdAt: new Date(),
      });
    },

    async createChat(participantIds) {
        const chatsRef = collection(db, "chats");
      
        // Query for an existing chat where participants match
        const q = query(chatsRef, where("participants", "array-contains", participantIds[0]));
        const snapshot = await getDocs(q);
      
        // Check if the other participant is in the retrieved chats
        const existingChat = snapshot.docs.find((doc) =>
          doc.data().participants.includes(participantIds[1])
        );
      
        if (existingChat) {
          return existingChat.id; // Return the existing chat's ID
        }
      
        // No existing chat found, create a new one
        const chatDoc = await addDoc(chatsRef, { participants: participantIds });
        return chatDoc.id;
      }
      
  },
});
