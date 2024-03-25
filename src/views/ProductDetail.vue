<template>
  <div class="row">
    <div class="col-md-6">
      <div class="product-detail">
        <div class="row">
          <div class="col-md-12">
            <h1>{{ product.name }}</h1>
          </div>
        </div>
        <img :src="selectedImage" alt="Main product image" class="product-main-image" />
        <div class="product-thumbnails-container">
          <div class="product-thumbnails-row" v-if="thumbnailImages.length > 0">
            <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(0, 2)" :key="`row-1-${thumbnail}`"
              @click="selectImage(getImageUrl(thumbnail))">
              <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
            </div>
          </div>
          <div class="product-thumbnails-row" v-if="thumbnailImages.length > 2">
            <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(2, 5)" :key="`row-2-${thumbnail}`"
              @click="selectImage(getImageUrl(thumbnail))">
              <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
            </div>
          </div>
          <div class="product-thumbnails-row" v-if="thumbnailImages.length > 5">
            <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(5, 7)" :key="`row-3-${thumbnail}`"
              @click="selectImage(getImageUrl(thumbnail))">
              <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4" style="margin-top: 200px">
      <div style="margin-top: -190px; margin-left: 50px">
        ngày sản xuất: {{ product.dateAvailable }}
      </div>
      <div style="margin-top: 100px">
        <b>{{ product.productDescription }}</b>
        <div class="size-selection">
          <label for="size">Chọn kích cỡ:</label>
          <div class="size-options">
            <button v-for="size in availableSizes" :key="size" :class="{ selected: selectedSize === size }"
              @click="selectSize(size)">
              {{ size }}
            </button>
          </div>
        </div>
        <div class="quantity-selection">
          <label for="quantity">Chọn số lượng:</label>
          <input type="number" id="quantity" v-model.number="quantity" min="1" />
        </div>
      </div>
      <div class="product-price " style="border: solid 2px red; margin-top: 50px">
        Chỉ với {{ formattedPrice(product.price) }}
      </div>
      <button @click="addToCart" class="btn-add-to-cart  " style="">
        Thêm vào giỏ hàng
      </button>
      <div class="product-rating">
        <span v-for="star in 5" :key="star" class="fa fa-star" :class="{ checked: star <= productRating }"></span>
      </div>
      <div @click="toggleFavourite" class="heart-icon">
        <span class="fa fa-heart" :class="{ 'is-favourite': isFavourite }"></span>
      </div>
    </div>
    <div class="col-md-2"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      product: {}, // Khởi tạo đối tượng sản phẩm rỗng
      selectedImage: '', // Ảnh được chọn để hiển thị làm ảnh chính
      thumbnailImages: [], // Khởi tạo mảng ảnh thumbnail rỗng
      productRating: 4, // Giả định mức đánh giá sản phẩm
      isFavourite: false, // Trạng thái yêu thích của sản phẩm
      availableSizes: [38, 39, 40, 41, 42, 43], // Các kích cỡ có sẵn
      selectedSize: null, // Kích cỡ được chọn
      quantity: 1, // Số lượng sản phẩm được chọn
    };
  },
  created() {
    this.fetchProduct(); // Lấy dữ liệu sản phẩm khi component được tạo
  },
  computed: {
    formattedPrice() {
      return this.$store.getters.formatPrice;
    },
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size; // Thay đổi kích cỡ được chọn
    },
    async fetchProduct() {
      const productId = this.$route.params.id; // Lấy id sản phẩm từ URL
      try {
        const response = await fetch(`http://localhost:3000/sanpham/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        this.product = product; // Cập nhật dữ liệu sản phẩm
        this.selectedImage = this.getImageUrl(product.image); // Cập nhật ảnh chính
        // Đúng cách cập nhật thumbnailImages, bao gồm cả ảnh chính và các ảnh phụ
        this.thumbnailImages = [product.image, ...(product.thumbnail || [])].map(this.getImageUrl);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    getImageUrl(imagePath) {
      // Sử dụng đường dẫn tĩnh từ server để lấy hình ảnh
      return `http://localhost:3000/${imagePath}`;
    },

    selectImage(imageSrc) {
      // Cập nhật ảnh chính được chọn
      this.selectedImage = imageSrc;
    },
    addToCart() {
      if (this.selectedSize && this.quantity > 0) {
        const item = {
          id: this.product.id,
          name: this.product.name,
          size: this.selectedSize,
          quantity: this.quantity,
          price: this.product.price,
          image: this.selectedImage
        };
        // Gọi mutation để thêm sản phẩm vào giỏ hàng
        this.$store.dispatch('addToCart', item);
        this.$store.dispatch('updateCartItemCount');
        // Reset số lượng và kích cỡ đã chọn sau khi thêm vào giỏ hàng
        this.selectedSize = null;
        // this.quantity = 1;
      } else {
        alert("Vui lòng chọn kích cỡ và số lượng hợp lệ!");
      }
    },
    toggleFavourite() {
      // Thay đổi trạng thái yêu thích
      this.isFavourite = !this.isFavourite;
    },
  },
};


</script>

<style>
.size-selection .size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.size-selection button {
  padding: 5px 15px;
  border: 1px solid rgb(84, 153, 84);
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  outline: none;
}

.size-selection button.selected {
  background-color: rgb(84, 153, 84);
  color: white;
}

/* Styles for quantity input */
.quantity-selection {
  margin-top: 10px;
}

.quantity-selection input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

/* Ensure size buttons are not too wide */
.size-selection button {
  max-width: calc(33.333% - 10px);
}

.product-detail {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
}

.product-main-image {
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
}

.hexagon-thumbnail {
  width: 86px;
  /* Reduced width to fit hexagons together */
  height: 100px;
  /* Reduced height to match your request */
  margin: 5px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.hexagon-thumbnail img {
  display: block;
  /* Ensure the img tag doesn't have any extra space around it */
  width: 100%;
  height: auto;
  /* Maintain aspect ratio */
  border: 5px solid brown;
  /* Default border color */
  transition: border-color 0.3s ease;
}

.hexagon-thumbnail:hover img {
  border-color: blue;
  /* Border color on hover */
  transform: scale(1.1);
}

.btn-add-to-cart {
  padding: 10px 20px;
  background-color: #ff5252;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.btn-add-to-cart:hover {
  background-color: #ff7979;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.fa-star {
  color: #ccc;
}

.fa-star.checked {
  color: #ffc107;
}

.heart-icon {
  color: red;
  cursor: pointer;
  font-size: 24px;
  animation: heartbeat 1s infinite;
  margin-top: 10px;
}

.fa-heart.is-favourite {
  color: #ff5252;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.product-thumbnails-container {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.product-thumbnails-row {
  display: flex;
  justify-content: center;
  margin-bottom: -20px;
  /* Overlap the hexagons vertically */
  margin-left: -250px;
}

.product-thumbnails-row:last-child {
  margin-bottom: 0;
  /* Không có chồng chéo cho hàng cuối cùng */
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>