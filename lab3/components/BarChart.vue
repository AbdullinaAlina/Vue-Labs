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
  
  const chartData = computed(() => ({
    labels: props.data.map((entry) => entry.x),
    datasets: [
      {
        label: 'Likes',
        backgroundColor: '#5bb9cd',
        data: props.data.map((entry) => entry.y),
      },
    ],
  }));
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Total Likes' },
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
  