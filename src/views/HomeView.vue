<template>
  <!-- <header-componnet-vue></header-componnet-vue> -->
  <div>
    <!-- Start Banner Hero -->
    <div id="template-mo-zay-hero-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#template-mo-zay-hero-carousel" data-slide-to="0" class="active"></li>
        <li data-target="#template-mo-zay-hero-carousel" data-slide-to="1"></li>
        <li data-target="#template-mo-zay-hero-carousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="container">
            <div class="row p-5">
              <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img class="img-fluid" src="../assets/main/img/banner_img_03-removebg-preview.png" alt="">
              </div>
              <div class="col-lg-6 mb-0 d-flex align-items-center">
                <div class="text-align-left align-self-center">
                  <h3 class="uppercase"><strong>&nbsp;New</strong></h3>
                  <h2 class="uppercase"><strong>style 2020</strong></h2>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                    ut laoreet dolore magna aliquam erat volutpat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="container">
            <div class="row p-5">
              <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img class="img-fluid" src="../assets/main/img/banner_img_02-removebg-preview.png" alt="">
              </div>
              <div class="col-lg-6 mb-0 d-flex align-items-center">
                <div class="text-align-left">
                  <h1 class="h1">Proident occaecat</h1>
                  <h3 class="h2">Aliquip ex ea commodo consequat</h3>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                    ut laoreet dolore magna aliquam erat volutpat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="container">
            <div class="row p-5">
              <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img class="img-fluid" src="../assets/main/img/banner_img_01-removebg-preview.png" alt="">
              </div>
              <div class="col-lg-6 mb-0 d-flex align-items-center">
                <div class="text-align-left">
                  <h1 class="h1">Repr in voluptate</h1>
                  <h3 class="h2">Ullamco laboris nisi ut </h3>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                    ut laoreet dolore magna aliquam erat volutpat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel"
        role="button" data-slide="prev">
        <!-- <span class="carousel-control-prev-icon text-success"></span> -->

        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel"
        role="button" data-slide="next">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    </div>
    <!-- End Banner Hero -->


    <!-- Start Categories of The Month -->
    <div class="container-fluid py-5">
      <section class="container py-5">
        <div v-for="(category, index) in categorizedProducts" :key="index">
          <h1 class="h1">{{ category.name }}</h1>
          <div class="row">
            <!-- Loop through the first 4 products -->
            <product-card v-for="product in category.products.slice(0, 4)" :key="product.id" :product="product"
              class="col-12 col-md-3 mb-4" />
            <!-- Loop through the next 2 products -->
            <!-- <product-card v-for="product in category.products.slice(4, 6)" :key="product.id" :product="product"
            class="col-12 col-md-3 mb-4" style="margin-left:200px;" /> -->
          </div>
        </div>

      </section>
    </div>
    <!-- End Categories of The Month -->


    <!-- Start Featured Product -->
    <section class="bg-light">
      <div class="container py-5">
        <div class="row text-center py-3">
          <div class="col-lg-6 m-auto">
            <h1 class="h1">Sản phẩm nổi bật</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <a href="shop-single.html">
                <img src="../assets/main/img/feature_prod_01.jpg" class="card-img-top" alt="...">
              </a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li>
                    <i class="text-warning fa fa-star"></i>
                    <i class="text-warning fa fa-star"></i>
                    <i class="text-warning fa fa-star"></i>
                    <i class="text-muted fa fa-star"></i>
                    <i class="text-muted fa fa-star"></i>
                  </li>
                  <li class="text-muted text-right">$240.00</li>
                </ul>
                <a href="shop-single.html" class="h2 text-decoration-none text-dark">Gym Weight</a>
                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                </p>
                <p class="text-muted">Reviews (24)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Featured Product -->
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      // Khởi tạo mảng sản phẩm rỗng
      products: []
    };
  },
  computed: {
    categorizedProducts() {
      const categories = {};
      // Nhóm sản phẩm theo danh mục
      this.products.forEach(product => {
        if (!categories[product.category]) {
          categories[product.category] = [];
        }
        categories[product.category].push(product);
      });

      // Chuyển đổi object thành mảng các object
      return Object.keys(categories).map(category => ({
        name: category,
        products: categories[category]
      }));
    }
  },
  mounted() {
    this.fetchProducts(); // Gọi hàm để lấy dữ liệu sản phẩm khi component được mount
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/sanpham');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data; // Gán dữ liệu lấy được vào mảng sản phẩm
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>
<style>
@import "../assets/main/css/bootstrap.min.css";
@import "../assets/main/css/custom.css";
@import "../assets/main/css/slick-theme.css";
@import "../assets/main/css/slick-theme.css";
@import "../assets/main/css/fontawesome.css";
@import "../assets/main/css/fontawesome.min.css";
@import "../assets/main/css/slick.min.css";
@import "../assets/main/css/templatemo.css";
@import "../assets/main/css/templatemo.min.css";
</style>