<template>
  <div>
    <Navbar></Navbar>

    <v-container>
      <v-card variant="outlined" class="profile-card">
        <v-card-title class="profile-title">Profile</v-card-title>
        <v-card-text class="profile-info">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-account</v-icon>Username:</v-list-item-title>
                <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-email</v-icon>Email:</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- Add more user details as needed -->
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="openChangePasswordDialog">Change Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- Dialog for changing password -->
    <v-dialog v-model="changePasswordDialogVisible" max-width="400">
      <v-card>
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <!-- Add form fields for changing password -->
          <v-form @submit.prevent="changePassword">
            <v-text-field
              v-model="passwordData.currentPassword"
              label="Current Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordData.newPassword"
              label="New Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordData.confirmPassword"
              label="Confirm New Password"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary">Change Password</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Navbar from '@/components/CustomerNavbar.vue';
import axiosInstance from '@/service/api';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {}, // Initialize user object to store user details
      changePasswordDialogVisible: false, // Controls the visibility of the change password dialog
      passwordData: { // Data model for the form in the change password dialog
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    // Fetch user details from local storage
    this.fetchUserDetails();
  },
  methods: {
    fetchUserDetails() {
      // Retrieve user details from local storage
      const userData = localStorage.getItem('user');
      // Parse the JSON data
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    openChangePasswordDialog() {
      this.changePasswordDialogVisible = true;
    },
    async changePassword() {
      try {
        // Make an API call to change the password
        const response = await axiosInstance.post('/change-password', this.passwordData);
        // Handle success response
        console.log(response.data.message); // Show success message
        this.changePasswordDialogVisible = false; // Close the dialog
        // Clear password fields
        this.passwordData.currentPassword = '';
        this.passwordData.newPassword = '';
        this.passwordData.confirmPassword = '';
      } catch (error) {
        console.error('Error changing password:', error);
        // Handle error, e.g., show an error message
      }
    },
  },
};
</script>

<style scoped>
.profile-card {
  width: 100%;
  margin-top: 20px;
}

.profile-title {
  background: #ffcc00;
  color: #333;
}

.profile-info {
  margin-top: 20px;
}

/* Add more styling as needed */
</style>
