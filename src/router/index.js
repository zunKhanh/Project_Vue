import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import { auth } from '../firebase';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children:[
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: 'products',
        name: 'products',
        component: ProductsView
      },
    ],
    meta: { requiresAuth: true } // Đánh dấu route này yêu cầu xác thực
  },
  {
    path: "/sign-in",
    name: "signin",
    component: SignInView,
    meta: { requiresAuth: false } // Không yêu cầu xác thực
    
    
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUpView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
//   const currentUser = auth.currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (to.path ==='/sign-in' && currentUser && requiresAuth) {
//     next('/');
//   } else if (requiresAuth && !currentUser) {
//     next('/sign-in');
//   } else if (to.path === '/admin') {
//     if (currentUser && currentUser.email === 'admin@example.com') {
//       next();
//     } else {
//       next('/sign-in');
//     }
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/sign-in'); // Yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  } else if (to.path === '/admin') {
    if (currentUser && currentUser.email === 'admin@example.com') {
      next(); // Đã đăng nhập và là admin, cho phép truy cập trang admin
    } else if (!currentUser) {
      next('/sign-in'); // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
    } else {
      next('/'); // Người dùng không phải là admin, chuyển hướng đến trang chính
    }
  } else if (to.path === '/sign-in' && currentUser )  {
    next('/'); // Đã đăng nhập, không cần chuyển hướng đến trang đăng nhập
  } else {
    next(); // Các trường hợp còn lại, cho phép điều hướng bình thường
  }
});




export default router
