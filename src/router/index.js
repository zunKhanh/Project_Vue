import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductsView from "../views/ProductsView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import AllProduct from "../views/AllProduct.vue"; // Import component
import CartProduct from "@/views/CartProduct.vue";
import WhistListVue from "@/views/WhistListVue.vue";
import UserAccount from "@/views/UserAccount.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ProductsMenu from "@/views/ProductsMenu.vue";
import ProductList from "@/views/ProductList.vue";
import CheckOut from "../views/CheckOut.vue";

// import { auth } from "../firebase";
// import store from "../store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/search-results",
    name: "SearchResults",
    component: () => import("../views/SearchResults.vue"),
  },
  {
    path: "/all-products", // Đường dẫn URL bạn muốn sử dụng
    name: "AllProduct",
    component: AllProduct, // Component được load khi truy cập đường dẫn này
  },
  {
    path: "/cart-products",
    name: "CartProduct",
    component: CartProduct,
  },

  {
    path: "/checkout",
    name: "Checkout",
    component: CheckOut,
  },

  {
    path: "/:menuType",
    name: "ProductsMenu",
    component: ProductsMenu,
  },
  {
    path: "/:menuType/:category",
    name: "ProductList",
    component: ProductList,
  },

  {
    path: "/whist-list",
    name: "whistlist",
    component: WhistListVue,
  },

  {
    path: "/user",
    name: "useraccount",
    component: UserAccount,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardView,
      },
      {
        path: "products",
        name: "products",
        component: ProductsView,
      },
      {
        path: "categories",
        name: "categories",
        component: CategoriesView,
      },
    ],
    meta: { requiresAuth: true }, // Đánh dấu route này yêu cầu xác thực
  },
  {
    path: "/sign-in",
    name: "signin",
    component: SignInView,
    meta: { requiresAuth: false }, // Không yêu cầu xác thực
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Checkout",
    name: "checkout",
    component: CheckOut,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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
// router.beforeEach(async (to, from, next) => {
//   await store.dispatch('fetchUser');
//   const currentUser = store.state.user;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) {
//     next('/sign-in'); // Chuyển hướng người dùng đến trang đăng nhập nếu yêu cầu xác thực nhưng chưa đăng nhập
//   } else {
//     next(); // Cho phép truy cập vào các trang khác
//   }
// });
// router.beforeEach((to, from, next) => {
//   const currentUser = auth.currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !currentUser) {
//     next('/sign-in'); // Yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
//   } else if (to.path === '/admin') {
//     if (currentUser && currentUser.email === 'admin@example.com') {
//       next(); // Đã đăng nhập và là admin, cho phép truy cập trang admin
//     } else if (!currentUser) {
//       next('/sign-in'); // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
//     } else {
//       next('/'); // Người dùng không phải là admin, chuyển hướng đến trang chính
//     }
//   } else if (to.path === '/sign-in' && currentUser )  {
//     next('/'); // Đã đăng nhập, không cần chuyển hướng đến trang đăng nhập
//   } else {
//     next(); // Các trường hợp còn lại, cho phép điều hướng bình thường
//   }
// });

export default router;
