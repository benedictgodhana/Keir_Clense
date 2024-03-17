<template>
    <v-card style="margin: 8px;border-radius: 10px;" variant="outlined" elevation="3" width="300">
      <v-img src="/path/to/your/image.jpg" height="50" contain></v-img>
      <v-card-title>Number of Services</v-card-title>
      <v-card-text>{{ serviceCount }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" style="background: yellow;width: 100%;text-transform: lowercase;"><v-icon>mdi-link</v-icon>View Services</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import axiosInstance from '../service/api'; // Import the Axios instance
  
  export default {
    data() {
      return {
        serviceCount: 0 // Initialize service count
      };
    },
    mounted() {
      this.fetchServiceCount(); // Fetch service count when the component is mounted
    },
    methods: {
      fetchServiceCount() {
        axiosInstance.get('/services/count')
          .then(response => {
            this.serviceCount = response.data.count; // Update service count with the response data
          })
          .catch(error => {
            console.error('Error fetching service count:', error);
          });
      }
    }
  };
  </script>
  