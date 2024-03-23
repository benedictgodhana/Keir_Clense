<template>
  <div>
    <Navbar></Navbar>
    <v-container>
      <v-carousel cycle :show-arrows="false" hide-delimiter-background style="border-radius: 20px 20px 0 0;" height="500">
        <!-- Carousel items -->
        <v-carousel-item v-for="(item, index) in carouselItems" :key="index" :src="item.image" cover>
          <!-- Overlay text and buttons -->
          <div class="overlay">
            <v-img src="/logo.png" alt="Logo" class="logo mr-2" max-height="60" contain></v-img>
            <span class="headline text-white" style="text-transform: none;">Welcome to Keir Clense</span>
            <p class="subtext text-white"> Where Freshness Meets Flawlessness</p>
            <v-btn large to="/get-involved" class="btn-get-involved" style="text-transform: capitalize;border-radius:20px 0px 20px ;background:yellow;color:black;width:200px" elevation="4">
              <v-icon>mdi-washing-machine-alert</v-icon>Explore!
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
      <v-sheet style="background:yellow;">
        <v-card-text class="text-center">
          <em style="font-size: 18px;color:black;text-transform: lowercase;">Where Freshness Meets Flawlessness</em>
        </v-card-text>
      </v-sheet>
    </v-container>

    <!-- Dialog for booking form -->
   <!-- Dialog for booking form -->
<v-dialog v-model="dialog" max-width="500">
  <v-card style="width:100%;">
    <v-card-title class="headline text-center">Book Service: {{ selectedService }}</v-card-title>       
    <v-card-text>
      <!-- Form fields for selecting date, time, location, and service provider -->
      <v-form ref="form">
        <v-text-field v-model="date" label="Select Date" type="date"   :min="today"></v-text-field>
        <v-text-field v-model="time" label="Select Time" type="time"></v-text-field>
        <v-text-field v-model="location" label="Location" placeholder="Enter Location"></v-text-field>
        <!-- Hidden field for selected service ID -->
        <input type="hidden" v-model="selectedServiceId">
        <!-- Hidden field for user ID -->
        <input type="hidden" v-model="authenticatedUser.id">
        <v-select
  v-model="selectedProvider"
  :items="availableEmployees"
  label="Select Service Provider"
  item-text="text"
  item-value="id"
  :rules="[v => !!v || 'Employee is required']"
></v-select>


        
        <!-- Select the service provider -->
       </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <!-- Buttons for submitting the form and closing the dialog -->
      <v-btn color="primary" @click="submitForm">Submit</v-btn>
      <v-btn color="primary" @click="closeForm">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


    
    <!-- Carousel with interactive elements -->
    <!-- Cards displaying community activities -->
    <v-container>

    <v-alert v-if="bookingSuccess" type="success" outlined dismissible>
      Booking successful!
    </v-alert>
    
      <v-sheet class="about-section">
        <v-card-title class="text-center">Available Cleaning Services</v-card-title>
      </v-sheet>
      <v-carousel cycle hide-controls hide-delimiters interval="6000" style="height: 400px; overflow: hidden;">
        <!-- First cleaning agent card -->
        <v-carousel-item v-for="(service, index) in services" :key="index">
          <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
              <v-card elevation="4" class="pa-4" style="border-radius: 10px;" variant="outlined">
                <v-card-title class="text-center" style="background: yellow;">{{ service.name }}</v-card-title>
                <!-- Image representing the service as an avatar -->
                <v-img src="/WhatsApp Image 2024-03-16 at 13.31.59.jpeg" contain height="200" style="margin-left: 10px; margin-top: 5px;"></v-img>
                <v-card-actions class="justify-center">
                  <!-- Clickable area for the card -->
                  <v-btn text @click="navigateToService(service)" class="mx-auto" style="background: yellow;text-transform: lowercase;width: 100%;" color="black" elevation="4">Book Service</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    
  </div>
