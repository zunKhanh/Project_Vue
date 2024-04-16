import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductsView from "../views/ProductsView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ProductList from "@/views/ProductList.vue";
import ProductsMenu from "@/views/ProductsMenu.vue";
import AllProduct from "../views/AllProduct.vue"; // Import component
import CartProduct from "@/views/CartProduct.vue";
import WhistListVue from "@/views/WhistListVue.vue";
import LoginAdmin from "@/components/LoginAdmin.vue";
import ProfileAdmin from "@/views/ProfileAdmin.vue";
import ProfileUser from "@/views/ProfileUser.vue";
import MyOrder from "@/views/MyOrder.vue";
import { auth } from "../firebase";
import OrderView from "@/views/OrderView.vue";
import CheckOut from "../views/CheckOut.vue";
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
    path: "/cart-products",
    name: "CartProduct",
    component: CartProduct,
  },

  {
    path: "/whist-list",

    name: "whistlist",
    component: WhistListVue,
    // beforeEnter: (to, from, next) => {
    //   // ... chay moi khi user vao chinh cai router do
    // }
  },
  
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckOut,
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
        path: "profile-admin",
        name: "profile-admin",
        component: ProfileAdmin,
      },
      {
        path: "categories",
        name: "categories",
        component: CategoriesView,
      },
      {
        path: "orders",
        name: "orders",
        component: OrderView,
      },
    ],
    meta: { requiresAuth: true }, // Đánh dấu route này yêu cầu xác thực
  },
  {
    path: "/sign-in",
    name: "signin",
    component: SignInView,
  },
  {
    path: "/admin-login",
    name: "admin-login",
    component: LoginAdmin,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/my-order",
    name: "my-order",
    component: MyOrder,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileUser,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// check auth -> 
// Phân quyền đăng nhập trên router admin và user
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    // Nếu yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    next("/admin-login");
  } else {
    next(); // Cho phép tiếp tục điều hướng bình thường
  }
});

export default router;
