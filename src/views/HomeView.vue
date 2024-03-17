<template>
  <div>
<Navbar></Navbar>
<v-container>
  <v-carousel cycle :show-arrows="false" hide-delimiter-background style="border-radius:  20px 20px 0 0;" height="500">
      <!-- Carousel items -->
      <v-carousel-item v-for="(item, index) in carouselItems" :key="index" :src="item.image" cover>
        <!-- Overlay text and buttons -->
        <div class="overlay">
          <v-img src="/logo.png" alt="Logo" class="logo mr-2" max-height="60" contain></v-img>

          <span class="headline text-white" style="text-transform: none;">Welcome to Keir Clense</span>
          <p class="subtext text-white"> Where Freshness Meets Flawlessness</p>
          <v-btn  large to="/get-involved" class="btn-get-involved" style="text-transform: capitalize;border-radius:20px 0px 20px ;background:yellow;color:black;width:200px" elevation="4"><v-icon>mdi-washing-machine-alert</v-icon>Explore!</v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-sheet style="background:yellow;">
      <v-card-text class="text-center">
        <em style="font-size: 18px;color:black;text-transform: lowercase;">Where Freshness Meets Flawlessness</em>
      </v-card-text>
    </v-sheet>
</v-container>

   <!-- Carousel with interactive elements -->
   

    <!-- Cards displaying community activities -->
    <v-container>
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
                <v-img :src="service.image" contain height="200" style="margin-left: 10px; margin-top: 5px;"></v-img>
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

<BookingForm
  v-if="showBookingForm"
  @close="showBookingForm = false"
  :selectedService="selectedService"
/>


  </div>
</template>

<script>
import axiosInstance from '../service/api';
import Navbar from '../components/Navbar.vue';
import BookingForm from '../components/BookingForm.vue'; // Import the booking form component

export default {
  components: {
    Navbar,
    BookingForm, // Register the booking form component
  },
  data() {
    return {
      showCookieModal: false,
      carouselItems: [
        { image: '/hands-holding-cleaning-tools-solutions.jpg' },
        { image: '/136167.jpg' },
        { image: '/smiling-positive-housewife-with-dreadlocks-holds-mop.jpg' },
        // Add more carousel items as needed
      ],
      services: [],
      searchKeyword: '',
      showBookingForm: false, // Data property to toggle booking form visibility
    };
  },
  mounted() {
    this.fetchServices(); // Fetch services when the component is mounted
  },
  computed: {
    uniqueServices() {
      // Use a Set to store unique image URLs
      const uniqueImages = new Set();
      // Filter the services array to remove duplicates
      return this.services.filter(service => {
        if (!uniqueImages.has(service.image)) {
          uniqueImages.add(service.image);
          return true;
        }
        return false;
      });
    }
  },
  methods: {
    navigateToService(service) {
      // Set the selected service before showing the booking form
      this.selectedService = service.name;
      // Show booking form
      this.showBookingForm = true;
    },
    fetchServices() {
      axiosInstance.get('/services')
        .then(response => {
          this.services = response.data; // Update services with the response data
        })
        .catch(error => {
          console.error('Error fetching services:', error);
        });
    },
  },
};
</script>



<style>
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
