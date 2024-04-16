<template>
  <div class="admin">
    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar" class="active">
        <ul class="list-unstyled components mb-5">
          <li class="text-center">
            <a class=""
              ><span class="fa fa-user"></span>
              <h5>{{ name }}</h5>
              {{ email }}
            </a>
          </li>
          <li class="active">
            <router-link to="/admin/dashboard"
              ><span class="fa fa-home"></span>Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/admin/products"
              ><span class="fa fa-user"></span>Quản lý sản phẩm</router-link
            >
          </li>
          <li>
            <router-link to="/admin/categories"
              ><span class="fa fa-user"></span>Quản lý danh mục sản
              phẩm</router-link
            >
          </li>
          <li>
            <router-link to="/admin/orders"
              ><span class="fa fa-user"></span>hoa don</router-link
            >
          </li>
          <!-- <li>
            <router-link to="/admin/profile-admin" v-if="loggedIn">Tài khoản</router-link>
          </li> -->
          <li>
            <a href="#">
              <button class="badge badge-secondary" @click="logout">
                Đăng xuất
              </button></a
            >
          </li>

          <li>
            <a href="#"><span class="fa fa-paper-plane"></span> Contacts</a>
          </li>
        </ul>
      </nav>

      <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-primary"
              @click="toggleSidebar"
            >
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
            <button
              class="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fa fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                  <router-link class="nav-link" to="/admin/dashboard"
                    >Dashboard</router-link
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Products</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Orders</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
export default {
  name: "AdminView",
  computed: {
    loggedIn() {
      return this.$store.state.user !== null; // true
    },
  },
  methods: {
    // Toggles sidebar
    toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    },
    logout() {
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        this.$store.dispatch("logout"); // Gọi action 'logout' từ Vuex store
      }
    },
  },
  data() {
    return {
      name: null,
      email: null,
    };
  },
  created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.name = user.displayName;
        this.img = user.photoURL;
        // User is signed in.
        // Lấy tài liệu người dùng từ Firestore
        const userDoc = doc(firestore, "users", user.uid);
        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            // Nếu tài liệu tồn tại, lấy tên của người dùng
            const userData = userSnapshot.data();
            this.name = userData.username;
            this.email = userData.email;
          } else {
            // Nếu tài liệu không tồn tại
            this.name = null;
            this.email = null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.name = null;
          this.email = null;
        }
      } else {
        // No user is signed in.
        this.name = null;
        this.email = null;
        this.img = null;
      }
    });
  },
};
</script>
<style scoped>
@import "../assets/Admin/css/style.css";
/* @import "../assets/Admin/css/bootstrap.min.css";
  @import "../assets/Admin/css/bootstrap/_media.css";
  @import "../assets/Admin/css/bootstrap/mixins/_border-radius.css";
  @import "../assets/Admin/css/bootstrap/mixins/_screen-reader.css";
  @import "../assets/Admin/css/bootstrap/mixins/_visibility.css";
  @import "../assets/Admin/css/bootstrap/utilities/_stretched-link.css"; */
</style>
