<template>
    <button @click="uploadData">Upload Data to Firestore</button>
  </template>
  
  <script setup>
  import { useStore } from "@/stores/useStore"; // adjust the path as needed
  const store = useStore();
  
  function uploadData() {
    store.uploadDataToFirestore();
  }
  
  </script>
  