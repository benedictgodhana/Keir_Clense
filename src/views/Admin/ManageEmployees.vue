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

    <!-- Add Employee with Service Dialog Button -->

    <!-- Employees Table -->
    <v-card variant="outlined" style="width: 100%; margin-top: 20px;" v-if="employees.length > 0">
      <v-card-title style="background: yellow;">Employees with Services</v-card-title>
      
      <v-card-text style="margin-top: 20px;">

        <v-data-table
          :headers="tableHeaders"
          :items="employees"
          item-key="id"
          style="text-transform:none; width: 100%;"
        >
          <template v-slot:item.action="{ item }">
            <!-- Action buttons -->
            <v-btn color="" elevation="0" style="text-transform: capitalize;" @click="editEmployeeDialog(item)"><v-icon color="success">mdi-pen</v-icon>Edit</v-btn>
            <v-btn elevation="0" style="text-transform: capitalize;" class="mr-4" @click="viewEmployeeDialog(item)"><v-icon>mdi-eye</v-icon>View</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Edit Employee Dialog -->
    <v-dialog v-model="editDialogVisible" max-width="500">
      <v-card>
        <v-card-title>Edit Employee</v-card-title>
        <v-card-text>
          <!-- Add form fields for editing employee details here -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEditedEmployee">Save</v-btn>
          <v-btn color="primary" @click="editDialogVisible = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- View Employee Dialog -->
    <v-dialog v-model="viewDialogVisible" max-width="500">
      <v-card>
        <v-card-title>View Employee</v-card-title>
        <v-card-text>
          <div>
            <p><strong>Name:</strong> {{ selectedEmployee.user_name }}</p>
            <p><strong>Email:</strong> {{ selectedEmployee.user_email }}</p>
            <p><strong>Services:</strong> {{ selectedEmployee.service_name }}</p>
            <!-- Add more employee details here -->
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="viewDialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Employee with Service Dialog -->
   
  </v-container>
</template>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue';
import AdminNavbar from '@/components/AdminNavbar.vue';
import axiosInstance from '@/service/api'; // Ensure correct import path

export default {
  components: {
    AdminSidebar,
    AdminNavbar,
  },
  data() {
    return {
      sidebar: true,
      updateSuccessAlertVisible: false,
      editDialogVisible: false,
      viewDialogVisible: false,
      addEmployeeDialogVisible: false,
      selectedEmployee: null,
      selectedServiceForAdd: null,
      selectedEmployeeForAdd: null,
      tableHeaders: [
        { title: 'Employee Name', value: 'user_name' },
        { title: 'Employee Email', value: 'user_email' },
        { title: 'Service Name', value: 'service_name' },
        { title: 'Action', value: 'action' },
      ],
      employees: [],
      selectedService: null,
      employeeNames: [],
      serviceNames: [],
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      try {
        await this.fetchServices();
        await this.fetchEmployees();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    },
    async fetchServices() {
      try {
        const response = await axiosInstance.get('/services');
        if (Array.isArray(response.data)) {
          this.serviceNames = response.data.map(service => ({
            id: service.id,
            name: service.name
          }));
        } else {
          console.error('Error: Response data is not an array for services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    async fetchEmployees() {
  try {
    const response = await axiosInstance.get('/employees');
    if (Array.isArray(response.data.employees)) {
      this.employees = response.data.employees.map(employee => ({
        ...employee,
        user_name: employee.name,
        user_email: employee.email,
        service_name: employee.services.map(service => service.name).join(', '), // Concatenate service names
      }));

      // Populate employeeNames for the select dropdown
      this.employeeNames = this.employees.map(({ id, user_name }) => ({
        id,
        name: user_name,
      }));
    } else {
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

        const serviceId = this.selectedService.id;
        const employeeId = this.selectedEmployee.id;

        const response = await axiosInstance.post('/assign-service', {
          service_id: serviceId,
          employee_id: employeeId,
        });

        if (response.status === 200 || response.status === 201) {
          this.updateSuccessAlertVisible = true;
          this.selectedService = null;
          this.selectedEmployee = null;
          this.fetchEmployees();
        } else {
          console.error('Error assigning service to employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error assigning service to employee:', error);
      }
    },
    editEmployeeDialog(employee) {
      this.selectedEmployee = employee;
      this.editDialogVisible = true;
    },
    viewEmployeeDialog(employee) {
      this.selectedEmployee = employee;
      this.viewDialogVisible = true;
    },
    saveEditedEmployee() {
      // Implement logic to save edited employee
      this.editDialogVisible = false;
    },
    addEmployeeWithServiceDialog() {
      this.addEmployeeDialogVisible = true;
    },
    async addEmployeeWithService() {
      try {
        if (!this.selectedServiceForAdd || !this.selectedEmployeeForAdd) {
          console.error('Please select both service and employee.');
          return;
        }

        const serviceId = this.selectedServiceForAdd.id;
        const employeeId = this.selectedEmployeeForAdd.id;

        const response = await axiosInstance.post('/assign-service', {
          service_id: serviceId,
          employee_id: employeeId,
        });

        if (response.status === 200 || response.status === 201) {
          this.updateSuccessAlertVisible = true;
          this.selectedServiceForAdd = null;
          this.selectedEmployeeForAdd = null;
          this.fetchEmployees();
          this.addEmployeeDialogVisible = false;
        } else {
          console.error('Error assigning service to employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error assigning service to employee:', error);
      }
    },
  },
};
</script>
