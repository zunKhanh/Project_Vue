<template lang="">
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">
            <a href="http://localhost:8080/" class="navbar-brand text-success logo h1 align-self-center">Zay</a>
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#templatemo_main_nav"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
                id="templatemo_main_nav">
           <!-- menu -->
  <div class="flex-fill">
      <ul class="navbar-nav d-flex justify-content-between mx-lg-auto">
          <li v-for="(menu, index) in menus" :key="index"
              class="nav-item">
              <router-link  v-if="menu.menuType === 'Trang chủ'" :to="{ path: '/' }" class="nav-link"
                  :id="'navbarDropdown' + index" role="button" aria-haspopup="true" aria-expanded="false"
                 
                  >
                  {{ menu.menuType }}
              </router-link>
              <router-link  v-else-if="menu.menuType === 'Cửa hàng'" :to="{ path: '/all-products' }" class="nav-link"
                  :id="'navbarDropdown' + index" role="button" aria-haspopup="true" aria-expanded="false"
                 
                  >
                  {{ menu.menuType }}
              </router-link>
              <router-link  v-else 
                  :to="{ name: 'ProductsMenu', params: { menuType: menu.menuType } }" class="nav-link"
                  :id="'navbarDropdown' + index" role="button" aria-haspopup="true" aria-expanded="false"
                 
                  >
                  {{ menu.menuType }}
                  <div class="sub-menu">
                      <router-link v-for="(category, idx) in getProductsByMenuType(menu.menuType)"
                          :key="idx"
                          :to="menu.menuType === 'Nam' ? `/${menu.menuType}/` + category.category : `/${menu.menuType}/` + category.category"
                          class="sub-menu-item">
                          {{ category.category }}
                      </router-link>
                  </div>
              </router-link>
          </li>
      </ul>
  </div>
  <!-- end menu -->
  
  
                <div class="navbar1 align-self-center d-flex mb-3 ">
                    <!-- tìm kiếm -->
                    <a class="nav-icon d-none d-lg-inline" href="#" data-toggle="modal"
                        data-target="#templatemo_search">
                        <i class="fa fa-lg fa-search text-dark mr-2" style=" margin-top:12px"></i>
                    </a>
  
                    <!-- Modal -->
                    <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="w-100 pt-1 mb-5 text-right">
                                <button type="button" class="close" id="closeButton" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form @submit.prevent="searchProducts"
                                class="modal-content modal-body border-0 p-0">
                                <div class="input-group mb-2">
                                    <input type="search" class="form-control" placeholder="Tìm kiếm ..."
                                        v-model="searchQuery">
                                    <div class="input-group-append">
                                        <button type="submit" class="input-group-text bg-success text-light">
                                            <i class="fa fa-lg fa-search text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- giỏ hàng -->
                    <div class="nav-icon position-relative text-decoration-none">
                        <router-link class="nav-link" to="/cart-products">
                            <i class="fa fa-lg fa-cart-arrow-down text-dark mr-1 "></i>
                            <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                                {{ cartItemCount }}
                            </span>
                        </router-link>
                    </div>
  
                    <!-- yêu thích -->
                    <div class="nav-icon position-relative text-decoration-none">
                        <router-link class="nav-link" to="/whist-list">
                            <i class="fa fa-lg fa-heart" aria-hidden="true"></i>
                            <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                                {{ whistListCount }}
                            </span>
                        </router-link>
                    </div>
                <!-- account -->
                    <div class="dropdown">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                           
                                <div v-if="img">
                                    <router-link to="/profile" v-if="loggedIn"> 
                                <img :src="img" alt="User Photo" class="rounded-image"> {{name}}
                            </router-link>
                                </div>
                            
                            <div v-else>
                                    <i class="fa fa-lg fa-user" aria-hidden="true"></i> {{name}}
                                </div>
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">
                                <router-link to="/sign-in" v-if="!loggedIn">Đăng nhập</router-link>
                            </li>
                            <li class="dropdown-item" >
                                <router-link to="/sign-up" v-if="!loggedIn">Đăng ký</router-link>
                            </li>
                            <li class="dropdown-item">
                                <router-link to="/my-order" v-if="loggedIn">Đơn hàng của tôi</router-link>
                            </li>
                            <li class="dropdown-item" >
                                <router-link to="/profile" v-if="loggedIn">Tài khoản</router-link>
                            </li>
                            <li class="dropdown-item" >
                                <button class=" badge badge-secondary" @click="logout" v-if="loggedIn">Đăng xuất</button>
                            </li>
                        </ul>
                    </div>
                   
                </div>
            </div>
        </div>
    </nav>
    <!-- Close Header -->
  
  </template>
  <script>
  import { auth, firestore } from "../firebase";
  import {  doc, getDoc  } from "firebase/firestore";
  export default {
    name: "HeaderComponent",
    computed: {
        loggedIn() {
            return this.$store.state.user !== null // true
        },
        cartItemCount() {
            return this.$store.state.cartItemCount; //giỏ hàng
        },
  
        whistListCount() {
            return this.$store.state.whistListCount; //yêu thích
        },
        isHomeSelected() {
            return this.$route.path === '/';
        },
        isShopSelected() {
            return this.$route.path === '/all-products';
        },
    },
    mounted() {
        this.fetchData(); // Gọi phương thức fetchData khi component được tạo
    },
    methods: {
        logout() {
            if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                this.$store.dispatch('logout'); // Gọi action 'logout' từ Vuex store
            }
        },
        searchProducts() {
            console.log('+++++++++++++++++' + this.searchQuery);
            // Chuyển hướng đến trang kết quả tìm kiếm với query parameter
            this.closeModal();
            this.$router.push({
                name: 'SearchResults',
                query: {
                    query: this.searchQuery
                }
            });
            //mới show text à chưa gọi view text
            //tạo view là đc
  
        },
  
        // Lấy data của menus, categories
        async fetchData() {
            try {
                const [categoriesResponse, menusResponse] = await Promise.all([
                    fetch("http://localhost:3000/categories"),
                    fetch("http://localhost:3000/menus"),
                ]);
  
                if (!categoriesResponse.ok || !menusResponse.ok) {
                    throw new Error("Không thể tải dữ liệu");
                }
  
                const [categoriesData, menusData] = await Promise.all([
                    categoriesResponse.json(),
                    menusResponse.json(),
                ]);
  
                this.categories = categoriesData;
                this.menus = menusData;
            } catch (error) {
                console.error(error);
            }
        },
        filteredCategories(menuType) {
            // Lọc các danh mục theo menuType
            return this.categories.filter(category => category.menuType === menuType);
        },
        getProductsByMenuType(menuType) {
            // Lọc danh sách sản phẩm dựa trên menuType của từng menu trong mảng menus
            const products = [];
            this.menus.forEach(menu => {
                if (menu.menuType === menuType) {
                    this.categories.forEach(category => {
                        if (category.menuType === menuType) {
                            products.push(category);
                        }
                    });
                }
            });
            return products;
        },
        // Đóng modal
        closeModal() {
            const closeButton = document.getElementById('closeButton');
            if (closeButton) {
                closeButton.click();
            }
        },
    },
    watch: {
        // Theo dõi sự thay đổi của categories
        categories: {
            handler() {
                // Gọi lại fetchData khi categories thay đổi
                this.fetchData();
            },
            deep: true // Theo dõi sâu các phần tử của mảng
        }
    },
    data() {
        return {
            searchQuery: '', // Khởi tạo giá trị mặc định cho searchQuery
            categories: [], // Danh sách các danh mục
            menuTypes: [], // Danh sách các loại menu
            menus: [],
            name: null,
            img: null,
        };
    },
    created() {
        auth.onAuthStateChanged(async user => {
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
                       
                    } else {
                        // Nếu tài liệu không tồn tại
                        this.name = null;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    this.name = null;
                }
            } else {
                // No user is signed in.
                this.name = null;
              
                this.img = null;
            }
        });
    }
   
  };
  </script>
  <style scoped>
  .router-link-exact-active {
    color: yellow !important;
}

/* Màu khi hover ở trang khác */
.nav-item:hover .nav-link:not(.router-link-exact-active) {
    color: green !important;
}
  .navbar1 {
    box-shadow: none;
  }
  
  .sub-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    z-index: 1;
  }
  
  .sub-menu-item {
    display: block;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
  }
  
  .nav-item:hover .sub-menu {
    display: block;
  }
.rounded-image {
    border-radius: 50%;
    width: 40px; 
    height: 40px;
}

  
  </style>
  