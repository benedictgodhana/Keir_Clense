  <template>
      <v-container>
        <!-- Navigation bar -->
        <AdminNavbar></AdminNavbar>
    
        <!-- Sidebar -->
        <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />
    
        <!-- Search form -->
    
      
      
        <!-- Vuetify datatable to display user details -->
        <v-card variant="outlined" style="width: 100%; margin-top: 20px;">
        

          <v-card-title style="background: yellow;">Reviews Table</v-card-title>
          <v-card-text style="margin-top: 20px;">
            <v-text-field v-model="search" label="Search" variant="outlined"></v-text-field>
            <v-btn @click="clearSearch" color="success" style="border-radius: 5px;text-transform: capitalize;" class="mr-4"><span class="mdi mdi-backspace-reverse"></span>Clear</v-btn>
          </v-card-text>
          <v-card-text style="margin-top: 20px;">
            <v-data-table
              :headers="headers"
              :items="filteredReviews"
              item-key="id"
              style="text-transform:none; width: 100%;"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" class="mr-4" @click="openEditDialog(item)" style="text-transform:capitalize;"><span class="mdi mdi-eye"></span>View</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
  


        <!-- Success Alert -->
        
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
        reviews: [], // Initialize an empty array for booking details
        search: '', // Initialize search string
        headers: [
          { title: 'Customer Name', value: 'customerName' },
          { title: 'Customer Email', value: 'customerEmail' },
          { title: 'Employee Name', value: 'employeeName' },
          { title: 'Employee Email', value: 'employeeEmail' },
          { title: 'Rating', value: 'rating' },
          { title: 'Comment', value: 'comment' },
          { title: 'Action', value: 'action' },
          // Add more headers as needed
        ],
      };
    },
    created() {
      this.fetchReviews();
    },
    computed: {
      filteredReviews() {
        return this.reviews.filter(review =>
          review.customerName.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      async fetchReviews() {
        try {
          const response = await axiosInstance.get('/reviews');
          console.log('API Response:', response.data); // Log the response data
          if (Array.isArray(response.data.reviews)) {
            // Map the reviews array to include the necessary review details
            this.reviews = response.data.reviews.map(review => ({
              customerName: review.CustomerName,
              customerEmail: review.CustomerEmail,
              employeeName: review.EmployeeName,
              employeeEmail: review.EmployeeEmail,

              rating: review.Rating,
              comment: review.Comment,
              action: 'View Details',
            }));
          } else {
            console.error('Unexpected API response format: reviews array not found');
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      },
      clearSearch() {
        // Method to clear the search string
        this.search = '';
      },
      // Other methods...
    },
  };
</script>

    <style scoped>
    .search-card {
      margin-top: 20px;
      width: 100%;
    }
    </style>
    