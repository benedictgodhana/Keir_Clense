<template>
    <v-navigation-drawer v-model="sidebar" app class="sidebar-drawer" style="background-color:white;">
      <v-list>
        <v-list-item-group>
          <!-- Dashboard -->
          <v-btn to="/admin" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-view-dashboard</v-icon>
            <span style="text-transform: capitalize;">Dashboard</span>
          </v-btn>
  
          <!-- Manage Users -->
          <v-btn to="/admin/manage-users" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-account-group</v-icon>
            <span style="text-transform: capitalize;">Manage Users</span>
          </v-btn>
          <v-btn to="/admin/manage-employees" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-account-group</v-icon>
            <span style="text-transform: capitalize;">Manage Employees</span>
          </v-btn>
  
          <!-- Manage Services -->
          <v-btn to="/admin/manage-services" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-briefcase</v-icon>
            <span style="text-transform: capitalize;">Manage Services</span>
          </v-btn>
  
          <!-- Manage Bookings -->
          <v-btn to="/admin/manage-bookings" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-calendar-clock</v-icon>
            <span style="text-transform: capitalize;">Manage Bookings</span>
          </v-btn>
  
          <!-- Manage Reviews -->
          <v-btn to="/admin/manage-reviews" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-star</v-icon>
            <span style="text-transform: capitalize;">Manage Reviews</span>
          </v-btn>
  
          <!-- Manage Payments -->
          <v-btn to="/admin/manage-payments" class="sidebar-button" elevation="0" active-class="active-button">
            <v-icon size="16" style="padding-right: 10px;">mdi-currency-usd</v-icon>
            <span style="text-transform: capitalize;">Manage Payments</span>
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebar: true, // Set sidebar to be open by default
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar-button {
    text-align: left;
    font-weight: 500;
    font-family: 'Poppins';
  }
  
  .active-button {
    color: blue; /* Customize active button color */
  }
  </style>
  