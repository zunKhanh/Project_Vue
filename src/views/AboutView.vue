<template >
  <!-- <header-componnet-vue></header-componnet-vue> -->
  <div>
         <!-- Start Banner Hero -->
  <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
      <ol class="carousel-indicators">
          <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
          <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
          <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
          <div class="carousel-item active">
              <div class="container">
                  <div class="row p-5">
                      <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                          <img class="img-fluid" src="../assets/main/img/banner_img_01.jpg" alt="">
                      </div>
                      <div class="col-lg-6 mb-0 d-flex align-items-center">
                          <div class="text-align-left align-self-center">
                              <h1 class="h1 text-success"><b>Zay</b> eCommerce</h1>
                              <h3 class="h2">Tiny and Perfect eCommerce Template</h3>
                              <p>
                                  Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1). 
                                  This template is 100% free provided by <a rel="sponsored" class="text-success" href="https://templatemo.com" target="_blank">TemplateMo</a> website. 
                                  Image credits go to <a rel="sponsored" class="text-success" href="https://stories.freepik.com/" target="_blank">Freepik Stories</a>,
                                  <a rel="sponsored" class="text-success" href="https://unsplash.com/" target="_blank">Unsplash</a> and
                                  <a rel="sponsored" class="text-success" href="https://icons8.com/" target="_blank">Icons 8</a>.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="carousel-item">
              <div class="container">
                  <div class="row p-5">
                      <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                          <img class="img-fluid" src="../assets/main/img/banner_img_02.jpg" alt="">
                      </div>
                      <div class="col-lg-6 mb-0 d-flex align-items-center">
                          <div class="text-align-left">
                              <h1 class="h1">Proident occaecat</h1>
                              <h3 class="h2">Aliquip ex ea commodo consequat</h3>
                              <p>
                                  You are permitted to use this Zay CSS template for your commercial websites. 
                                  You are <strong>not permitted</strong> to re-distribute the template ZIP file in any kind of template collection websites.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="carousel-item">
              <div class="container">
                  <div class="row p-5">
                      <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                          <img class="img-fluid" src="../assets/main/img/banner_img_03.jpg" alt="">
                      </div>
                      <div class="col-lg-6 mb-0 d-flex align-items-center">
                          <div class="text-align-left">
                              <h1 class="h1">Repr in voluptate</h1>
                              <h3 class="h2">Ullamco laboris nisi ut </h3>
                              <p>
                                  We bring you 100% free CSS templates for your websites. 
                                  If you wish to support TemplateMo, please make a small contribution via PayPal or tell your friends about our website. Thank you.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
          <i class="fas fa-chevron-left"></i>
      </a>
      <a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
          <i class="fas fa-chevron-right"></i>
      </a>
  </div>
  <!-- End Banner Hero -->


  <!-- Start Categories of The Month -->
<section class="container py-5">
<div v-for="(category, index) in categorizedProducts" :key="index">
      <h1 class="h1">{{ category.name }}</h1>
      <div class="row">
        <!-- Loop through the first 4 products -->
        <product-card
          v-for="product in category.products.slice(0, 4)"
          :key="product.id"
          :product="product"
          class="col-12 col-md-3 mb-4"
        />
        <!-- Loop through the next 2 products -->
        <product-card
          v-for="product in category.products.slice(4, 6)"
          :key="product.id"
          :product="product"
          class="col-12 col-md-3 mb-4" style="margin-left:200px;"
          />
      </div>
    </div>
    
  </section>
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
  <!-- <footer-component-vue></footer-component-vue> -->
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
<style >
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