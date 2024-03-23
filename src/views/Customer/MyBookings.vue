<template>
  <div>
    <Navbar></Navbar>

    <!-- Existing template code -->
    <v-container>

      <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
       

       <v-card-title style="background: yellow;">My Bookings</v-card-title>
       <v-card-text style="margin-top: 20px;">
         <v-text-field v-model="search" label="Search" variant="outlined"></v-text-field>
       </v-card-text>
       <v-card-text style="margin-top: -10px;">
         <v-data-table
           :headers="headers"
           :items="bookingHistory"
           :search="search"
           style="text-transform:none; width: 100%;"
         >
           <template v-slot:item.action="{ item }">
             <v-btn color="" elevation="0"  @click="openEditDialog(item)" style="text-transform:capitalize;"><span style="color:green" class="mdi mdi-pencil"></span></v-btn>
             <v-btn color=""  elevation="0"  style="text-transform: capitalize;" @click="viewBookingDetails(item)"><v-icon>mdi-eye</v-icon></v-btn>        
               </template>
         </v-data-table>
       </v-card-text>
     </v-card>
     
    </v-container>

    <!-- Dialog for displaying booking details -->
    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card>
        <v-card-title>Booking Details</v-card-title>
        <v-card-text>
          <!-- Display booking details here -->
          <div v-if="selectedBooking">
            <p><strong>Employee Booked:</strong> {{ selectedBooking.employee_name }}</p>
            <p><strong>Service Booked:</strong> {{ selectedBooking.service_name }}</p>
            <p><strong>Date:</strong> {{ selectedBooking.date_time }}</p>
            <p><strong>Location:</strong> {{ selectedBooking.location }}</p>
            <!-- Add more details as needed -->
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// Import necessary modules
import axiosInstance from '@/service/api'; // Import your axios instance
import Navbar from '@/components/CustomerNavbar.vue';

export default {
  components: {
    Navbar,
  },
  // Existing component code
  data() {
    return {
      // Define headers for v-data-table
      headers: [
        { title: 'Employee Booked', value: 'employee_name' },
        { title: 'Service booked', value: 'service_name' },
        { title: 'Service Price', value: 'service_price' },
        { title: 'Date', value: 'date_time' },
        { title: 'Location', value: 'location' },
        { title: 'Status', value: 'status' },
        { title: 'Action', value: 'action' },
        // Add more headers as needed
      ],
      bookingHistory: [], // Initialize empty array for booking history
      search: '', // Search query for v-data-table
      dialogVisible: false, // Boolean to control dialog visibility
      selectedBooking: null, // Store selected booking details
    };
  },

  // Fetch booking history when component is mounted
  mounted() {
    this.fetchBookingHistory();
  },

  methods: {
    // Method to fetch user booking history
    async fetchBookingHistory() {
      try {
        // Retrieve authentication token from local storage
        const authToken = localStorage.getItem('token');
        
        // Make sure authToken is available
        if (!authToken) {
          console.error('Authentication token not found');
          // Handle this case, e.g., redirect to login page
          return;
        }
        
        // Make API call to fetch booking history using authToken
        const response = await axiosInstance.get('/bookings/history', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        // Update bookingHistory with fetched data
        this.bookingHistory = response.data;
      } catch (error) {
        console.error('Error fetching booking history:', error);
        // Handle error, e.g., show an error message to the user
      }
    },

    // Method to view details of a specific booking
    viewBookingDetails(booking) {
      // Set the selected booking details and open the dialog
      this.selectedBooking = booking;
      this.dialogVisible = true;
    },
  },
};
</script>
