<template>
    <v-app-bar app height="90" style="background:white; color: black;">
      <!-- Logo -->
      <v-header>
        <img src="/WhatsApp Image 2024-03-16 at 13.31.59.jpeg" alt="Logo" height="90" style="margin-top: 10px;">
      </v-header>
  
      <!-- Profile and logout buttons -->
      <v-btn style="margin-left: auto; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text @click="navigateToProfile">
        <v-icon size="16">mdi-account-circle</v-icon> Profile
      </v-btn>
      <v-btn style="margin-left: 10px; font-weight: 500; font-family: 'poppins'; text-transform: lowercase;" text @click="logout">
        <v-icon size="16">mdi-logout</v-icon> Logout
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToProfile() {
        // Define navigation logic to the profile page
      },
      logout() {
        // Define logout logic
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles for the component */
  </style>
  