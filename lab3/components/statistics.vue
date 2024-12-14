<template>
    <div class="statistics-page">
      <h2>Post Statistics</h2>
  
      <label for="date-range">Select Date Range:</label>
      <input type="date" v-model="startDate" /> to <input type="date" v-model="endDate" />
      <button @click="fetchStatistics">Show Statistics</button>
  
      <div v-if="chartData.length">
        <h3>Likes per Day</h3>
        <BarChart :data="chartData" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BarChart from './BarChart.vue'; 
  const userStore = useUserStore();
  const user = userStore.user;
  const startDate = ref('');
  const endDate = ref('');
  const chartData = ref([]);
  
  import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '~/plugins/firebase';

const fetchStatistics = async () => {
  const q = query(
    collection(db, 'posts'),
    where('userId', '==', user.id)
  );

  const snapshot = await getDocs(q);
  const data = {};

  const start = new Date(`${startDate.value}T00:00:00`); 
  const end = new Date(`${endDate.value}T23:59:59`);     

  console.log(start, end);
  console.log("Docs found for date range:", snapshot.docs);

  snapshot.forEach((doc) => {
    const post = doc.data();
    const postDate = new Date(post.PubDate);

    if (postDate >= start && postDate <= end) {
      const dateStr = new Date(post.PubDate).toISOString().split('T')[0]; 
      if (!data[dateStr]) data[dateStr] = 0;
      data[dateStr] += post.likeCount;
    }
  });

  chartData.value = Object.keys(data).map((date) => ({ x: date, y: data[date] }));

  console.log("Posts found for date range:", chartData.value);
};


  </script>
  
  <style scoped>
  .statistics-page {
    padding: 20px;
  }
  </style>
  