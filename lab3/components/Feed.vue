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
    <Post 
    v-for="(post, index) in paginatedPersons" 
    :key="post.id" 
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

export default {
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
      users: [
        { id: 1, name: "Mark Twen", Avatar: "/assets/pfp_1.svg" },
        { id: 2, name: "Katherine Johns", Avatar: "/assets/pfp_2.svg" },
        { id: 3, name: "Sally Robinson", Avatar: "/assets/pfp_3.svg" },
        { id: 4, name: "Stevie", Avatar: "/assets/pfp_4.svg" },
        { id: 5, name: "Jenna Paul", Avatar: "/assets/pfp_5.svg" },
        { id: 6, name: "David King", Avatar: "/assets/pfp_6.svg" },
        { id: 7, name: "Michael Hart", Avatar: "/assets/pfp_7.svg" },
        { id: 8, name: "Olivia George", Avatar: "/assets/pfp_8.svg" },
        { id: 9, name: "Chris Nolan", Avatar: "/assets/pfp_9.svg" },
        { id: 10, name: "Isla Fisher", Avatar: "/assets/pfp_10.svg" },
        { id: 11, name: "Robert Quinn", Avatar: "/assets/pfp_11.svg" },
        { id: 12, name: "Lily Evans", Avatar: "/assets/pfp_12.svg" },
        { id: 13, name: "Dylan Brooks", Avatar: "/assets/pfp_13.svg" },
        { id: 14, name: "Sophia Perez", Avatar: "/assets/pfp_14.svg" },
        { id: 15, name: "Jacob Lee", Avatar: "/assets/pfp_15.svg" },
        { id: 16, name: "Emily Rose", Avatar: "/assets/pfp_16.svg" },
        { id: 17, name: "Aaron Clark", Avatar: "/assets/pfp_17.svg" },
        { id: 18, name: "Grace Wilson", Avatar: "/assets/pfp_18.svg" },
        { id: 19, name: "Ethan Turner", Avatar: "/assets/pfp_19.svg" },
        { id: 20, name: "Mia Carter", Avatar: "/assets/pfp_20.svg" }
      ],
      posts: [
  { userId: 1, PubDate: "2024-09-26", Rating: 5, Commentary: "This is awesome!", Topic: "Design", isLiked: false, likeCount: 0 },
  { userId: 2, PubDate: "2024-09-25", Rating: 4, Commentary: "I lost the exit.", Topic: "Health", isLiked: false, likeCount: 1 },
  { userId: 3, PubDate: "2024-09-24", Rating: 5, Commentary: "Emotions overload!", Topic: "Science", isLiked: false, likeCount: 0 },
  { userId: 4, PubDate: "2024-09-23", Rating: 3, Commentary: "Needs improvement", Topic: "Design", isLiked: false, likeCount: 1 },
  { userId: 5, PubDate: "2024-09-22", Rating: 4, Commentary: "Fantastic visuals!", Topic: "Business", isLiked: false, likeCount: 2 },
  { userId: 6, PubDate: "2024-09-21", Rating: 3, Commentary: "A bit slow.", Topic: "Technology", isLiked: false, likeCount: 4 },
  { userId: 7, PubDate: "2024-09-20", Rating: 5, Commentary: "Unforgettable journey.", Topic: "Science", isLiked: false, likeCount: 3 },
  { userId: 8, PubDate: "2024-09-19", Rating: 4, Commentary: "Such a peaceful vibe.", Topic: "Technology", isLiked: false, likeCount: 1 },
  { userId: 9, PubDate: "2024-09-06", Rating: 2, Commentary: "Could be better.", Topic: "Design", isLiked: false, likeCount: 7 },
  { userId: 10, PubDate: "2024-09-13", Rating: 5, Commentary: "Pure joy!", Topic: "Business", isLiked: false, likeCount: 5 },
  { userId: 11, PubDate: "2024-09-11", Rating: 3, Commentary: "Interesting concept.", Topic: "Technology", isLiked: false, likeCount: 2 },
  { userId: 12, PubDate: "2024-09-12", Rating: 4, Commentary: "Great atmosphere!", Topic: "Science", isLiked: false, likeCount: 1 },
  { userId: 13, PubDate: "2024-09-07", Rating: 2, Commentary: "Too chaotic.", Topic: "Design", isLiked: false, likeCount: 0 },
  { userId: 14, PubDate: "2024-09-16", Rating: 5, Commentary: "I loved every second!", Topic: "Business", isLiked: false, likeCount: 2 },
  { userId: 15, PubDate: "2024-09-09", Rating: 3, Commentary: "Quite engaging.", Topic: "Technology", isLiked: false, likeCount: 6 },
  { userId: 16, PubDate: "2024-09-10", Rating: 4, Commentary: "Beautiful scenery.", Topic: "Health", isLiked: false, likeCount: 8 },
  { userId: 17, PubDate: "2024-09-08", Rating: 2, Commentary: "Not my style.", Topic: "Science", isLiked: false, likeCount: 0 },
  { userId: 18, PubDate: "2024-09-12", Rating: 5, Commentary: "Incredible journey!", Topic: "Design", isLiked: false, likeCount: 9 },
  { userId: 19, PubDate: "2024-09-07", Rating: 4, Commentary: "A wonderful surprise!", Topic: "Technology", isLiked: false, likeCount: 3 },
  { userId: 20, PubDate: "2024-09-14", Rating: 5, Commentary: "Masterpiece!", Topic: "Business", isLiked: false, likeCount: 2 }
],


   sortingType: 'date'
    };
  }, 
  computed: {
    
    totalPages() {
      return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
    },
    paginatedPersons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersons.slice(start, end);
    },
    filteredPersons() {
      let filtered = this.posts;
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
      return this.users.find(user => user.id === userId);
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
