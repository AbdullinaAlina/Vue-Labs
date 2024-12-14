<template>
    <div class="mobile-toolbar">
      <div class="mobile-toolbar__icons">
        <NuxtLink :to="`/chats`">
          <div class="mobile-toolbar__icon">
            <font-awesome :icon="['fas', 'comment']" />
          </div>
        </NuxtLink>
  
        <div class="mobile-toolbar__icon" @click="toggleCategories">
          <font-awesome
            :icon="isCategoriesOpen ? ['fas', 'arrow-down'] : ['fas', 'bars']"
          />
        </div>
  
        <NuxtLink :to="`/favorites`">
          <div class="mobile-toolbar__icon">
            <font-awesome :icon="['fas', 'heart']" />
          </div>
        </NuxtLink>
      </div>
  
      <!-- Expanded Categories -->
      <div class="mobile-toolbar__categories" v-if="isCategoriesOpen">
        <div class="mobile-toolbar__grid">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="mobile-toolbar__category"
            @click="selectCategory(category.name)"
          >
            <font-awesome :icon="category.icon" class="category-icon" />
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  import { useRouter } from "vue-router";


  const router = useRouter();
  
  const emit = defineEmits(["categorySelected"]);
  const isCategoriesOpen = ref(false);
  
  const categories = [
    { name: "Design", icon: ["fas", "palette"] },
    { name: "Technology", icon: ["fas", "laptop-code"] },
    { name: "Science", icon: ["fas", "atom"] },
    { name: "Business", icon: ["fas", "chart-line"] },
    { name: "Health", icon: ["fas", "heartbeat"] },
    { name: "Show All", icon: ["fas", "list"] },
  ];
  
  const toggleCategories = () => {
    isCategoriesOpen.value = !isCategoriesOpen.value;
  };
  
  const selectCategory = (category) => {
    emit("categorySelected", category === "Show All" ? null : category);
    isCategoriesOpen.value = false;
    router.push("/");
  };
  </script>
  
  <style scoped>
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
    background-color: #7F9A3E;
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
    color: #ffffff;
  }
  
  
  .mobile-toolbar__categories {
    background-color: #8FAB44;
    height: 70vh;
    padding: 20px;
    bottom: 100%; /* Position above the toolbar */
    left: 0;
    width: 100%;
  }
  
  .mobile-toolbar__grid {
    height: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    grid-template-rows: repeat(3, auto); /* 3 rows */
    gap: 20px;
  }
  
  .mobile-toolbar__category {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    background-color: #B0D17C;
    border-radius: 8px;
    cursor: pointer;
  }
  

  
  .category-icon {
    color: #60752F;
    font-size: 32px;
    margin-bottom: 12px;
  }
  
  .category-name {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  