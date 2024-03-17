import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Events from '../views/UpcomingEvents.vue'
import WelcomePage from '../views/Member/welcomepage.vue'
import AdminDashboard from '../views/Admin/DashboardPage.vue'
import ManageUsers from '../views/Admin/ManageUsers.vue'
import ManageServices from '../views/Admin/ManageServices.vue'
import ManageBookings from '../views/Admin/ManageBookings.vue'
import ManageEmployees from '../views/Admin/ManageEmployees.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{auth:false}
    },
    {
      path: '/welcomepage',
      name: 'WelcomePage',
      component: WelcomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/manage-users',
      name: 'ManageUsers',
      component: ManageUsers,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/manage-employees',
      name: 'ManageEmployees',
      component: ManageEmployees,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/manage-services',
      name: 'ManageServices',
      component: ManageServices,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/manage-bookings',
      name: 'ManageBookings',
      component: ManageBookings,
      meta: { requiresAuth: true },
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
