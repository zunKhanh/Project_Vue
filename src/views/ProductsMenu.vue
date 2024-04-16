<template>
  <header-component></header-component>
  <div style="margin-top: 150px;">
  </div>
  <div class="container">
    <h1>{{ menuType }}</h1>
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
    <div class="row" v-for="category in filteredCategories" :key="category.category">
      <h3>{{ category.category }}</h3>
      <product-card v-for="product in sortedAndFilteredProducts(category.products) " :key="product.id"
        :product="product" class="col-12 col-md-3 mb-4" />
    </div>
  </div>
  <footer-component></footer-component>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: 'ProductsMenu',
  components: {
    ProductCard,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      menuType: '',
      products: [],
      categories: [],

      notification: '', // Lưu trữ thông báo ở đây
      priceRange: {
        start: null, // Giá bắt đầu mặc định
        end: null // Giá kết thúc mặc định
      },
      sortOrder: 'low-to-high', // Mặc định sắp xếp từ cao đến thấp
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => category.menuType === this.menuType);
    },
    sortedAndFilteredProducts() {
      return (products) => {
        return products.filter(product => {
          const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/,/g, '')) : product.price;
          let start = this.priceRange.start;
          let end = this.priceRange.end;
          start = start === '' ? null : start;
          end = end === '' ? null : end;
          const isInRange = (start === null || price >= start) && (end === null || price <= end);
          return isInRange;
        }).sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : b.price;
          return this.sortOrder === 'high-to-low' ? priceB - priceA : priceA - priceB;
        });
      };
    },

  },
  mounted() {
    this.menuType = this.$route.params.menuType;
    this.fetchData();
  },
  methods: {
    sortProducts() {
      // Không cần thực hiện gì ở đây vì computed property sẽ tự động sắp xếp lại
    },
    filterByPriceRange() {
      // Không cần thực hiện gì ở đây vì computed property sẽ tự động lọc lại
    },
    async fetchData() {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:3000/sanpham'),
          fetch('http://localhost:3000/categories'),
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

        // Gán sản phẩm vào danh mục tương ứng
        this.categories.forEach(category => {
          category.products = this.products.filter(product => product.category === category.category);
        });
      } catch (error) {
        console.error(error);
      }
    },

  },
  watch: {
    '$route.params.menuType'(newMenuType, oldMenuType) {
      if (newMenuType !== oldMenuType) {
        this.menuType = newMenuType;
        this.fetchData();
        console.log(`menu thay đổi từ ${oldMenuType} sang ${newMenuType}`);
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
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
