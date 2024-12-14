<template>
  <div class="statistics-page">
    <div class="statistics__container">
      <h2>Post Statistics</h2>

      <!-- Date Range Picker -->
      <div class="date-picker">
        <label for="date-range">Select Date Range:</label>
        <div class="date-picker__inputs">
          <input
            id="date-range"
            type="text"
            ref="dateRangePicker"
            class="date-input"
            placeholder="Select date range"
          />
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
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '~/plugins/firebase';
import { format } from 'date-fns';

const startDate = ref('');
const endDate = ref('');
const chartData = ref([]);
const dateRangePicker = ref(null);

const userStore = useUserStore();
const user = userStore.user;

const fetchStatistics = async () => {
  if (!startDate.value || !endDate.value) {
    alert('Please select a valid date range.');
    return;
  }

  console.log('Fetching statistics for:', startDate.value, endDate.value);

  const q = query(collection(db, 'posts'), where('userId', '==', user.id));
  const snapshot = await getDocs(q);

  const data = {};
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  console.log('Start Date:', start, 'End Date:', end);

  snapshot.forEach((doc) => {
    const post = doc.data();

    // Normalize all dates to the YYYY-MM-DD format
    const postDate = new Date(post.PubDate).toISOString().split('T')[0];

    if (postDate >= startDate.value && postDate <= endDate.value) {
      if (!data[postDate]) data[postDate] = 0;
      data[postDate] += 1; // Increment count for the normalized date
    }
  });

  // Sort data by date
  const sortedData = Object.keys(data)
    .sort()
    .map((date) => ({ x: date, y: data[date] }));

  chartData.value = sortedData;
  console.log('Chart Data:', chartData.value);
};


// Initialize flatpickr
onMounted(() => {
  flatpickr(dateRangePicker.value, {
    mode: 'range',
    dateFormat: 'Y-m-d',
    onChange: (selectedDates) => {
      if (selectedDates.length === 2) {
        startDate.value = selectedDates[0].toISOString().split('T')[0];
        endDate.value = selectedDates[1].toISOString().split('T')[0];
      }
    },
  });
});


</script>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background-image: url(/assets/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  flex-direction: column;
  padding: 24px 0;
}

.statistics__container {
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
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.date-picker__inputs {
  display: flex;
  flex-direction: row;
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

.date-picker__inputs {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.date-input {
  width: 100%; /* Full width for input */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
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


@media (max-width: 768px) {
  .statistics-page {
    padding-top: 16px; /* Reduce padding on smaller screens */
    padding-bottom: 96px;
  }

  .statistics__container {
    width: 90%; /* Full width for mobile */
    padding: 16px; /* Reduce padding */
    margin: 0 auto;
  }

  h2 {
    font-size: 1.5rem; 
    margin-bottom: 16px; 
  }

  .date-picker {
    gap: 4px; 
    margin-bottom: 24px; 
  }

  .date-picker__inputs {
    width: 80%;
    flex-direction: column; 
    gap: 8px; 
  }

  .date-input {
    text-align: center;
    width: 100%; 
    font-size: 0.85rem; 
  }

  .btn-fetch {
    width: 100%; 
    font-size: 0.85rem; 
  }

  .chart-container {
    margin-top: 24px; 
  }

  .no-data-message {
    font-size: 0.9rem; 
    margin-top: 12px; 
  }
}

</style>
