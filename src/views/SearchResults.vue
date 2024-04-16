<template>
  <header-component></header-component>
  <div>
    <section class="container py-5">
      <div class="row">
        <div class="col-md-6">
          <h2>Từ khóa tìm kiếm: "{{ searchQuery }}"</h2> <!-- Hiển thị từ khóa tìm kiếm -->

        </div>
        <!-- tìm theo khoảng giá -->
        <div class="col-md-4">
          <div class="row mb-4">
            <div class="col-md-6">
              <input v-model.number="priceRange.start" type="number" class="form-control" placeholder="Giá bắt đầu">
            </div>
            <div class="col-md-6">
              <input v-model.number="priceRange.end" type="number" class="form-control" placeholder="Giá kết thúc">
            </div>
          </div>
          <div v-if="notification" class="alert alert-warning" role="alert">
            {{ notification }}
          </div>
        </div>

        <div class="row">
          <product-card v-for="product in paginatedProducts" :key="product.id" :product="product"
            class="col-12 col-md-3 mb-4" />
        </div>
      </div>
      <!-- Phân trang -->
      <nav aria-label="Page navigation example ">
        <ul class="pagination justify-content-center ">
          <li class="page-item">
            <a class="page-link" @click="previous" :disabled="currentPage === 1">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" :disabled="currentPage === 1" @click="previousPage" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link">{{ currentPage }}</a></li>

          <li class="page-item">
            <a class="page-link" @click="nextPage" :disabled="currentPage === totalPages" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" @click="next" :disabled="currentPage === totalPages">Next</a>
          </li>
        </ul>
      </nav>
    </section>
  </div>
  <footer-component></footer-component>
</template>

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
      priceRange: {
        start: null, // Giá bắt đầu mặc định
        end: null // Giá kết thúc mặc định
      },
      notification: '', // Lưu trữ thông báo ở đây
      searchQuery: this.$route.query.query, // Lấy từ khóa tìm kiếm từ query parameter
      products: [],
      filteredProducts: [], // Mảng chứa kết quả tìm kiếm

      currentPage: 1, // Trang hiện tại
      perPage: 12 // Số sản phẩm trên mỗi trang
    };
  },

  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    }
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
      // lọc sản phẩm 
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product => {
          const nameMatch = this.removeVietnameseTones(product.name.toLowerCase()).includes(
            this.removeVietnameseTones(this.searchQuery.toLowerCase())
          );

          // lọc giá 
          const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/,/g, '')) : product.price;
          const priceMatch = (this.priceRange.start === null || price >= this.priceRange.start) &&
            (this.priceRange.end === null || price <= this.priceRange.end);
          return nameMatch && priceMatch;
        });
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    previous() {
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    next() {
      this.currentPage = this.totalPages;
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
    },

    'priceRange.start'(newVal, oldVal) {
      console.log(`Giá bắt đầu thay đổi từ ${oldVal} thành ${newVal}`);
      if (newVal < 0) {
        this.notification = 'Giá bắt đầu không thể là số âm.';
      } else if (newVal > this.priceRange.end) {
        this.notification = 'Giá bắt đầu không thể lớn hơn giá kết thúc.';
      } else {
        this.notification = '';
        this.filterProducts(); // Gọi hàm lọc sản phẩm sau khi cả hai giá trị đã được cập nhật
      }
    },
    'priceRange.end'(newVal, oldVal) {
      console.log(`Giá kết thúc thay đổi từ ${oldVal} thành ${newVal}`);
      if (newVal < 0) {
        this.notification = 'Giá kết thúc không thể là số âm.';
      } else if (this.priceRange.start > newVal) {
        this.notification = 'Giá kết thúc không thể nhỏ hơn giá bắt đầu.';
      } else {
        this.notification = '';
        this.filterProducts(); // Gọi hàm lọc sản phẩm sau khi cả hai giá trị đã được cập nhật
      }
    }

  },

  mounted() {
    this.fetchProducts(); // Gọi hàm để lấy dữ liệu sản phẩm từ server khi component được tạo
  }

};
</script>
