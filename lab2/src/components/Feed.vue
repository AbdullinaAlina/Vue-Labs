<template>
    <div class="feed">
      <div class="header">
        <div class="section">
          <h2>
            {{ selectedCategory ? selectedCategory : '' }}
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
      <Post v-for="(person, index) in paginatedPersons" :key="person.id" :post="person" />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="fa fa-chevron-left"></i>
      </button>
      <span> {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>
    </div>
</template>
  
<script>
  import Post from './Post.vue';  // Import the Post component
  import _ from 'lodash';
  
  export default {
    components: {
      Post  // Register the Post component
    },
    props: {
      selectedCategory: String
    },
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 4,
        persons: [
            { id: 1, PersonName: "Mark Twen", Avatar: "src/assets/pfp_1.svg", PubDate: "2024-09-26", Rating: 5, Commentary: "This is awesome!", Topic: "Design", isLiked: false, likeCount: 0 },
            { id: 2, PersonName: "Katherine Johns", Avatar: "src/assets/pfp_2.svg", PubDate: "2024-09-25", Rating: 4, Commentary: "I lost the exit.", Topic: "Health", isLiked: false, likeCount: 1 },
            { id: 3, PersonName: "Sally Robinson", Avatar: "src/assets/pfp_3.svg", PubDate: "2024-09-24", Rating: 5, Commentary: "Emotions overload!", Topic: "Science", isLiked: false, likeCount: 0 },
            { id: 4, PersonName: "Stevie", Avatar: "src/assets/pfp_4.svg", PubDate: "2024-09-23", Rating: 3, Commentary: "Needs improvement", Topic: "Design", isLiked: false, likeCount: 1 },
            { id: 5, PersonName: "Jenna Paul", Avatar: "src/assets/pfp_5.svg", PubDate: "2024-09-22", Rating: 4, Commentary: "Fantastic visuals!", Topic: "Business", isLiked: false, likeCount: 2 },
            { id: 6, PersonName: "David King", Avatar: "src/assets/pfp_6.svg", PubDate: "2024-09-21", Rating: 3, Commentary: "A bit slow.", Topic: "Technology", isLiked: false, likeCount: 4 },
            { id: 7, PersonName: "Michael Hart", Avatar: "src/assets/pfp_7.svg", PubDate: "2024-09-20", Rating: 5, Commentary: "Unforgettable journey.", Topic: "Science", isLiked: false, likeCount: 3 },
            { id: 8, PersonName: "Olivia George", Avatar: "src/assets/pfp_8.svg", PubDate: "2024-09-19", Rating: 4, Commentary: "Such a peaceful vibe.", Topic: "Technology", isLiked: false, likeCount: 1 },
            { id: 9, PersonName: "Chris Nolan", Avatar: "src/assets/pfp_9.svg", PubDate: "2024-09-06", Rating: 2, Commentary: "Could be better.", Topic: "Design", isLiked: false, likeCount: 7 },
            { id: 10, PersonName: "Isla Fisher", Avatar: "src/assets/pfp_10.svg", PubDate: "2024-09-13", Rating: 5, Commentary: "Pure joy!", Topic: "Business", isLiked: false, likeCount: 5 },
            { id: 11, PersonName: "Robert Quinn", Avatar: "src/assets/pfp_11.svg", PubDate: "2024-09-11", Rating: 3, Commentary: "Interesting concept.", Topic: "Technology", isLiked: false, likeCount: 2 },
            { id: 12, PersonName: "Lily Evans", Avatar: "src/assets/pfp_12.svg", PubDate: "2024-09-12", Rating: 4, Commentary: "Great atmosphere!", Topic: "Science", isLiked: false, likeCount: 1 },
            { id: 13, PersonName: "Dylan Brooks", Avatar: "src/assets/pfp_13.svg", PubDate: "2024-09-07", Rating: 2, Commentary: "Too chaotic.", Topic: "Design", isLiked: false, likeCount: 0 },
            { id: 14, PersonName: "Sophia Perez", Avatar: "src/assets/pfp_14.svg", PubDate: "2024-09-16", Rating: 5, Commentary: "I loved every second!", Topic: "Business", isLiked: false, likeCount: 2 },
            { id: 15, PersonName: "Jacob Lee", Avatar: "src/assets/pfp_15.svg", PubDate: "2024-09-09", Rating: 3, Commentary: "Quite engaging.", Topic: "Technology", isLiked: false, likeCount: 6 },
            { id: 16, PersonName: "Emily Rose", Avatar: "src/assets/pfp_16.svg", PubDate: "2024-09-10", Rating: 4, Commentary: "Beautiful scenery.", Topic: "Health", isLiked: false, likeCount: 8 },
            { id: 17, PersonName: "Aaron Clark", Avatar: "src/assets/pfp_17.svg", PubDate: "2024-09-08", Rating: 2, Commentary: "Not my style.", Topic: "Science", isLiked: false, likeCount: 0 },
            { id: 18, PersonName: "Grace Wilson", Avatar: "src/assets/pfp_18.svg", PubDate: "2024-09-12", Rating: 5, Commentary: "Incredible journey!", Topic: "Design", isLiked: false, likeCount: 9 },
            { id: 19, PersonName: "Ethan Turner", Avatar: "src/assets/pfp_19.svg", PubDate: "2024-09-07", Rating: 4, Commentary: "A wonderful surprise!", Topic: "Technology", isLiked: false, likeCount: 3 },
            { id: 20, PersonName: "Mia Carter", Avatar: "src/assets/pfp_20.svg", PubDate: "2024-09-14", Rating: 5, Commentary: "Masterpiece!", Topic: "Business", isLiked: false, likeCount: 2 }
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
      let filtered = this.persons;

      if (this.selectedCategory) {
        filtered = filtered.filter(person => person.Topic === this.selectedCategory);
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
    // Go to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Go to the next page
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
  width: 100%;

}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
  