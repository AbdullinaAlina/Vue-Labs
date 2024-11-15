// stores/chatStore.js
import { defineStore } from "pinia";
import { collection, doc, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
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
      const existingChat = this.chats.find((chat) =>
        participantIds.every((id) => chat.participants.includes(id))
      );

      if (!existingChat) {
        const chatDoc = await addDoc(chatsRef, { participants: participantIds });
        return chatDoc.id;
      }

      return existingChat.id;
    },
  },
});
