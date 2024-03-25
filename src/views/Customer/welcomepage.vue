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
            <v-btn large to="" class="btn-get-involved" style="text-transform: capitalize;border-radius:20px 0px 20px ;background:yellow;color:black;width:200px" elevation="4">
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


    <v-dialog v-model="dialog" max-width="600">
  <v-card style="width:100%;">
    <v-card-title class="headline text-center">Book Service: {{ selectedService }}</v-card-title>   
   
    
    <v-card-text>
      <!-- Form fields for selecting date, time, location, and service provider -->
      <v-form ref="form">
        <v-alert v-if="bookingError" type="error" outlined dismissible>
     The employee Selected is already booked at this time. Please select another time.
</v-alert>
    
        <v-text-field v-model="date" label="Select Date" type="date" :min="today"></v-text-field>
        <v-text-field v-model="time" label="Select Time" type="time"></v-text-field>
       
        <v-text-field v-model="location" label="Location" placeholder="Enter Location"></v-text-field>
        <v-text-field v-model="contact" label="Contact Details" placeholder="Enter your contact details"></v-text-field>
        <!-- Hidden field for selected service ID -->
        <input type="hidden" v-model="selectedServiceId">
        <!-- Hidden field for user ID -->
        <input type="hidden" v-model="authenticatedUser.id">
        <v-container></v-container>
        <!-- Display service providers as cards -->
        <v-row>
          <v-col v-for="(provider, index) in availableEmployees" :key="index" cols="12" md="6">
            <v-card 
              @click="selectProvider(provider)" 
              class="pa-4 cursor-pointer" 
              elevation="4" 
              style="border-radius: 10px;width:100%;" 
              variant="outlined"
            >
              <!-- Add icon directly -->
              <v-icon 
                size="22" 
                style="margin-left: 10px;"
              >
                {{ provider === selectedProvider ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-blank-circle-outline' }}
              </v-icon>
              <v-icon color="green">mdi-account</v-icon>
              <v-card-title color="black" style="font-size: 16px;">{{ provider.name }}</v-card-title>
              <!-- Provider details here, e.g., icon and name -->
            </v-card>
          </v-col>
        </v-row>
        <!-- Select the service provider -->
        
        <!-- Method of Payment -->
      <!-- Method of Payment -->
<v-radio-group v-model="paymentMethod" row>
  <v-radio
    v-for="method in paymentMethods"
    :key="method.value"
    :label="method.name"
    :value="method.value"
  >
    <template v-slot:prepend>
      <img :src="method.image" alt="" height="30px">
    </template>
  </v-radio>
</v-radio-group>

      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <!-- Buttons for submitting the form and closing the dialog -->
      <v-btn
  color="white"
  style="background: green;border-radius: 10px;"
  elevation="4"
  @click="submitForm"
  :disabled="submitting" 
>
  <template v-if="submitting">
    <v-progress-circular
      indeterminate
      color="white"
      size="24"
      width="2"
    ></v-progress-circular> 
  </template>
  <template v-else>
    Submit
  </template>
</v-btn>

      <v-btn color="white" style="background: red;border-radius: 10px;" elevation="4" @click="closeForm">Close</v-btn>
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
      bookingError: null,

      contact: '', // New contact field
    paymentMethod: null, // New selected payment method
    submitting: false, // Boolean to track the submitting state
  
      today: new Date().toISOString().substr(0, 10), // Set today's date in ISO format (YYYY-MM-DD)
      bookingSuccess: false, // Track the success state of the booking
      dialog: false, // Controls the visibility of the dialog
      date: null, // Selected date
      time: null, // Selected time
      location: '', // Selected location
      selectedProvider: {},
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
      paymentMethods: [
  { name: 'M-Pesa', value: 'mpesa', image: '/images.png' },
  { name: 'Cash', value: 'cash' },
  { name: 'Bank Transfer', value: 'bank_transfer' }
],


    };
  },
  computed: {
  formattedEmployees() {
    return this.availableEmployees.map(employee => ({
      text: employee.name, // Assuming 'name' is the correct property
      value: employee.id, // Assuming 'id' is the correct property
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
    selectProvider(provider) {
    this.selectedProvider = provider;
  },
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
        id: employee.id,
        name: employee.name,
        // Add any additional fields you want to retrieve and use in your cards
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
    this.submitting = true;

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data and user ID are available
    if (!userData || !userData.id) {
      console.error('User data or user ID not found');
      return;
    }

    // Construct the date and time string
    const dateTime = `${this.date} ${this.time}`;

    // Extract employee ID from the selectedProvider object
    const employeeId = this.selectedProvider.value;

    // Prepare booking data
    const bookingData = {
      user_id: userData.id,
      date_time: dateTime,
      location: this.location,
      service_id: this.selectedServiceId,
      employee_id: this.selectedProvider.id,
      contact: this.contact,
      payment_method: this.paymentMethod,
    };

    // Check if authentication token is available
    if (!this.authToken) {
      console.error('Authentication token not found');
      return;
    }

    // Set request headers with the authentication token
    const headers = { Authorization: `Bearer ${this.authToken}` };

    // Send a POST request to create the booking
    const response = await axiosInstance.post('/bookings', bookingData, { headers });

    // If employee is already booked, display an error message
    if (response.data.error) {
      this.bookingError = response.data.error;
      this.dialog = false; // Close the dialog if there's an error
      setTimeout(() => {
        this.bookingError = null; // Hide the error message after 3 seconds
      }, 3000);
    } else {
      console.log('Booking response:', response.data);
      this.bookingSuccess = true;
      setTimeout(this.hideSuccessMessage, 4000);
      this.closeForm();
    }
  } catch (error) {
    console.error('Error booking service:', error);
    this.bookingError = 'An error occurred while booking the service. Please try again later.';
    setTimeout(() => {
      this.bookingError = null; // Hide the error message after 3 seconds
    }, 3000);
  } finally {
    this.submitting = false;
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
.selected-card {
  background-color: red;
  border-width: 2px;
}

</style>
