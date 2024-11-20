<template>
  <div class="statistics-page">
    <Sidebar @categorySelected="updateSelectedCategory" />

    <div class="statistics__container">
      <h2>Post Statistics</h2>

      <!-- Date Range Picker -->
      <div class="date-picker">
        <label for="date-range">Select Date Range:</label>
        <div class="date-picker__inputs">
          <input type="date" v-model="startDate" class="date-input" /> 
          <span>to</span>
          <input type="date" v-model="endDate" class="date-input" />
          <button @click="fetchStatistics" class="btn-fetch">Show Statistics</button>
        </div>
      </div>

      <!-- Bar Chart -->
      <div v-if="chartData.length" class="chart-container">
        <h3>Posts per Day</h3>
        <BarChart :data="chartData" />
      </div>

      <p v-else class="no-data-message">No data available for the selected range.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BarChart from '~/components/BarChart.vue';
import Sidebar from '~/components/Sidebar.vue';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '~/plugins/firebase';
import { format } from 'date-fns';

const startDate = ref('');
const endDate = ref('');
const chartData = ref([]);

const userStore = useUserStore();
const user = userStore.user;

const fetchStatistics = async () => {
  const q = query(collection(db, 'posts'), where('userId', '==', user.id));
  const snapshot = await getDocs(q);

  const data = {};
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  snapshot.forEach((doc) => {
    const post = doc.data();
    const postDate = new Date(post.PubDate);

    if (postDate >= start && postDate <= end) {
      const dateStr = format(postDate, 'd MMMM y'); // Group posts by formatted date
      if (!data[dateStr]) data[dateStr] = 0;
      data[dateStr] += 1; // Increment the count for posts published on this date
    }
  });

  chartData.value = Object.keys(data).map((date) => ({ x: date, y: data[date] }));
};

</script>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background-image: url(/assets/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

.statistics__container {
  flex: 1;
  padding: 32px;
  margin: auto;
  width: 80%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 24px;
}

.date-picker {
  margin-bottom: 32px;
}

.date-picker__inputs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-fetch {
  padding: 8px 16px;
  background-color: #5bb9cd;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.chart-container {
  margin-top: 32px;
  text-align: center;
}

.no-data-message {
  text-align: center;
  color: #666;
  margin-top: 16px;
  font-size: 1rem;
}
</style>
