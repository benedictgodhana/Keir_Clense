<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card style="width:100%;">
        <v-card-title class="headline text-center">Book Service: {{ selectedService }}</v-card-title>       
        <v-card-text>
          <!-- Form fields for selecting date, time, location, and service provider -->
          <v-form ref="form">
            <v-text-field v-model="date" label="Select Date" type="date"></v-text-field>
            <v-text-field v-model="time" label="Select Time" type="time"></v-text-field>
            <v-text-field v-model="location" label="Location" placeholder="Enter Location"></v-text-field>
            <v-select v-model="selectedProvider" :items="providers" label="Select Service Provider"></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <!-- Buttons for submitting the form and closing the dialog -->
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <v-btn color="primary" @click="closeForm">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      selectedService: String, // Define prop to receive the selected service
    },
    data() {
      return {
        dialog: true, // Controls the visibility of the dialog
        date: null, // Selected date
        time: null, // Selected time
        location: '', // Selected location
        selectedProvider: null, // Selected service provider
        providers: ['Provider 1', 'Provider 2', 'Provider 3'], // List of service providers
      };
    },
    methods: {
      submitForm() {
        // Submit form logic
        // Here you can handle form submission, e.g., send data to backend, etc.
        // After submitting the form, close the dialog
        this.closeForm();
      },
      closeForm() {
        // Close the dialog by emitting a 'close' event
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add scoped styles for the component */
  </style>
  