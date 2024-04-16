<template>
  <header-component></header-component>
  <div >
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
<h1 id="discountedProductsTitle" style="margin-left:140px; margin-bottom:-50px; margin-top:50px;">Sản phẩm giảm giá</h1>
  <div class="container-fluid py-5">
    <section class="container py-5">
      <div class="row">
        <!-- Hiển thị các sản phẩm giảm giá -->
        <product-card v-for="(product, index) in displayedDiscountedProducts" :key="index" class="col-12 col-md-3 mb-4" :product="product" />
      </div>
      <!-- Nút "Xem thêm" và "Ẩn bớt" -->
      <div class="text-center">
   <button v-if="showMoreButton" @click="showMoreProducts" class="button">Xem thêm</button>
<button v-if="showLessButton" @click="showLessProducts" class="button">Ẩn bớt</button>

      </div>
    </section>
  </div>


    <div class="container-fluid py-5">
      <section class="container py-5">
        <div v-for="(category, index) in categorizedProducts" :key="index">
          <h1 class="h1">{{ category.name }}</h1>
          <div class="row">
            <!-- Loop through the first 4 products -->
            <product-card v-for="product in category.products.slice(0, 4)" :key="product.id" :product="product"
              class="col-12 col-md-3 mb-4" />

          </div>
        </div>

      </section>
    </div>
    <!-- End Categories of The Month -->


  </div>
  <footer-component></footer-component>
</template>
<style scoped>
/* CSS cho nút "Xem thêm" và "Ẩn bớt" */
.button {
  background-color: #4CAF50; /* Màu xanh lá cây */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px; /* Bo góc */
  transition: background-color 0.3s; /* Hiệu ứng chuyển đổi màu nền */
}

/* Hiệu ứng khi hover */
.button:hover {
  background-color: #45a049; /* Màu xanh lá cây nhạt khi hover */
}
</style>

<script>
import ProductCard from "@/components/ProductCard.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    ProductCard,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      // Khởi tạo mảng sản phẩm rỗng
      products: [],
        displayedDiscountedProducts: [], // Mảng sản phẩm giảm giá được hiển thị
      startIndex: 0, // Vị trí bắt đầu hiển thị sản phẩm
      itemsPerPage: 8 // Số sản phẩm hiển thị mỗi lần
    };
  },
  computed: {
  discountedProducts() {
    return this.products.filter(product => product.Categorizat === "Giảm giá");
  },
 showMoreButton() {
    return this.startIndex + this.itemsPerPage < this.discountedProducts.length && this.displayedDiscountedProducts.length < this.discountedProducts.length;
  },
  showLessButton() {
    return this.displayedDiscountedProducts.length > this.itemsPerPage;
  },
  //hàm nà
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
  showMoreProducts() {
    const startIndex = this.displayedDiscountedProducts.length;
    const endIndex = startIndex + this.itemsPerPage;
    const newProducts = this.discountedProducts.slice(startIndex, endIndex);
    this.displayedDiscountedProducts = this.displayedDiscountedProducts.concat(newProducts);
  },
    // hàm này dùng cho button xem thêm, nó sẽ tồn tại khi còn sàn phẩm chưa được show ra, khi được show hết, nó sẽ tạm ẩn.
  showLessProducts() {
      this.startIndex = Math.max(0, this.startIndex - this.itemsPerPage);
      this.updateDisplayedProducts();
          this.scrollToProducts(); // Cuộn đến vị trí sản phẩm giảm giá

    },
    // hàm này sẽ ẩn hết đi các sản phẩm giảm giá khi click xem thêm
      scrollToProducts() {
    document.getElementById("discountedProductsTitle").scrollIntoView({ behavior: 'smooth' });
  },
    // Cập nhật mảng sản phẩm được hiển thị
      updateDisplayedProducts() {
      this.displayedDiscountedProducts = this.discountedProducts.slice(this.startIndex, this.startIndex + this.itemsPerPage);
    },
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/sanpham');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
   const data = await response.json();
      this.products = data; // Gán dữ liệu lấy được vào mảng sản phẩm
      this.updateDisplayedProducts(); // Cập nhật mảng sản phẩm được hiển thị ban đầu

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