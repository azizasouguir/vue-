import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login.vue'; // We'll create this next
import Home from '@/pages/home.vue';
import Register from '@/pages/register.vue';
import Profile from '@/pages/profile.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: false }
  },
   {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  // Add more routes later (e.g., Home, Dashboard)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;