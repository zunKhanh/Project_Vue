<template>
  <div class="admin">
    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar" class="active">
        <h1><router-link to="/admin/dashboard" class="logo">M.</router-link></h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <router-link  to="/admin/dashboard"><span class="fa fa-home"></span>Dashboard</router-link>
          </li>
          <li>
            <router-link  to="/admin/products"><span class="fa fa-user"></span>Products</router-link>
          </li>
          <li>
            <router-link  to="/admin/categories"><span class="fa fa-user"></span>Danh mục sản phẩm</router-link>
          </li>
          <li>
            <a href="#"><span class="fa fa-sticky-note"></span>Orders</a>
          </li>
          <li >
            <a href="#"><span class="fa fa-sticky-note"></span>Logout</a>
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
                  <router-link class="nav-link" to="/admin/dashboard">Dashboard</router-link>
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
export default {
  name: "AdminView",
  computed:{
    loggedIn(){
      return this.$store.state.user !== null // true
    }
  },
  methods: {
    // Toggles sidebar
    toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    },
    logout() {
      if(confirm("Are you sure you want to logout?")){
        this.$store.dispatch('logout'); // Gọi action 'logout' từ Vuex store
      }
      
    }

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
