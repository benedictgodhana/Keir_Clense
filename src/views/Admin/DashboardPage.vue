<template>
    <div>
      <!-- Navigation bar -->
      <AdminNavbar></AdminNavbar>
  
      <!-- Sidebar -->
      <AdminSidebar :sidebar="sidebar" @toggle-sidebar="toggleSidebar" />
  
      <!-- Flex container for count cards -->
      <div class="count-cards-container">
        <!-- Cards displaying the counts -->
        <user-count-card :userCount="userCount" />
        <employee-count-card :employeeCount="employeeCount" />
        <customer-count-card :customerCount="customerCount" />
        <service-count-card :serviceCount="serviceCount" />
        <payment-count-card :paymentCount="paymentCount" />

      </div>
    </div>
  </template>
  
  <script>
  import AdminSidebar from '@/components/AdminSidebar.vue';
  import AdminNavbar from '@/components/AdminNavbar.vue';
  import UserCountCard from '@/components/UserCountCard.vue';
  import EmployeeCountCard from '@/components/EmployeeCountCard.vue';
  import CustomerCountCard from '@/components/CustomerCountCard.vue';
  import ServiceCountCard from '@/components/ServiceCountCard.vue';
  import PaymentCountCard from '@/components/PaymentCountCard.vue';

  
  export default {
    components: {
      AdminSidebar,
      AdminNavbar,
      UserCountCard,
      EmployeeCountCard,
      CustomerCountCard,
      ServiceCountCard,
      PaymentCountCard
    },
    data() {
      return {
        sidebar: true, // Initialize the sidebar as open
        userCount: 100, // Example user count data
        employeeCount: 50, // Example employee count data
        customerCount: 200, // Example customer count data
        serviceCount: 10, // Example service count data
        paymentCount: 1000 // Example service count data

      };
    },
    methods: {
      toggleSidebar() {
        // Method to toggle the sidebar
        this.sidebar = !this.sidebar;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Flex container for count cards */
  .count-cards-container {
    display: flex;
    margin-left:10px;
    margin-top: 20px; /* Optional margin */
  }
  </style>
  