</template>
<script>
import axiosInstance from '@/service/api';
import Navbar from '@/components/CustomerNavbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10), // Set today's date in ISO format (YYYY-MM-DD)
      bookingSuccess: false, // Track the success state of the booking
      dialog: false, // Controls the visibility of the dialog
      date: null, // Selected date
      time: null, // Selected time
      location: '', // Selected location
      selectedProvider: null,
      selectedServiceId: null,
      availableEmployees: [],
      services: [], // List of available services
      authToken: null, // Authentication token
      authenticatedUser: null, // Authenticated user data
      carouselItems: [
        { image: '/hands-holding-cleaning-tools-solutions.jpg' },
        { image: '/136167.jpg' },
        { image: '/smiling-positive-housewife-with-dreadlocks-holds-mop.jpg' },
        // Add more carousel items as needed
      ],
    };
  },
  computed: {
  formattedEmployees() {
    return this.availableEmployees.map(employee => ({
      text: employee.name, // Display name of the employee
      value: employee.id, // ID of the employee
    }));
  }
},


  mounted() {
    this.fetchServices(); // Fetch services when the component is mounted
    this.fetchAuthenticationToken(); // Fetch authentication token from local storage
    this.fetchAuthenticatedUser(); // Fetch authenticated user details from local storage
  },
  created() {
    this.authToken = localStorage.getItem('token');
    console.log('Auth token:', this.authToken); // Log the retrieved token for debugging
  },
  methods: {
    async fetchAuthenticationToken() {
      this.authToken = localStorage.getItem('token');
      console.log('Auth token:', this.authToken); // Log the retrieved token for debugging
    },
    fetchAuthenticatedUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.authenticatedUser = user;
      }
    },
    async fetchAvailableEmployees() {
      try {
        const response = await axiosInstance.get(`/services/${this.selectedServiceId}/employees`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });

        if ('employees' in response.data && Array.isArray(response.data.employees)) {
          const employeeData = response.data.employees.map(employee => ({
            value: employee.id,
            text: employee.name,
          }));
          
          this.availableEmployees = employeeData;
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching available employees:', error);
        // Handle error, e.g., show an error message to the user
      }
    },



async submitForm() {
  try {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data and user ID are available
    if (!userData || !userData.id) {
      console.error('User data or user ID not found');
      // Provide feedback to the user that something went wrong
      // For example, display an error message
      return;
    }

    // Construct the date and time string
    const dateTime = `${this.date} ${this.time}`;

    // Extract employee ID from the selectedProvider object
    const employeeId = this.selectedProvider.value;

    // Prepare booking data
    const bookingData = {
      user_id: userData.id, // User ID from local storage
      date_time: dateTime, // Date and time of the booking
      location: this.location, // Location of the booking
      service_id: this.selectedServiceId, // Selected service ID
      employee_id: employeeId, // Extracted employee ID
    };

    // Check if authentication token is available
    if (!this.authToken) {
      console.error('Authentication token not found');
      // Provide feedback to the user that they need to log in
      // For example, redirect to the login page
      return;
    }

    // Set request headers with the authentication token
    const headers = { Authorization: `Bearer ${this.authToken}` };

    // Send a POST request to create the booking
    const response = await axiosInstance.post('/bookings', bookingData, { headers });

    // Log booking response for debugging
    console.log('Booking response:', response.data);

    // Update booking success state to show success message
    this.bookingSuccess = true; 

    // Hide the success message after a certain delay
    setTimeout(this.hideSuccessMessage, 4000);

    // Close the booking form dialog
    this.closeForm();
  } catch (error) {
    console.error('Error booking service:', error);
    // Provide feedback to the user that there was an error in booking the service
    // For example, display an error message to the user
  }
},
    hideSuccessMessage() {
      this.bookingSuccess = false;
    },
    closeForm() {
      this.dialog = false;
    },
    navigateToService(service) {
  this.selectedServiceId = service.id; // Update to set the selected service ID
  this.selectedService = service.name;
  this.fetchAvailableEmployees(); // Fetch available employees for the selected service
  this.dialog = true;
},


    fetchServices() {
      axiosInstance.get('/services')
        .then(response => {
          this.services = response.data;
        })
        .catch(error => {
          console.error('Error fetching services:', error);
          // Handle error, e.g., show an error message to the user
        });
    },
    checkAuthentication() {
      // Check authentication status
      // Update isAuthenticated accordingly
      this.isAuthenticated = true;
    },
  },
};
</script><style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: capitalize;
}
.overlay .headline {
  font-size: 24px;
}
.overlay .subtext {
  margin-top: 10px;
  font-size: 16px;
}
.btn-get-involved {
  margin: 14px;
  border-radius: 20px;
  text-transform: lowercase;
}
.activity-card {
  margin-bottom: 20px;
  border-radius: 10px;
}
.activity-card .v-card-title {
  font-size: 18px;
  font-weight: bold;
}
.activity-card .v-card-text {
  font-size: 16px;
}
.about-section {
  padding: 20px;
  margin-top: 30px;
  border-radius: 10px;
}
.v-carousel__item img {
  border-radius: 10px;
}
.image {
  border-radius: 10px; /* Rounded corners */
  object-fit: cover; /* Ensure the image covers the entire space */
}
</style>
