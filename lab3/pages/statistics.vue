<template>
    <div class="statistics-page">
      <h2>Post Statistics</h2>
  
      <!-- Date Range Picker -->
      <label for="date-range">Select Date Range:</label>
      <input type="date" v-model="startDate" /> to <input type="date" v-model="endDate" />
      <button @click="fetchStatistics">Show Statistics</button>
  
      <!-- Bar Chart -->
      <div v-if="chartData.length">
        <h3>Likes per Day</h3>
        <BarChart :data="chartData" />
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import BarChart from '~/components/BarChart.vue';
  const userStore = useUserStore();
  const user = userStore.user;
  const startDate = ref('');
  const endDate = ref('');
  const chartData = ref([]);
  
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '~/plugins/firebase';
  import { format } from "date-fns";


const fetchStatistics = async () => {
  const q = query(
    collection(db, 'posts'),
    where('userId', '==', user.id)
  );

  const snapshot = await getDocs(q);
  const data = {};

  // Parse selected date range as Date objects
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  console.log(start, end);
  console.log("Docs found for date range:", snapshot.docs);

  // Filter documents based on the PubDate string
  snapshot.forEach((doc) => {
    const post = doc.data();
    const postDate = new Date(post.PubDate);

    // Check if postDate falls within the selected range
    if (postDate >= start && postDate <= end) {
      const dateStr = format(new Date(post.PubDate), "d MMMM y");
      if (!data[dateStr]) data[dateStr] = 0;
      data[dateStr] += post.likeCount;
    }
  });

  // Convert the data object to an array for charting
  chartData.value = Object.keys(data).map((date) => ({ x: date, y: data[date] }));

  // Log posts found for debugging
  console.log("Posts found for date range:", chartData.value);
};


  </script>
  
  <style scoped>
  .statistics-page {
    padding: 20px;
  }
  </style>
  