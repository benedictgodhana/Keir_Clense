<template>
    <v-container>
      <!-- Navigation bar -->
      <AdminNavbar></AdminNavbar>
  
      <!-- Sidebar -->
      <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />
  
      <!-- Search form -->
  
      <!-- Vuetify datatable to display payment transactions -->
      <!-- Vuetify datatable to display payment transactions -->
<v-card variant="outlined" style="width: 100%; margin-top: 20px;">
  <v-card-title style="background: yellow;">Payment Transactions Table</v-card-title>

  <v-card-text style="margin-top: 20px;">
    <v-text-field v-model="search" label="Search" variant="outlined"></v-text-field>

    <v-data-table :headers="headers" :items="filteredTransactions" item-key="id" style="text-transform:none; width: 100%;">
      <!-- Display the data in the table -->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.booking_id }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.payment_method }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.transaction_id }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ formatDate(item.updated_at) }}</td>
          <td>
            <v-btn color="transparent" elevation="0" style="text-transform: lowercase;" @click="openEditDialog(item)"><v-icon color="success">mdi-pen</v-icon></v-btn>
            <v-btn color="transparent" elevation="0"  style="text-transform: lowercase;" @click="viewDetails(item)"><v-icon color="black">mdi-eye</v-icon></v-btn>
          </td>
        </tr>
      </template>
      <!-- Display total amount -->
      <template v-slot:footer>
        <td colspan="2"></td>
        <td><strong>Total:</strong></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ totalAmount }}</td>
        <td></td>
      </template>
    </v-data-table>
  </v-card-text>
</v-card>

  
      <!-- Dialog for editing transaction status -->
      <v-dialog v-model="editDialog" max-width="600">
        <v-card>
          <v-card-title>Edit Transaction Status</v-card-title>
          <v-card-text>
            <v-select v-model="selectedTransactionStatus" :items="statusOptions" label="Status" variant="outlined"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateTransactionStatus">Save</v-btn>
            <v-btn @click="editDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialog for viewing transaction details -->
     <!-- Dialog for viewing transaction details -->
<v-dialog v-model="viewDialog" max-width="600">
  <v-card>
    <v-card-title>Transaction Details</v-card-title>
    <v-card-text>
      <div v-if="selectedTransaction">
        <strong>ID:</strong> {{ selectedTransaction.id }}
        <br>
        <strong>Booking ID:</strong> {{ selectedTransaction.booking_id }}
        <br>
        <strong>Amount:</strong> {{ selectedTransaction.amount }}
        <br>
        <strong>Payment Method:</strong> {{ selectedTransaction.payment_method }}
        <br>
        <strong>Status:</strong> {{ selectedTransaction.status }}
        <br>
        <strong>Transaction ID:</strong> {{ selectedTransaction.transaction_id }}
        <br>
        <strong>Created At:</strong> {{ formatDate(selectedTransaction.created_at) }}
        <br>
        <strong>Updated At:</strong> {{ formatDate(selectedTransaction.updated_at) }}
      </div>
      <div v-else>
        <p>No transaction selected</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="viewDialog = false">Close</v-btn>
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
        transactions: [], // Initialize an empty array for payment transactions
        search: '', // Initialize search string
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Booking ID', value: 'booking_id' },
          { title: 'Amount', value: 'amount' },
          { title: 'Payment Method', value: 'payment_method' },
          { title: 'Status', value: 'status' },
          { title: 'Transaction ID', value: 'transaction_id' },
          { title: 'Created At', value: 'created_at' },
          { title: 'Updated At', value: 'updated_at' },
          { title: 'Action', value: 'action' },
          // Add more headers as needed
        ],
        editDialog: false, // Flag to control edit dialog visibility
        viewDialog: false, // Flag to control view dialog visibility
        selectedTransaction: null, // Currently selected transaction for editing or viewing
        selectedTransactionStatus: '', // Selected status for transaction
        statusOptions: ['Pending', 'Success', 'Failed'], // Options for transaction status
      };
    },
    created() {
      // Fetch payment transactions from the backend when the component is created
      this.fetchTransactions();
    },
    computed: {
        
      filteredTransactions() {

        // Filter transactions based on search string
        return this.transactions.filter(transaction =>
          transaction.booking_id.toString().includes(this.search) ||
          transaction.transaction_id.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      async fetchTransactions() {
        try {
          const response = await axiosInstance.get('/payment-transactions');
          console.log('API Response:', response.data); // Log the response data
          if (Array.isArray(response.data.transactions)) {
            // Assign response data transactions to the component data
            this.transactions = response.data.transactions;
          } else {
            console.error('Unexpected API response format: transactions array not found');
          }
        } catch (error) {
          console.error('Error fetching payment transactions:', error);
        }
      },
      formatDate(dateString) {
        // Function to format date string
        if (!dateString) return '';
        const date = new Date(dateString);
       
        return date.toLocaleDateString(); // Adjust format as needed
    },
    openEditDialog(transaction) {
      // Set selected transaction and status for editing
      this.selectedTransaction = transaction;
      this.selectedTransactionStatus = transaction.status;
      // Open edit dialog
      this.editDialog = true;
    },
    async updateTransactionStatus() {
      try {
        // Make an API call to update transaction status
        const response = await axiosInstance.put(`/payment-transactions/${this.selectedTransaction.id}`, {
          status: this.selectedTransactionStatus,
        });
        console.log('Transaction status updated:', response.data);
        // Close edit dialog
        this.editDialog = false;
        // Refresh transaction list
        this.fetchTransactions();
      } catch (error) {
        console.error('Error updating transaction status:', error);
      }
    },
    viewDetails(transaction) {
      // Set selected transaction for viewing
      this.selectedTransaction = transaction;
      // Open view dialog
      this.viewDialog = true;
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
  