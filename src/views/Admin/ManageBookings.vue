<template>
    <v-container>
      <!-- Navigation bar -->
      <AdminNavbar></AdminNavbar>
  
      <!-- Sidebar -->
      <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />
  
      <!-- Search form -->
  
    
    
      <!-- Vuetify datatable to display user details -->
      <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
       

        <v-card-title style="background: yellow;">Bookings Table</v-card-title>
        <v-card-text style="margin-top: 20px;">
          <v-text-field v-model="search" label="Search" variant="outlined"></v-text-field>
          <v-btn @click="clearSearch" color="success" style="border-radius: 5px;text-transform: capitalize;" class="mr-4"><span class="mdi mdi-backspace-reverse"></span>Clear</v-btn>
          <v-btn @click="openAddUserDialog" color="primary" style="border-radius: 5px;text-transform: capitalize;"><span class="mdi"></span>Add Booking</v-btn>
        </v-card-text>
        <v-card-text style="margin-top: 20px;">
          <v-data-table
            :headers="headers"
            :items="filteredBookings"
            item-key="id"
            style="text-transform:none; width: 100%;"
          >
            <template v-slot:item.action="{ item }">
              <v-btn color="primary" class="mr-4" @click="openEditDialog(item)" style="text-transform:capitalize;"><span class="mdi mdi-pencil"></span>Edit</v-btn>
              <v-btn color="error" @click="deleteUserDialog(item)"  style="text-transform:capitalize;"><span class="mdi mdi-delete"></span>Delete</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
  
   

  
    



      <!-- Success Alert -->
      
    </v-container>
  </template>
 <script>
 import AdminSidebar from '@/components/AdminSidebar.vue';
 import AdminNavbar from '@/components/AdminNavbar.vue';
 import axiosInstance from '@/service/api'; // Corrected import path
 
 export default {
   components: {
     AdminSidebar,
     AdminNavbar,
   },
   data() {
     return {
       sidebar: true, // Initialize the sidebar as open
       bookings: [], // Initialize an empty array for booking details
       roles: [], // Initialize an empty array for role options
       search: '', // Initialize search string
       headers: [
         { title: 'Customer Name', value: 'customerName' },
         { title: 'Employee Booked', value: 'employeeName' },
         { title: 'Service Name', value: 'serviceName' },
         { title: 'Location', value: 'location' },
         { title: 'Status', value: 'status' },
         { title: 'Action', value: 'action' },
         // Add more headers as needed
       ],
       
       showConfirmPassword: false,
       updateSuccessAlertVisible: false, // Whether update success alert is visible
       addSuccessSnackbarVisible: false, // Whether add success snackbar is visible
     };
   },
   created() {
     // Fetch booking details from the backend when the component is created
     this.fetchBookings();

     // Fetch role options from the backend
   },
   computed: {
     filteredBookings() {
       // Filter bookings based on search string
       return this.bookings.filter(booking =>
         booking.customerName.toLowerCase().includes(this.search.toLowerCase())
       );
     },
   },
   methods: {
    
    async fetchBookings() {
  try {
    const response = await axiosInstance.get('/fetchbookings');
    console.log('API Response:', response.data); // Log the response data
    if (Array.isArray(response.data)) {
      // Map the bookings array to include the necessary booking details
      const bookingsPromises = response.data.map(async booking => {
        // Fetch employee's name based on employee_id
        // You need to fetch the employeeName or adjust this line as per your data structure

        return {
          customerName: booking.customerName, // Assuming booking has a customerName field
          employeeName: booking.employeeName, // Use the fetched employee's name
          serviceName: booking.serviceName, // Assuming booking has a serviceName field
          status: booking.status,
          location: booking.location,
          action: 'View Details', // Assuming you want a link/button to view details
          // Add more properties as needed
        };
      });
      // Wait for all promises to resolve
      this.bookings = await Promise.all(bookingsPromises);
    } else {
      console.error('Unexpected API response format: bookings array not found');
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
},

     clearSearch() {
       // Method to clear the search string
       this.search = '';
     },
     // Other methods...
   },
 };
</script>

  <style scoped>
  .search-card {
    margin-top: 20px;
    width: 100%;
  }
  </style>
  