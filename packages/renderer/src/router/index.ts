import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import Home from '/@/views/Home.vue';
import BindManager from '/@/views/BindManager.vue';
import Servers from '/@/views/Servers.vue';

const routes = [
  {
    path: '/bindmanager',
    name: "Gestionnaire d'assignations",
    component: BindManager,
  },
  {
    path: '/servers',
    name: 'Serveurs',
    component: Servers,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
export const filteredRoutes = routes.filter(route => route.component !== Home);
