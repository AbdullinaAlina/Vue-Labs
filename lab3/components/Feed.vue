<!-- components/Feed.vue -->

<template>
  <div class="feed">
    <div class="header">
      <div class="section">
        <h3>
          {{ formatDate(new Date())}}
        </h3>
        <h2>
          {{ selectedCategory ? selectedCategory : 'All Posts' }}
        </h2>
          
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
    <!-- <Post 
    v-for="(post, index) in paginatedPersons" 
    :key="post.id" 
    :post="post" 
    :user="getUserById(post.userId)"
    /> -->
    <Post 
      v-for="post in paginatedPosts"
      :post="post" 
      :user="getUserById(post.userId)"
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

      if (this.selectedCategory) {
        filtered = filtered.filter(post => post.Topic === this.selectedCategory);
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
      return this.store.users.find(user => user.id === userId);
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
align-items: center;
display: flex;
flex-direction: column;
text-align: center;
width: 100%;
padding: 20px 0;
}

.header {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
width: 100%;
padding: 4px 80px;
color: #fff
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

.posts-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px; /* Adjust the gap between cards as needed */
margin-bottom: 24px;
justify-content: center;
padding: 30px;
background-color: rgb(255, 255, 255, 0.3);
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
</style>
