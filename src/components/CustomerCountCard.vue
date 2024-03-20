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
  export default {
    props: {
      customerCount: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  