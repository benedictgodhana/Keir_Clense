<template>
    <v-container>
      <!-- Navigation bar -->
      <AdminNavbar></AdminNavbar>
  
      <!-- Sidebar -->
      <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />
  
      <!-- Success Alert -->
      <v-alert v-model="updateSuccessAlertVisible" type="success" dismissible>
        Employee assigned to service successfully!
      </v-alert>
  
      <!-- Assign Service Form -->
      <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
        <v-card-title style="background: yellow;">Assign Service to Employees</v-card-title>
        <v-card-text style="margin-top: 20px;">
          <!-- Service Dropdown -->
                    <!-- Service Dropdown -->
            <v-select
            v-model="selectedService"
            :items="services"
            label="Select Service"
            item-text="name" 
            item-value="id" 
            outlined
            dense
            required
            ></v-select>

  
          <!-- Employee Dropdown -->
                    <!-- Employee Dropdown -->
            <v-select
            v-model="selectedEmployee"
            :items="employeeNames"
            label="Select Employee"
            outlined
            dense
            required
            ></v-select>

  
          <!-- Assign Button -->
          <v-btn @click="assignServiceToEmployee" color="primary" style="border-radius: 5px; margin-top: 20px;">
            Assign Service
          </v-btn>
        </v-card-text>
      </v-card>
  
      <!-- Employees Table -->
      <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
        <v-card-title style="background: yellow;">Employees with Assigned Services</v-card-title>
        <v-card-text style="margin-top: 20px;">
          <v-data-table
            :headers="tableHeaders"
            :items="employeeServiceData"
            item-key="id"
            style="text-transform:none; width: 100%;"
          ></v-data-table>
        </v-card-text>
      </v-card>
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
        services: [], // Initialize an empty array for services
        employees: [], // Initialize an empty array for employees
        selectedService: null, // Initialize selected service
        selectedEmployee: null, // Initialize selected employee
        updateSuccessAlertVisible: false, // Whether update success alert is visible
        tableHeaders: [
          { title: 'Employee ID', value: 'id' },
          { title: 'Employee Name', value: 'name' },
          { title: 'Service Name', value: 'serviceName' },
        ], // Table headers for v-data-table
      };
    },
    computed: {
      employeeServiceData() {
        // Combine employee data with their assigned service
        return this.employees.map(employee => {
          const service = this.services.find(service => service.id === employee.service_id);
          return {
            id: employee.id,
            name: employee.name,
            serviceName: service ? service.name : 'Not Assigned',
          };
        });
      },
    },
    created() {
      // Fetch services and employees from the backend when the component is created
      this.fetchServices();
      this.fetchEmployees();
    },
    methods: {
      async fetchServices() {
        try {
          // Fetch services from the backend
          const response = await axiosInstance.get('/services');
          this.services = response.data.services;
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      },
      async fetchEmployees() {
    try {
        // Fetch users with the role name "employee" from the backend
        const response = await axiosInstance.get('/employees');

        // Extract employee names from the response data
        this.employeeNames = response.data.employees.map(employee => employee.name);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
},



      async assignServiceToEmployee() {
        try {
          // Check if both service and employee are selected
          if (!this.selectedService || !this.selectedEmployee) {
            console.error('Please select both service and employee.');
            return;
          }
  
          // Make an API call to assign the selected service to the selected employee
          const response = await axiosInstance.post('/assign-service', {
            service_id: this.selectedService.id,
            employee_id: this.selectedEmployee.id,
          });
  
          // Show success alert
          this.updateSuccessAlertVisible = true;
  
          // Optionally, you can clear the selected service and employee fields
          this.selectedService = null;
          this.selectedEmployee = null;
  
          // You can also refresh the services and employees list if needed
          this.fetchServices();
          this.fetchEmployees();
  
        } catch (error) {
          console.error('Error assigning service to employee:', error);
        }
      },
      toggleSidebar() {
        // Method to toggle the sidebar
        this.sidebar = !this.sidebar;
      },
    },
  };
  </script>
  