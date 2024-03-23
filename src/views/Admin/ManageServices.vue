<template>
  <v-container>
    <!-- Navigation bar -->
    <AdminNavbar></AdminNavbar>

    <!-- Sidebar -->
    <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />

    <!-- Search form -->

    <!-- Success Alert for updating service -->
    <v-alert v-model="updateSuccessAlertVisible" type="success" dismissible>
      Service data updated successfully!
    </v-alert>

    <!-- Snackbar for adding service -->
    <v-alert v-model="addSuccessSnackbarVisible" color="success">
      Service added successfully!
    </v-alert>

    <!-- Vuetify datatable to display service details -->
    <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
      <v-card-title style="background: yellow;">Services Table</v-card-title>
      <v-card-text style="margin-top: 20px;">
        <v-text-field v-model="search" label="Search" variant="outlined"></v-text-field>
        <v-btn @click="clearSearch" color="success" style="border-radius: 5px;text-transform: capitalize;" class="mr-4"><span class="mdi mdi-backspace-reverse"></span>Clear</v-btn>
        <v-btn @click="openAddServiceDialog" color="primary" style="border-radius: 5px;text-transform: capitalize;"><span class="mdi mdi-washing-machine"></span>Add Service</v-btn>
      </v-card-text>
      <v-card-text style="margin-top: 20px;">
        <v-data-table
          :headers="headers"
          :items="filteredServices"
          item-key="id"
          style="text-transform:none; width: 100%;"
        >
          <template v-slot:item.action="{ item }">
            <v-btn color="" elevation="0" class="" @click="openEditDialog(item)" style="text-transform:capitalize;"><span style="color:green" class="mdi mdi-pencil"></span></v-btn>
            <v-btn color=""  elevation="0" @click="deleteServiceDialog(item)"  style="text-transform:capitalize;"><span style="color:red" class="mdi mdi-delete"></span></v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Edit Service Dialog -->
    <v-dialog v-model="editServiceDialogVisible" max-width="600">
      <v-card>
        <v-card-title>Edit Service</v-card-title>
        <v-card-text>
          <v-form ref="editForm" @submit.prevent="submitEditService">
            <v-text-field v-model="editedService.name" label="Name" required></v-text-field>
            <v-text-field v-model="editedService.description" label="Description" required></v-text-field>
            <v-text-field v-model="editedService.price" label="Price" required></v-text-field>

            <!-- Add more text fields for other editable fields -->

            <!-- Add more text fields as needed -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitEditService">Save</v-btn>
          <v-btn @click="cancelEditService">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Service Dialog -->
    <v-dialog v-model="deleteServiceDialogVisible" max-width="600">
      <v-card>
        <v-card-title>Delete Service</v-card-title>
        <v-card-text>
          <p>Are you sure you want to delete this service?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="deleteService">Delete</v-btn>
          <v-btn @click="deleteServiceDialogVisible = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Service Dialog -->
    <v-dialog v-model="addServiceDialogVisible" max-width="600">
      <v-card>
        <v-card-title>Add Service</v-card-title>
        <v-card-text>
          <v-form ref="addServiceForm">
            <v-text-field v-model="newService.name" label="Service Title" required ></v-text-field>
            <v-text-field v-model="newService.description" label="Description" required></v-text-field>
            <v-text-field v-model="newService.price" label="Price" required></v-text-field>

            <!-- Add more fields as needed -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitAddService">Save</v-btn>
          <v-btn @click="cancelAddService">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue';
import AdminNavbar from '@/components/AdminNavbar.vue';
import axiosInstance from '@/service/api'; // Corrected import path

