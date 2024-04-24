import { createMemoryHistory, createRouter } from "vue-router";
import Layout from '@/layout/index.vue'
const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    component: Layout
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes: constantRoutes
});

export default router;