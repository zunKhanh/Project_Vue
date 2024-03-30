<template>
  <section class="breadcrumb-section section-b-space" style="padding-top:20px;padding-bottom:20px;">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>Shop</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://localhost:8080/">
                  <i class="fas fa-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Tất cả sản phẩm</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>



  <div class="container py-5 ">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-4">
          <select v-model="sortOrder" @change="sortProducts" class="form-select">
            <option value="high-to-low">Giá: Cao đến Thấp</option>
            <option value="low-to-high">Giá: Thấp đến Cao</option>
          </select>
        </div>
      </div>
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
    </div>
    <div class="row">
      <product-card v-for="product in paginatedProducts" :key="product.id" :product="product"
        class="col-12 col-md-3 mb-4" />
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
      products: [], // Khởi tạo mảng sản phẩm rỗng
      sortOrder: 'low-to-high', // Mặc định sắp xếp từ cao đến thấp
      priceRange: {
        start: null, // Giá bắt đầu mặc định
        end: null // Giá kết thúc mặc định
      },
      notification: '', // Lưu trữ thông báo ở đây
      currentPage: 1, // Trang hiện tại
      perPage: 12 // Số sản phẩm trên mỗi trang
    };
  },
  mounted() {
    this.fetchProducts(); // Gọi hàm để lấy dữ liệu sản phẩm khi component được mount
  },
  watch: {
    'priceRange.start'(newVal, oldVal) {
      console.log(`Giá bắt đầu thay đổi từ ${oldVal} thành ${newVal}`);
      if (newVal < 0) {
        this.notification = 'Giá bắt đầu không thể là số âm.';
      } else if (newVal > this.priceRange.end) {
        this.notification = 'Giá bắt đầu không thể lớn hơn giá kết thúc.';
      } else {
        this.notification = '';
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
      }
    }
  },

  computed: {
    formattedPrice() {
      return this.$store.getters.formatPrice;
    },
    sortedAndFilteredProducts() {
      return this.products.filter(product => {
        const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/,/g, '')) : product.price;
        let start = this.priceRange.start;
        let end = this.priceRange.end;
        start = start === '' ? null : start;
        end = end === '' ? null : end;
        const isInRange =
          (start === null || price >= start) &&
          (end === null || price <= end);
        return isInRange;
      }).sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : b.price;
        return this.sortOrder === 'high-to-low' ? priceB - priceA : priceA - priceB;
      });
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.sortedAndFilteredProducts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.sortedAndFilteredProducts.length / this.perPage);
    },
  },


  methods: {
    sortProducts() {
      // Không cần thực hiện gì ở đây vì computed property sẽ tự động sắp xếp lại
    },
    filterByPriceRange() {
      // Không cần thực hiện gì ở đây vì computed property sẽ tự động lọc lại
    },
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/sanpham');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
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
}
</script>



<style>
.breadcrumb {
  background-color: #eff2f7;
}

.breadcrumb-section {
  background-color: #eff2f7;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  position: relative;
  z-index: 0;
}

.breadcrumb-section h3 {
  font-size: calc(20px + (26 - 20) * ((100vw - 320px) / (1920 - 320)));
}

.breadcrumb-section-1 {
  background-color: #e9e9e9;
}

.breadcrumb-section .breadcrumb-item.active {
  color: #7e7e7e;
}

.breadcrumb-section .breadcrumb {
  margin-bottom: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 10px;
}
</style>