export default {
  components: {
    AdminSidebar,
    AdminNavbar,
  },
  data() {
    return {
      sidebar: true, // Initialize the sidebar as open
      services: [], // Initialize an empty array for service details
      search: '', // Initialize search string
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Description', value: 'description' },
        { title: 'Price', value: 'price' },
        { title: 'Action', value: 'action' },
        // Add more headers as needed
      ],
      editServiceDialogVisible: false, // Whether edit service dialog is visible
      deleteServiceDialogVisible: false, // Whether delete service dialog is visible
      addServiceDialogVisible: false, // Whether add service dialog is visible
      selectedService: null, // Currently selected service for editing or deleting
      editedService: {
        id: null,
        name: '',
        description: '',
        price:'',
        // Other fields...
      },
      newService: {
        name: '',
        description: '',
        price:'',
        // Other fields...
      },
      updateSuccessAlertVisible: false, // Whether update success alert is visible
      addSuccessSnackbarVisible: false, // Whether add success snackbar is visible
    };
  },
  created() {
    // Fetch service details from the backend when the component is created
    this.fetchServices();
  },
  computed: {
    filteredServices() {
      // Filter services based on search string
      return this.services.filter(service =>
        service.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    async fetchServices() {
  try {
    // Fetch service details from the backend
    const response = await axiosInstance.get('/services');
    console.log('API Response:', response.data); // Log the response data
    if (Array.isArray(response.data)) {
      // Use the response data directly
      this.services = response.data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
          price: parseFloat(service.price), // Parse price as float
        // Add more properties as needed
      }));
    } else {
      console.error('Unexpected API response format: services array not found');
    }
  } catch (error) {
    console.error('Error fetching services:', error);
  }
},



    openEditDialog(service) {
      // Set editedService to the clicked service's data
      this.editedService = { ...service };
      // Set edit dialog visibility to true
      this.editServiceDialogVisible = true;
    },

    openAddServiceDialog() {
      // Set add service dialog visibility to true
      this.addServiceDialogVisible = true;
    },

    cancelEditService() {
      // Reset editedService
      this.editedService = {
        id: null,
        name: '',
        description: '',
        // Other fields...
      };
      // Close edit dialog
      this.editServiceDialogVisible = false;
    },

    toggleSidebar() {
      // Method to toggle the sidebar
      this.sidebar = !this.sidebar;
    },

    clearSearch() {
      // Method to clear the search string
      this.search = '';
    },

    deleteServiceDialog(service) {
      // Method to open delete service dialog
      this.selectedService = service;
      this.deleteServiceDialogVisible = true;
    },

    async submitEditService() {
      try {
        // Make an API call to update service data
        const response = await axiosInstance.put(`/services/${this.editedService.id}`, this.editedService);
        console.log('Service updated:', response.data);
        // Close edit dialog
        this.editServiceDialogVisible = false;
        // Optionally, you can refresh the service list
        this.fetchServices();
        // Show success alert
        this.updateSuccessAlertVisible = true;
        // Hide success alert after 4 seconds
        setTimeout(() => {
          this.updateSuccessAlertVisible = false;
        }, 4000);
      } catch (error) {
        console.error('Error updating service:', error);
      }
    },

    async deleteService() {
      // Method to handle deleting service
      try {
        console.log('Delete service:', this.selectedService);
        // Perform delete operation (e.g., send delete request to backend)
        // Close delete service dialog
        this.deleteServiceDialogVisible = false;
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    },

    async submitAddService() {
      try {
        // Make an API call to add the new service
        const response = await axiosInstance.post('/services', this.newService);
        console.log('Service added:', response.data);
        // Display success alert
        this.addSuccessSnackbarVisible = true;
        setTimeout(() => {
          this.addSuccessSnackbarVisible = false;
        }, 4000);
        // Reset newService
        this.newService = {
          name: '',
          description: '',
          price:'',
          // Other fields...
        };
        // Close add service dialog
        this.addServiceDialogVisible = false;
        // Refresh the service list
        this.fetchServices();
      } catch (error) {
        console.error('Error adding service:', error);
      }
    },

    cancelAddService() {
      // Reset newService
      this.newService = {
        name: '',
        description: '',
        // Other fields...
      };
      // Close add service dialog
      this.addServiceDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.search-card {
  margin-top: 20px;
  width: 100%;
}
</style>
