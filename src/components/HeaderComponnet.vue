<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light shadow" style="height:130px;">
      <div class="container d-flex justify-content-between align-items-center">
        <a
          class="navbar-brand text-success logo h1 align-self-center"
          href="http://localhost:8080"
        >
          Zay
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
          id="templatemo_main_nav"
        >
          <div class="flex-fill">
            <ul
              class="nav navbar-nav d-flex justify-content-between mx-lg-auto"
            >
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:8080">Home</a>
              </li>
          <li class="nav-item">
  <router-link class="nav-link" to="/all-products">All product</router-link>
</li>

              <!-- <li class="nav-item">
                <a class="nav-link" href="shop.html">Shop</a>
              </li> -->

              
              <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact</a>
              </li>
            </ul>
          </div>
          <div class="navbar align-self-center d-flex">
            <div
              class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="inputMobileSearch"
                  placeholder="Search ..."
                />
                <div class="input-group-text">
                  <i class="fa fa-fw fa-search"></i>
                </div>
              </div>
            </div>
            <!-- giỏ hàng -->
            <div class="nav-icon position-relative text-decoration-none">
                <router-link class="nav-link" to="/cart-products">
                  <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                      {{ cartItemCount }}
                     </span>
                </router-link>
            </div>
            <router-link to="/sign-in" v-if="!loggedIn">Sign In</router-link> 
            <router-link to="/sign-up" v-if="!loggedIn" >Sign Up</router-link>
            <button class="badge badge-secondary" @click="logout" v-if="loggedIn">Logout</button>
          </div>
          <div style="margin-top:60px; margin-left:-200px;">
  <form class="d-flex" @submit.prevent="searchProducts">
    <input
      class="form-control me-2"
      type="search"
      placeholder="Search for products"
      aria-label="Search"
      v-model="searchQuery"
     />
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
  <!-- Các thành phần khác của navbar ở đây -->
          </div>
        </div>
      </div>
    </nav>
    <!-- Close Header -->
  </div>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.user !== null // true
    },
    cartItemCount() {
      return this.$store.state.cartItemCount;  //giỏ hàng
    }
  },
  methods: {
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        this.$store.dispatch('logout'); // Gọi action 'logout' từ Vuex store
      }

    },
    searchProducts() {
      console.log('+++++++++++++++++' + this.searchQuery);
      // Chuyển hướng đến trang kết quả tìm kiếm với query parameter
      this.$router.push({ name: 'SearchResults', query: { query: this.searchQuery } });
      //mới show text à chưa gọi view text
      //tạo view là đc

    }

  },

  data() {
    return {
      searchQuery: '', // Khởi tạo giá trị mặc định cho searchQuery
      // ... các giá trị dữ liệu khác nếu có
    };
  }
};
</script>
<style lang=""></style>
