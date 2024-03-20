<template>
    <div>
      <Navbar></Navbar>
      <v-container>
        <EmployeeSidebar :bookings="bookings" />
        <!-- Add the Vuetify data table here -->
        <v-data-table
          :headers="headers"
          :items="bookings"
          :search="search"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.date }}</td>
            <td>{{ props.item.time }}</td>
            <td>{{ props.item.location }}</td>
            <!-- Add more columns for additional booking details -->
          </template>
        </v-data-table>
      </v-container>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/service/api';
  import Navbar from '@/components/AdminNavbar.vue';
  import EmployeeSidebar from '@/components/EmployeeSidebar.vue';
  
  export default {
    components: {
      Navbar,
      EmployeeSidebar
    },
    data() {
      return {
        bookings: [] // Initialize an empty array to store the fetched bookings
      };
    },
    mounted() {
      this.fetchBookings(); // Fetch bookings when the component is mounted
    },
    methods: {
      async fetchBookings() {
        try {
          // Get the token from local storage
          const token = localStorage.getItem('token');
  
          // Make a GET request to fetch the bookings assigned to the logged-in employee
          const response = await axiosInstance.get('/bookings/employee', {
            headers: {
              Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
          });
  
          // Update the bookings data with the response data
          this.bookings = response.data;
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add custom styles as needed */
  </style>
  