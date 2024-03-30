<template>
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div class="row">
      <product-card v-for="(product, index) in products" :key="index"  :product="product"
        class="col-12 col-md-3 mb-4" />
    </div>
    </div>
  </template>
<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`http://localhost:3000/sanpham?category=${this.$route.params.category}`);
        if (!response.ok) {
          throw new Error('Không thể tải danh sách sản phẩm.');
        }
        const data = await response.json();
        this.products = data;
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
    },
   
  
  },
  watch: {
  '$route.params.category': function(newCategory, oldCategory) {
    // Load new products when category changes
    console.log(`Danh mục thay đổi từ ${oldCategory} thành ${newCategory}`);
    this.fetchProducts();
  }
}
  
}

</script>
<style lang="">
    
</style>