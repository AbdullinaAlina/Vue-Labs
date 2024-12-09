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
      <button class="sidebar__button" @click="toggleSideBar">
        Menu
      </button>
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

    <!-- Profile Icon (Both Mobile and Desktop) -->
    <div class="profile-icon" @click="toggleOverlay">
      <img
        class="profile__avatar"
        :src="user?.Avatar || '/assets/no_pfp.svg'"
        alt="Avatar"
      />
    </div>

    <AuthOverlay
      :isOpen="isOverlayOpen"
      @close="closeAuthOverlay"
      class="sidebar__auth-overlay"
    />

    <!-- Mobile Toolbar -->
    <div class="mobile-toolbar" v-if="isMobile">
      <div class="mobile-toolbar__icons">
        <div class="mobile-toolbar__icon" @click="goToMessages">
          <font-awesome :icon="['fas', 'comment']" />
        </div>
        <div class="mobile-toolbar__icon" @click="toggleCategories">
          <font-awesome :icon="isCategoriesOpen ? ['fas', 'arrow-down'] : ['fas', 'bars']" />
        </div>
        <div class="mobile-toolbar__icon" @click="goToFavorites">
          <font-awesome :icon="['fas', 'heart']" />
        </div>
      </div>

      <!-- Expanded Categories -->
      <div class="mobile-toolbar__categories" v-if="isCategoriesOpen">
        <div class="mobile-toolbar__grid">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="mobile-toolbar__category"
            @click="selectCategory(category)"
          >
            {{ category }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '~/stores/userStore'; // Import the user store
import AuthOverlay from './AuthOverlay.vue';

const emit = defineEmits(['categorySelected']);

const userStore = useUserStore();
const user = computed(() => userStore.user);

const categories = ['Show All', 'Design', 'Technology', 'Science', 'Business', 'Health'];
const isSideBarOpen = ref(false);
const isOverlayOpen = ref(false);
const isCategoriesOpen = ref(false);
const isMobile = ref(false); // Tracks whether the screen is mobile-sized

// Check screen size on mounted
onMounted(() => {
  const updateMobileState = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  // Set initial state and add listener
  updateMobileState();
  window.addEventListener('resize', updateMobileState);

  // Clean up listener on unmounted
  onUnmounted(() => {
    window.removeEventListener('resize', updateMobileState);
  });
});

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value;
};

const selectCategory = (category) => {
  emit('categorySelected', category === 'Show All' ? null : category);
  if (isCategoriesOpen.value) toggleCategories(); // Collapse toolbar after selection
};

const toggleOverlay = () => {
  isOverlayOpen.value = !isOverlayOpen.value;
};

const closeAuthOverlay = () => {
  isOverlayOpen.value = false;
};

const toggleCategories = () => {
  isCategoriesOpen.value = !isCategoriesOpen.value;
};

const goToMessages = () => {
  console.log('Navigate to Messages');
};

const goToFavorites = () => {
  console.log('Navigate to Favorites');
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
</style>
