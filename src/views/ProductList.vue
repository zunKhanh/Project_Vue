<template>
  <header-component></header-component>
  <div style="margin-top: 150px;">
    <div class="container">
      <div v-for="category in filteredCategories" :key="category.category">
        <h2>Danh sách sản phẩm "{{ category.category }}"</h2>
        <br>
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
          <product-card v-for="(product, index) in sortedAndFilteredProducts(category.category)" :key="index"
            :product="product" class="col-12 col-md-3 mb-4" />
        </div>
        <div v-if="sortedAndFilteredProducts(category.category).length === 0" class="alert alert-warning" role="alert">
          Không có sản phẩm nào phù hợp với bộ lọc và phân loại này.
        </div>

        
      </div>
    </div>
  </div>
  <footer-component></footer-component>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: 'ProductList',
  components: {
    ProductCard,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      categories: [], // Danh sách các categories
      products: [], // Danh sách các sản phẩm
      notification: '', // Lưu trữ thông báo ở đây
      priceRange: {
        start: null, // Giá bắt đầu mặc định
        end: null // Giá kết thúc mặc định
      },
      sortOrder: 'low-to-high', // Mặc định sắp xếp từ cao đến thấp
      currentPage: 1, // Trang hiện tại
      perPage: 12, // Số sản phẩm trên mỗi trang
    };
  },
  created() {
    this.fetchProducts();
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
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`http://localhost:3000/sanpham?category=${this.$route.params.category}`),
          fetch(`http://localhost:3000/categories`),
        ]);
        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Không thể tải dữ liệu');
        }

        const [productsData, categoriesData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);

        this.products = productsData;
        this.categories = categoriesData;

      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    filteredCategories() {
      // Lọc danh sách categories dựa trên category từ route params
      return this.categories.filter(category => category.category === this.$route.params.category);
    },

    sortedAndFilteredProducts() {
      return (category) => {
        return this.products.filter(product => {
          const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/,/g, '')) : product.price;
          let start = this.priceRange.start;
          let end = this.priceRange.end;
          start = start === '' ? null : start;
          end = end === '' ? null : end;
          const isInRange =
            (start === null || price >= start) &&
            (end === null || price <= end);
          return isInRange && product.category === category;
        }).sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : b.price;
          return this.sortOrder === 'high-to-low' ? priceB - priceA : priceA - priceB;
        });
      };
    },
  },
  watch: {
    '$route.params.category': function (newCategory, oldCategory) {
      // Load new products when category changes
      console.log(`Danh mục thay đổi từ ${oldCategory} thành ${newCategory}`);
      this.fetchProducts();
    },

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
  }
}
</script>

<style lang="">

</style>
