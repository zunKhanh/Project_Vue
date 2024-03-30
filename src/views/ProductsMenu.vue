<template>
  <div class="container">
    <h1>{{ menuType }}</h1>
    <div class="row" v-for="category in filteredCategories" :key="category.category">
      <h3>{{ category.category }}</h3>
      <product-card v-for="product in category.products" :key="product.id"  :product="product"
        class="col-12 col-md-3 mb-4" />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: 'ProductsMenu',
  components: {
    ProductCard
  },
  data() {
    return {
      menuType: '',
      products: [],
      categories: [],
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => category.menuType === this.menuType);
    },
  },
  mounted() {
    this.menuType = this.$route.params.menuType;
    this.fetchData();
  },
  methods: {
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
    }
  },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
