import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DataPage from '../views/DataPage.vue'
import Auth from '../views/auth/otp.vue'
import IndexPage2 from "../views/IndexPage.vue";
import IndexPage from "../App.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/",
    component: IndexPage2,
    children: [      
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/auth',
        name: 'Auth',
        component:Auth,
      },
      {
        path: '/newpage',
        name: 'Page',
        component:DataPage,
      }


    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = [
    "/auth",
  ];
  const token = localStorage.getItem("userToken");  
  if (!publicRoutes.includes(to.path)) {
    if (!token) {
      // Redirect to onboarding if the route requires authentication and user isn't authenticated
      return next("/auth");
    }
    // Continue navigation for authenticated user
    return next();
  }

  if (token) {
    // Redirect to home if the user is authenticated and trying to access public routes
    return next("/home");
  }

  // Allow navigation for public routes and unauthenticated users
  next();
});

export default router
