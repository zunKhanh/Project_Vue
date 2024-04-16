<template>
  <div class="col-md-6 col-lg-4 col-xl-3">
    <div class="card h-100" style="height:500px;" @click="goToProductDetail(product.id)">
      <img :src="getImageUrl(product.image)" class="card-img-top" :alt="`Image of ${product.name}`">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
      <div v-if="product.Categorizat === 'Giảm giá'" class="d-flex flex-column justify-content-between">
          <!-- Kiểm tra xem trường giảm giá có tồn tại trong sản phẩm này, nếu nó tồn tại, sẽ hiển thị ra trường giá gốc và giá sale -->
        
         <span class="text-muted" >Giá gốc <span style="text-decoration: line-through;" >{{ product.giagoc }} VND</span></span>
          <span class="text-danger" >Giá sale: {{ formattedPrice(product.price) }} VND</span>
        </div>
                  <!-- Nếu ko tồn tại, hiển thị ra trường giá như bình thường -->
         <div v-else class="d-flex justify-content-between">
          <span class="text-muted">{{ formattedPrice(product.price) }} VND</span>
        </div>
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

<style>
.icon {
  position: absolute;
  top: 30px;
  right: 10px;
  width: 50px;
}
</style>
