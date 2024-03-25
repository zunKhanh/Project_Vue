<template>
  <div>
    <section class="container py-5">
      <h2>Từ khóa tìm kiếm: "{{ searchQuery }}"</h2> <!-- Hiển thị từ khóa tìm kiếm -->
      <div class="row">
        <product-card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="col-12 col-md-3 mb-4"
        />
      </div>
    </section>
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
      searchQuery: this.$route.query.query, // Lấy từ khóa tìm kiếm từ query parameter
      products: [],
      filteredProducts: [] // Mảng chứa kết quả tìm kiếm
    };
  },
  methods: {
      removeVietnameseTones(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Mũ, trăng, kề
      return str;
    },
        async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/sanpham');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data; // Gán dữ liệu lấy được vào mảng sản phẩm
                this.filterProducts(); // Gọi hàm lọc sản phẩm ngay sau khi dữ liệu được lấy
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
   filterProducts() {
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product =>
          this.removeVietnameseTones(product.name.toLowerCase()).includes(
            this.removeVietnameseTones(this.searchQuery.toLowerCase())
          )
        );
      }
    }
  },
    watch: {
    // Thêm một watcher để theo dõi sự thay đổi của $route
    '$route.query.query': {
      immediate: true, // Đảm bảo hàm chạy ngay khi component được tải
      handler(newQuery) {
        this.searchQuery = newQuery || '';
        this.filterProducts();
      }
    }
  },
  mounted() {
    this.fetchProducts(); // Gọi hàm để lấy dữ liệu sản phẩm từ server khi component được tạo
  }

};
</script>
