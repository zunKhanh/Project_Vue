<template>
  <div class="container py-5">
    <h2 class="mb-4">Tất Cả Sản Phẩm</h2>
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
      <product-card v-for="product in sortedAndFilteredProducts" :key="product.id" :product="product"
        class="col-12 col-md-3 mb-4" />
    </div>
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

        // Xử lý khi priceRange.start hoặc priceRange.end là null
        let start = this.priceRange.start;
        let end = this.priceRange.end;

        // Nếu người dùng xóa trường, start hoặc end có thể là chuỗi rỗng
        // Chuyển đổi chuỗi rỗng thành null để hiển thị tất cả sản phẩm
        start = start === '' ? null : start;
        end = end === '' ? null : end;

        // Nếu start hoặc end là null, không áp dụng bộ lọc cho giá trị đó
        const isInRange =
          (start === null || price >= start) &&
          (end === null || price <= end);

        return isInRange;
      }).sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : b.price;
        return this.sortOrder === 'high-to-low' ? priceB - priceA : priceA - priceB;
      });
    }
  },




  methods: {
    sortProducts() {
      // Đã tự động sắp xếp khi computed property `sortedAndFilteredProducts` được gọi lại do `sortOrder` thay đổi
    },
    filterByPriceRange() {
      // Bạn có thể sử dụng phương thức này nếu muốn thực hiện hành động nào đó khi người dùng nhấn nút lọc
      // Trong trường hợp này, `sortedAndFilteredProducts` computed property đã tự động xử lý việc lọc
    },
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
