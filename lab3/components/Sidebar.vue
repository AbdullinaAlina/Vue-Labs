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
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <!-- Profile Icon -->
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

    <!-- Mobile Toolbar -->
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

.sidebar__menu {
  background-color: #f4f4f4;
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

.profile-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.profile__avatar {
  width: 36px;
}

/* Mobile Toolbar */
.mobile-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.mobile-toolbar__icons {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.mobile-toolbar__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.mobile-toolbar__icon:hover {
  color: #007BFF;
}

.mobile-toolbar__categories {
  background-color: #f8f8f8;
  width: 100%;
  padding: 20px;
}

.mobile-toolbar__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.mobile-toolbar__category {
  padding: 10px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.mobile-toolbar__category:hover {
  background-color: #007BFF;
  color: #ffffff;
}

@media (max-width: 768px) {
  .sidebar {
    justify-content: flex-end;
  }
}
</style>
