<template>
        <Navbar></Navbar>

    <div>
        <v-container>
            <v-card>
                <v-data-table
        :headers="headers"
        :items="bookingHistory"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <!-- Add any actions you want to perform on each booking, e.g., view details -->
          <v-icon @click="viewBookingDetails(item)">mdi-eye</v-icon>
        </template>
      </v-data-table>
            </v-card>
           
        </v-container>
    
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/service/api'; // Import your Axios instance
  import Navbar from '@/components/CustomerNavbar.vue';

  
  export default {
    components: {
    Navbar,
  },
    data() {
      return {
        bookingHistory: [],
        headers: [
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time' },
          { text: 'Location', value: 'location' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        search: '', // For searching/filtering bookings
      };
    },
    created() {
      this.fetchBookingHistory();
    },
    methods: {
      async fetchBookingHistory() {
        try {
          // Make an API request to fetch the user's booking history
          const response = await axiosInstance.get('/user/bookings');
  
          // Assuming the response contains an array of booking objects
          this.bookingHistory = response.data;
        } catch (error) {
          console.error('Error fetching booking history:', error);
          // Handle error, e.g., show an error message to the user
        }
      },
      viewBookingDetails(booking) {
        // Implement functionality to view details of a specific booking
        console.log('View details of booking:', booking);
      },
    },
  };
  </script>
  