<template>
  <div class="card" style="height:500px;" @click="goToProductDetail(product.id)">
    <img :src="getImageUrl(product.image)" class="card-img-top" :alt="`Image of ${product.name}`">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="d-flex justify-content-between">
        <span class="text-muted">{{ formattedPrice(product.price) }} VND</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    formattedPrice() {
      return this.$store.getters.formatPrice;
    },
  },

  methods: {
    // Xóa hàm getImageUrl vì không cần thiết khi sử dụng đường dẫn URL trực tiếp
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    getImageUrl(imagePath) {
      // Trả về đường dẫn đến hình ảnh
      return require("@/assets" + imagePath);
    },
  }
}
</script>
