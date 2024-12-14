<!-- components/Feed.vue -->

<template>
  <div class="feed">
    <div class="header">
      <div class="section">
        <h1>
          {{ store.selectedCategory ? store.selectedCategory : 'All Posts' }}
        </h1>
        <h1>/</h1>
        <h1>
          {{ formatDate(new Date())}}
        </h1>
      </div>
      <div class="filters">
          <label for="sort-options">Sort by:</label>
          <select id="sort-options" v-model="sortingType" @change="resetPage">
              <option value="date">Date</option>
              <option value="likes">Rating</option>
          </select>
        </div>
    </div>
      

  <div class="posts-grid">
    <Post 
      v-for="post in paginatedPosts"
      :post="post" 
      :key="post.id" 
    />
  </div>

  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">
      <font-awesome :icon="['fas', 'chevron-left']" />
    </button>
    <span> {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      <font-awesome :icon="['fas', 'chevron-right']" />
    </button>
  </div>
  </div>
</template>

<script>
import Post from './Post.vue';  
import _ from 'lodash';
import { useStore } from '~/stores/useStore';

export default {
  setup() {
    const store = useStore();
    return { store };
  },
  components: {
    Post 
  },
  props: {
    selectedCategory: String
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
    sortingType: 'date'
      };
    }, 
  computed: {
    
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
    filteredPosts() {
      let filtered = this.store.posts;
        this.currentPage = 1;

      if (this.store.selectedCategory) {
        filtered = filtered.filter(post => post.Topic === this.store.selectedCategory);
      }

      if (this.sortingType === 'date') {
        return _.orderBy(filtered, ['PubDate'], ['desc']);
      } else if (this.sortingType === 'likes') {
        return _.orderBy(filtered, ['likeCount'], ['desc']);
      }
      return filtered;
    }
  },
  methods: {
    getUserById(userId) {
      return this.store.users.find(user => String(user.id) === String(userId));
    },
    formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    sortByDate() {
      this.sortingType = 'date';
      this.currentPage = 1; // Reset page to 1
    },
    sortByLikes() {
      this.sortingType = 'likes';
      this.currentPage = 1; // Reset page to 1
    }
  }
} 
</script>

<style scoped>


.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  width: 100%; /* Take full width of the screen */
  padding: 20px;
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh; /* Ensure it grows with content */
  overflow-x: hidden; /* Prevent horizontal overflow */
  padding-bottom: 96px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns by default */
  gap: 24px;
  margin: 0 auto; /* Center grid horizontally */
  padding: 20px; /* Inner padding */
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  width: 80%; /* Use all available width */
  box-sizing: border-box; /* Include padding in width */
}

.header {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
text-align: left;
width: 80%;
color: #fff
}

.section {
  background-color: #5BB9CD;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.filters {
margin-bottom: 10px;
position: relative;
}



.filters label {
margin-right: 10px;
}

.filters select {
border-radius: 8px;
padding: 4px 8px;
font-size: 16px;
}


.posts-grid > * {
  max-width: 100%; /* Prevent posts from exceeding grid boundaries */
  box-sizing: border-box; /* Include padding in width calculation */
}


/* Specifically place each post in the correct position */
.posts-grid > *:nth-child(1) {
grid-column: 1;
grid-row: 1;
}

.posts-grid > *:nth-child(2) {
grid-column: 1;
grid-row: 2;
}

.posts-grid > *:nth-child(3) {
grid-column: 2;
grid-row: 1;
}

.posts-grid > *:nth-child(4) {
grid-column: 2;
grid-row: 2;
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pagination button {
  padding: 8px;
}



/* Media Query: Adjust for smaller screens */
@media (max-width: 768px) {
  .posts-grid {
    display: flex;
    flex-direction: column;
    gap: 16px; /* Reduce gap between items */
    width: 100%;
  }

  .header {
    width: 100%;
  }
}

</style>
