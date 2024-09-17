<template>
    <div>
    <!-- Filter Buttons -->
    <div class="filters">
      <button @click="sortByDate">Sort by Date</button>
      <button @click="sortByLikes">Sort by Likes</button>
    </div>

    <!-- Loop through the paginated persons and pass them to the Post component -->
    <Post v-for="person in paginatedPersons" :key="person.id" :post="person" />

       <!-- Pagination controls -->
    <!-- Pagination controls with FontAwesome icons -->
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
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 4,
        // Array of persons (same as before)
        persons: [
            { id: 1, PersonName: "Mark Twen", Avatar: "src/assets/pfp_1.svg", PubDate: "2024-09-13", Rating: 5, Commentary: "This is awesome!", Topic: "Adventure", isLiked: false, likeCount: 0 },
            { id: 2, PersonName: "Katherine Johns", Avatar: "src/assets/pfp_2.svg", PubDate: "2024-09-08", Rating: 4, Commentary: "I lost the exit.", Topic: "Nature", isLiked: false, likeCount: 1 },
            { id: 3, PersonName: "Sally Robinson", Avatar: "src/assets/pfp_3.svg", PubDate: "2024-09-12", Rating: 5, Commentary: "Emotions overload!", Topic: "Travel", isLiked: false, likeCount: 0 },
            { id: 4, PersonName: "Stevie", Avatar: "src/assets/pfp_4.svg", PubDate: "2024-09-10", Rating: 3, Commentary: "Needs improvement", Topic: "Adventure", isLiked: false, likeCount: 1 },
            { id: 5, PersonName: "Jenna Paul", Avatar: "src/assets/pfp_5.svg", PubDate: "2024-09-14", Rating: 4, Commentary: "Fantastic visuals!", Topic: "Art", isLiked: false, likeCount: 2 },
            { id: 6, PersonName: "David King", Avatar: "src/assets/pfp_6.svg", PubDate: "2024-09-11", Rating: 3, Commentary: "A bit slow.", Topic: "Technology", isLiked: false, likeCount: 0 },
            { id: 7, PersonName: "Michael Hart", Avatar: "src/assets/pfp_7.svg", PubDate: "2024-09-07", Rating: 5, Commentary: "Unforgettable journey.", Topic: "Travel", isLiked: false, likeCount: 3 },
            { id: 8, PersonName: "Olivia George", Avatar: "src/assets/pfp_8.svg", PubDate: "2024-09-09", Rating: 4, Commentary: "Such a peaceful vibe.", Topic: "Nature", isLiked: false, likeCount: 1 },
            { id: 9, PersonName: "Chris Nolan", Avatar: "src/assets/pfp_9.svg", PubDate: "2024-09-06", Rating: 2, Commentary: "Could be better.", Topic: "Adventure", isLiked: false, likeCount: 1 },
            { id: 10, PersonName: "Isla Fisher", Avatar: "src/assets/pfp_10.svg", PubDate: "2024-09-13", Rating: 5, Commentary: "Pure joy!", Topic: "Art", isLiked: false, likeCount: 0 },
            { id: 11, PersonName: "Robert Quinn", Avatar: "src/assets/pfp_11.svg", PubDate: "2024-09-11", Rating: 3, Commentary: "Interesting concept.", Topic: "Technology", isLiked: false, likeCount: 2 },
            { id: 12, PersonName: "Lily Evans", Avatar: "src/assets/pfp_12.svg", PubDate: "2024-09-12", Rating: 4, Commentary: "Great atmosphere!", Topic: "Travel", isLiked: false, likeCount: 1 },
            { id: 13, PersonName: "Dylan Brooks", Avatar: "src/assets/pfp_13.svg", PubDate: "2024-09-07", Rating: 2, Commentary: "Too chaotic.", Topic: "Adventure", isLiked: false, likeCount: 0 },
            { id: 14, PersonName: "Sophia Perez", Avatar: "src/assets/pfp_14.svg", PubDate: "2024-09-15", Rating: 5, Commentary: "I loved every second!", Topic: "Art", isLiked: false, likeCount: 2 },
            { id: 15, PersonName: "Jacob Lee", Avatar: "src/assets/pfp_15.svg", PubDate: "2024-09-09", Rating: 3, Commentary: "Quite engaging.", Topic: "Technology", isLiked: false, likeCount: 0 },
            { id: 16, PersonName: "Emily Rose", Avatar: "src/assets/pfp_16.svg", PubDate: "2024-09-10", Rating: 4, Commentary: "Beautiful scenery.", Topic: "Nature", isLiked: false, likeCount: 1 },
            { id: 17, PersonName: "Aaron Clark", Avatar: "src/assets/pfp_17.svg", PubDate: "2024-09-08", Rating: 2, Commentary: "Not my style.", Topic: "Travel", isLiked: false, likeCount: 0 },
            { id: 18, PersonName: "Grace Wilson", Avatar: "src/assets/pfp_18.svg", PubDate: "2024-09-12", Rating: 5, Commentary: "Incredible journey!", Topic: "Adventure", isLiked: false, likeCount: 1 },
            { id: 19, PersonName: "Ethan Turner", Avatar: "src/assets/pfp_19.svg", PubDate: "2024-09-07", Rating: 4, Commentary: "A wonderful surprise!", Topic: "Nature", isLiked: false, likeCount: 3 },
            { id: 20, PersonName: "Mia Carter", Avatar: "src/assets/pfp_20.svg", PubDate: "2024-09-14", Rating: 5, Commentary: "Masterpiece!", Topic: "Art", isLiked: false, likeCount: 2 }
        ],
      sortingType: 'date'
      };
    }, 
    computed: {
    // Total number of pages
    totalPages() {
      return Math.ceil(this.persons.length / this.itemsPerPage);
    },
    // Slice the persons array to return only the persons for the current page
    paginatedPersons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersons.slice(start, end);
    },
    filteredPersons() {
      if (this.sortingType === 'date') {
        return _.orderBy(this.persons, ['PubDate'], ['desc']);
      } else if (this.sortingType === 'likes') {
        return _.orderBy(this.persons, ['likeCount'], ['desc']);
      }
      return this.persons;
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
  /* You can add styles specific to the PersonsList component here */
  </style>
  