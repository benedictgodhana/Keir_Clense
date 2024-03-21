<template>
    <v-app-bar app height="90" style="background: white; color: black;">
      <!-- Logo -->
      <v-header>
        <img src="/WhatsApp Image 2024-03-16 at 13.31.59.jpeg" alt="Logo" height="90" style="margin-top: 10px;margin-left: 20px;">
      </v-header>
  
     
      <!-- Profile and logout buttons -->
      <v-btn style="margin-left: auto; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text to="/welcomepage">
        <v-icon size="16" color="success">mdi-home</v-icon> Home
      </v-btn>
      <v-btn style="margin-left: 10px; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text @click="navigateToProfile">
        <v-icon size="16" color="success">mdi-account-circle</v-icon> Profile
      </v-btn>
      
      <v-btn style="margin-left: 10px; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text @click="navigateToNotifications">
        <v-icon size="16" color="orange">mdi-bell</v-icon> Notifications
      </v-btn>
      <v-btn style="margin-left: 10px; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text to="/my-bookings">
        <v-icon size="16" color="orange">mdi-calendar</v-icon> My Bookings
      </v-btn>
      
      <v-btn style="margin-left: 10px; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text @click="logout">
        <v-icon size="16" color="primary">mdi-logout</v-icon> Logout
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  import axiosInstance from '@/service/api'; // Import Axios instance
  
  export default {
    methods: {
      navigateToProfile() {
        // Define navigation logic to the profile page
      },
      async logout() {
        try {
          // Get the authentication token from localStorage
          const authToken = localStorage.getItem('token');
  
          // Make a POST request to the logout endpoint
          await axiosInstance.post('/logout', null, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          // Clear authentication tokens or user session
          localStorage.removeItem('token');
          localStorage.removeItem('userData'); // Clear any other user-related data
  
          // Redirect the user to the login page
          this.$router.push('/'); // Assuming '/login' is the login page route
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    }
  };
  </script>
  