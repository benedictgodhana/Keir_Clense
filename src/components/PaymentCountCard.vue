<template>
    <v-card variant="outlined" height="200" elevation="3" style="margin: 8px;border-radius: 10px;" width="300">
      <!-- Image -->
      <v-img src="/money-bills-simple_9798334.png" style="margin-top: 10px;" height="50" contain></v-img>
  
      <!-- Title -->
      <v-card-title style="font-size: 14px;">Number of Payments</v-card-title>
  
      <!-- Count -->
      <v-card-text><span>ksh.</span> {{ paymentCount }}</v-card-text>
  
      <!-- Button -->
      <v-card-actions>
        <v-btn color="primary" to="/admin/manage-payments" style="background: yellow;width: 100%;text-transform: lowercase;">View Payments</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      paymentCount: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  