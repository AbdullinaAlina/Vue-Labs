<template>
    <div class="confirmation-overlay" v-if="isOpen">
      <div class="overlay-content">
        <h3>Confirm Your Email</h3>
        <p>A code has been sent to your email. Please enter it below:</p>
        <input type="text" v-model="confirmationCode" placeholder="Enter code" />
        <button @click="handleConfirm">Create {{ username }}</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    isOpen: Boolean,
    username: String,
    onClose: Function,
  });
  
  const confirmationCode = ref('');
  const router = useRouter();
  
  const handleConfirm = () => {
    if (confirmationCode.value === "123456") { // Simulate code verification
      console.log(`Account for ${props.username} confirmed with code ${confirmationCode.value}`);
      props.onClose();
      router.push('/'); // Redirect to the feed after successful confirmation
    } else {
      alert("Invalid confirmation code.");
    }
  };
  </script>
  
  <style scoped>
  .confirmation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 20;
  }
  
  .overlay-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
  }
  
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #43ef27;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #36c320;
  }
  </style>
  