<template>
  <div class="following-page">
    <h1 class="page-title">Followers</h1>
    <div class="following-list">
      <OthersFollowerUser
        v-for="follower in followerUserData"
        :key="follower.id"
        :user="follower"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "~/stores/useStore";
import OthersFollowerUser from "~/components/OthersFollowerUser.vue";

const route = useRoute();
const userId = route.params.id;
const store = useStore();

const followerUserData = ref([]);

async function fetchFollowerUserData() {
  const user = store.getUserById(userId); // Get user by ID
  if (!user || !user.followers) return;

  const followerData = [];
  for (const followerUserId of user.followers) {
    const follower = store.getUserById(followerUserId); // Fetch from store
    if (follower) {
      followerData.push(follower);
    }
  }
  followerUserData.value = followerData; // Update reactive data
}

// Watch for changes in store's `users` and refetch followers
watch(
  () => store.users,
  (newUsers) => {
    if (newUsers.length > 0) {
      fetchFollowerUserData();
    }
  }
);

// Ensure users are fetched and followers are populated
onMounted(() => {
  if (store.users.length === 0) {
    store.fetchUsers(); // Load users if not already loaded
  } else {
    fetchFollowerUserData(); // Fetch followers if users are already loaded
  }
});
</script>

<style scoped>
.following-page {
  padding: 32px;
  background-image: url('/assets/background.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 32px;
  color: #333;
}

.following-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;
  max-width: 1200px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .following-page {
    padding: 16px;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 24px;
  }

  .following-list {
    width: 100%; /* Use full width for smaller screens */
    gap: 12px;
  }
}


</style>
