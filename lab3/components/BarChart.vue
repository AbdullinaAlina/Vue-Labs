<template>
    <div class="chart-container">
      <Bar :data="chartData" :options="options" />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { Bar, Chart } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
  });
  

  import { format, compareAsc } from 'date-fns';

  const chartData = computed(() => {
  const sortedData = [...props.data].sort((a, b) =>
    new Date(a.x) - new Date(b.x) // Sort by date
  );

  return {
    labels: sortedData.map((entry) =>
      format(new Date(entry.x), 'd MMMM') // Convert to desired format
    ),
    datasets: [
      {
        label: 'Number of Posts',
        backgroundColor: '#5bb9cd',
        data: sortedData.map((entry) => entry.y),
      },
    ],
  };
});



  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Total Posts' },
        beginAtZero: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    height: 400px;
    width: 100%;
  }
  </style>
  