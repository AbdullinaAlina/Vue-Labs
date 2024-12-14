<template>
  <div class="sidebar">
    <!-- Desktop Sidebar -->
    <div
      v-if="!isMobile"
      class="sidebar__icon"
      :style="{ visibility: isSideBarOpen ? 'hidden' : 'visible' }"
      @click="toggleSideBar"
    >
      <font-awesome :icon="['fas', 'bars']" />
    </div>

    <div v-if="!isMobile" class="sidebar__menu" v-show="isSideBarOpen">
      <button class="sidebar__button" @click="toggleSideBar">Menu</button>
      <ul class="sidebar__categories">
        <li
          v-for="(category, index) in categories"
          :key="index"
          @click="selectCategory(category)"
          class="sidebar__category"
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <div class="profile-icon" @click="toggleOverlay">
      <img
        class="profile__avatar"
        :src="user?.avatar || '/assets/no_pfp.svg'"
        alt="Avatar"
      />
    </div>

    <AuthOverlay
      :isOpen="isOverlayOpen"
      @close="closeAuthOverlay"
      class="sidebar__auth-overlay"
    />

    <MobileToolbar
      v-if="isMobile"
      @categorySelected="selectCategory"
    />
  </div>
</template>

<script setup>
import MobileToolbar from "./MobileToolbar.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useStore } from "~/stores/useStore";
import AuthOverlay from "./AuthOverlay.vue";

const userStore = useUserStore();
const store = useStore();
const user = computed(() => userStore.user);

const emit = defineEmits(["categorySelected"]);

const isSideBarOpen = ref(false);
const isOverlayOpen = ref(false);
const isMobile = ref(false); // Tracks whether the screen is mobile-sized
const categories = ["Show All", "Design", "Technology", "Science", "Business", "Health"];

// Check screen size
onMounted(() => {
  const updateMobileState = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  updateMobileState();
  window.addEventListener("resize", updateMobileState);

  onUnmounted(() => {
    window.removeEventListener("resize", updateMobileState);
  });
});

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value;
};

const selectCategory = (category) => {
  if (category === "Show All") {
    store.resetCategory(); 
  } else {
    store.setSelectedCategory(category); 
  }
  isSideBarOpen.value = false;
};

const toggleOverlay = () => {
  isOverlayOpen.value = !isOverlayOpen.value;
};

const closeAuthOverlay = () => {
  isOverlayOpen.value = false;
};
</script>

<style scoped>
/* Desktop Sidebar */
.sidebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding: 10px 20px;
}

.sidebar__icon {
  width: 36px;
  display: flex;
  justify-content: center;
  height: 36px;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  padding: 16px;
  background-color: #2e2e2e;
  color: #fff;
  text-align: center;
}

.sidebar__icon:hover {
  background-color: #7F9A3E;
}

.sidebar__button {
  background-color: #7F9A3E;
  padding: 12px;
  border: none;
  margin-bottom: 36px;
  cursor: pointer;
  font-size: 24px;
}

.sidebar__menu {
  background-color: #8FAB44;
  width: 420px;
  padding: 16px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar__categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
}

.sidebar__category {
  background-color: #B0D17C;
    color: white;
    text-align: center;
    padding: 12px;
}

.profile-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.profile__avatar {
  width: 36px;
}


@media (max-width: 768px) {
  .sidebar {
    justify-content: flex-end;
  }
}
</style>
