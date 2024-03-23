<template>
    <v-card variant="outlined" height="200" elevation="3" style="margin: 8px;border-radius: 10px;" width="300">
      <!-- Image -->
      <v-img src="/target_1605401.png" height="40" style="margin-top: 10px;" contain></v-img>
  
      <!-- Title -->
      <v-card-title style="font-size: 14px;">Number of Customers</v-card-title>
  
      <!-- Count -->
      <v-card-text>{{ customerCount }}</v-card-text>
  
      <!-- Button -->
      <v-card-actions>
        <v-btn color="primary" style="background: yellow;width: 100%;text-transform: lowercase;"><v-icon>mdi-link</v-icon>View Customers</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
// Import your Axios instance
import axiosInstance from '../service/api'; // Import the Axios instance

export default {
  data() {
    return {
      customerCount: 0 // Initialize employee count
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        // Use axiosInstance instead of axios
        const response = await axiosInstance.get('/customers/count');
        // Make sure to adjust the response according to your backend setup
        this.customerCount = response.data.customer_count; // Assign count to employeeCount
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
  }
};
</script>
  