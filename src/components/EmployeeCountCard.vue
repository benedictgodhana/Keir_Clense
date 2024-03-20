<template>
    <v-card style="margin: 8px;border-radius: 10px;" variant="outlined" height="200" elevation="3" width="300">
        <v-img src="/employee_11802935.png" height="50" style="margin-top: 10px;" contain></v-img>

      <v-card-title style="font-size: 14px;">Number of Employees</v-card-title>
      <v-card-text>{{ employeeCount }}</v-card-text>

      <v-card-actions>
        <v-btn color="primary" style="background: yellow;width: 100%;text-transform: lowercase;"><v-icon>mdi-link</v-icon>View Employees</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      employeeCount: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  