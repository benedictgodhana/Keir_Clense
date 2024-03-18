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
        <v-card-title style="background: yellow;">Assign Service to Employee</v-card-title>
        <v-card-text style="margin-top: 20px;">
          <v-select
  v-model="selectedService"
  :items="serviceNames"
  item-value="id"
  item-text="name" 
  label="Select Service"
  outlined
  dense
  required
></v-select>

<v-select
  v-model="selectedEmployee"
  :items="employeeNames"
  item-value="id"
  item-text="name"
  label="Select Employee"
  outlined
  dense
  required
></v-select>
          


  <v-btn @click="assignServiceToEmployee" color="primary" style="border-radius: 5px; margin-top: 20px;">
    <v-icon left>mdi-check</v-icon> <!-- Icon added -->
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
            :items="employees" 
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
        sidebar: true,
        updateSuccessAlertVisible: false,
        tableHeaders: [
          { title: 'Employee ID', value: 'id' },
          { title: 'Employee Name', value: 'user_name' },
          { title: 'Service Name', value: 'service_name' },
          { title: 'Action', value: 'action ' },
        ],
        employees: [], // Variable to store fetched employee data
        selectedService: '', // Initialize with an empty string
         selectedEmployee: '', // Initialize with an empty string
        employeeNames: [],
        serviceNames: [],
      };
    },
    created() {
    // Fetch services from the backend when the component is created
    this.fetchServices()
      .then(() => {
        // Fetch employees from the backend after services are fetched
        return this.fetchEmployees();
      })
      .then(() => {
        // Fetch employee data from the backend after employees are fetched
        return this.fetchEmployeeData();
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
      });
  },

    methods: {
      async fetchEmployeeData() {
    try {
      // Fetch employee data from the backend
      const response = await axiosInstance.get('/employees_services');
      if (Array.isArray(response.data)) {
        // If the response data is an array, set it to the employees array
        this.employees = response.data;
      } else {
        // If the response data is not an array, log an error
        console.error('Error: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  },

  async fetchServices() {
    try {
      // Fetch services from the backend
      const response = await axiosInstance.get('/services');
      if (Array.isArray(response.data)) {
        // If the response data is an array, extract service names
        this.serviceNames = response.data.map(service => service.name);
      } else {
        // If the response data is not an array, log an error
        console.error('Error: Response data is not an array for services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  },
  async fetchEmployees() {
    try {
      // Fetch employees from the backend
      const response = await axiosInstance.get('/employees');
      if (Array.isArray(response.data.employees)) {
        // If the response data is an array, extract employee names
        this.employeeNames = response.data.employees.map(employee => employee.name);
      } else {
        // If the response data is not an array, log an error
        console.error('Error: Response data is not an array for employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  },

  async assignServiceToEmployee() {
    try {
        if (!this.selectedService || !this.selectedEmployee) {
            console.error('Please select both service and employee.');
            return;
        }

        // Assuming selectedService and selectedEmployee contain objects with 'id' properties
        const serviceId = this.selectedService.id;
        const employeeId = this.selectedEmployee.id;

        const response = await axiosInstance.post('/assign-service', {
            service_id: serviceId,
            employee_id: employeeId,
        });

        // Check if the response status is successful (2xx)
        if (response.status === 200 || response.status === 201) {
            // If successful, update the UI and fetch updated employee data
            this.updateSuccessAlertVisible = true;
            this.selectedService = null;
            this.selectedEmployee = null;
            this.fetchEmployeeData(); // Update the employee data after assigning service
        } else {
            // If the response status is not successful, log an error
            console.error('Error assigning service to employee:', response.statusText);
        }
    } catch (error) {
        // Catch any other errors that might occur during the request
        console.error('Error assigning service to employee:', error);
    }
}






    },
  };
  </script>
