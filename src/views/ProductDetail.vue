<template>

  <section class="breadcrumb-section section-b-space" style="padding-top:20px;padding-bottom:20px;">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>{{ product.name }}</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://localhost:8080/">
                  <i class="fas fa-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.category }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>


  <div class=" row gx-4 gy-5 " style="padding-top:50px;padding-bottom:20px;">
    <div class="col-lg-12 col-12">
      <div class="product-detail">
        <div class="row g-4">
          <div class="col-md-5">
            <div class="row">
              <!-- main -->
              <div class="col-xl-10 col-lg-8 col-md-6" style="padding-left: 100px;">
                <div id="carousel-example-1" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" :src="selectedImage" alt="First slide">
                    </div>

                    <div class="carousel-item" v-for="(thumbnail, index) in thumbnailImages"
                      :key="`carousel-item-${index}`">
                      <div @click="selectImage(getImageUrl(thumbnail))">
                        <img class="d-block w-100" :src="getImageUrl(thumbnail)" alt="Second slide">
                      </div>
                    </div>
                  </div>

                  <a class="carousel-control-prev" href="#carousel-example-1" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carousel-example-1" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>


              <!-- thumbnail -->
              <div class="col-lg-2">
                <div class="product-thumbnails-container">
                  <div class="product-thumbnails-row" v-if="thumbnailImages.length > 0">
                    <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(0, 2)"
                      :key="`row-1-${thumbnail}`" @click="selectImage(getImageUrl(thumbnail))">
                      <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
                    </div>
                  </div>

                  <div class="product-thumbnails-row" v-if="thumbnailImages.length > 2">
                    <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(2, 5)"
                      :key="`row-2-${thumbnail}`" @click="selectImage(getImageUrl(thumbnail))">
                      <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
                    </div>
                  </div>

                  <div class="product-thumbnails-row" v-if="thumbnailImages.length > 5">
                    <div class="hexagon-thumbnail" v-for="thumbnail in thumbnailImages.slice(5, 7)"
                      :key="`row-3-${thumbnail}`" @click="selectImage(getImageUrl(thumbnail))">
                      <img :src="getImageUrl(thumbnail)" alt="Product thumbnail" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7" style="margin-top: 200px; padding-right: 50px; ">
            <div style="margin-top: -190px;">
              <h3>{{ product.name }}</h3>
              ngày sản xuất: {{ product.dateAvailable }}
            </div>
            <div class="product-rating">
              <span v-for="star in 5" :key="star" class="fa fa-star" :class="{ checked: star <= productRating }"></span>
            </div>

            <!-- giá tiền -->
            <div style="margin-top: 30px">
              <h3 class="text-danger">{{ formattedPrice(product.price) }}</h3>
            </div>

            <div style="margin-top: 50px ; margin-right: 200px;">
              <b>{{ product.productDescription }}</b>
              <div class="size-selection">
                <br>
                <label for="size">
                  <h4>Chọn size:</h4>
                </label>
                <div class="size-options">
                  <button v-for="size in availableSizes" :key="size" :class="{ selected: selectedSize === size }"
                    @click="selectSize(size)">
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- số lượng -->
              <div class="input-group quantity mt-4" style="width: 100px;">
                <div class="input-group-btn">
                  <button class="btn btn-sm btn-minus rounded-circle bg-light border" :disabled="quantity === 1"
                    @click="decrement()">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>

                <input type="text" class="form-control form-control-sm text-center border-0" id="quantity"
                  v-model.number="quantity" min="1" />

                <div class="input-group-btn">
                  <button class="btn btn-sm btn-plus rounded-circle bg-light border" @click=" increment()">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>


            <div class="card_area d-flex align-items-center">
              <!-- thêm giỏ hàng -->
              <button @click="addToCart" class=" mt-4 add-to-cart btn btn-default" type="submit" name="submit">
                <i class="fa fa-shopping-bag me-2 text-light"></i> Add to cart
              </button>

              <!-- yêu thích -->
              <div @click="toggleFavourite" class="heart-icon" style="margin-left: 30px;">
                <button class=" mt-1 add-to-cart btn btn-default">
                  <span class="fa fa-heart" :class="{ 'is-favourite': isFavourite }"></span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


  </div>

  <!-- bình luận -->
  <div class="container mt-5 ">
    <h3 class="text-center">Bình luận</h3>
    <div v-if="loggedIn" class="container">
      <div class="comment-section mt-5 ">
        <form @submit.prevent="submitComment">
          <h4 class="mb-5 fw-bold">Leave a Reply</h4>
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="border-bottom rounded">
                <input type="text" name="username" class="form-control border-0 me-4" placeholder="Your Name *"
                  v-model="username">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="border-bottom rounded">
                <input type="email" name="email" class="form-control border-0" placeholder="Your Email *"
                  v-model="email">
              </div>
            </div>
            <div class="col-lg-12">
              <div class="border-bottom rounded my-4">
                <textarea v-model="comment" name="comment" id="comment" class="form-control border-0" cols="30" rows="8"
                  placeholder="Your Review *" spellcheck="false">
              </textarea>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="d-flex justify-content-between py-3 mb-5">
                <div class="d-flex align-items-center">
                  <p class="mb-0 me-3">Please rate:</p>
                  <div class="d-flex align-items-center" style="font-size: 12px;">
                    <!-- Star rating -->
                    <div class="product-rating">
                      <span v-for="star in 5" :key="star" class="fa fa-star" :class="{ checked: star <= productRating }"
                        @click="rateProduct(star)"></span>
                    </div>
                  </div>
                </div>
                <input type="submit" style="justify-content: right;"
                  class="btn border border-secondary text-primary justify-content-end rounded-pill px-4 py-3"
                  id="submitButton" value="Bình Luận">
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Hiển thị bình luận và đánh giá -->

      <div class="col-12 mt-5">
        <h3 class="text-center">Đánh giá của khách hàng</h3>
        <div class="customer-rating">
          <div v-for="(review, index) in reviews" :key="index" class="customer-review">
            <span>{{ review.username }}</span>
            <span v-for="star in 5" :key="`review-${index}-star-${star}`" class="fa fa-star"
              :class="{ checked: star <= review.rating }">
            </span>
            <p><b>Bình luận:</b> {{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-center mt-5 ">Vui lòng đăng nhập để xem và đánh giá.</h3>
    </div>
  </div>
  <div style="margin-bottom: 200px;"></div>
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
      isLoggedIn: false,
      username: '',
      email: '',
      comment: '',// Nội dung bình luận
      reviews: []// Lưu trữ danh sách bình luận và đánh giá
    };
  },
  created() {
    this.fetchProduct(); // Lấy dữ liệu sản phẩm khi component được tạo

    // Tải reviews từ Local Storage
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.user !== null // true
    },
    formattedPrice() {
      return this.$store.getters.formatPrice;
    },
  },
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      this.quantity--;
    },
    selectSize(size) {
      this.selectedSize = size; // Thay đổi kích cỡ được chọn
    },
    async fetchProduct() {
      const productId = this.$route.params.id; // Lấy id sản phẩm từ URL
      try {
        const response = await fetch(`http://localhost:3000/sanpham/${productId}`);
        // const reviewsResponse = await fetch(`http://localhost:3000/binhluan?productId=${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        // const reviews = await reviewsResponse.json();
        this.product = product; // Cập nhật dữ liệu sản phẩm
        this.selectedImage = this.getImageUrl(product.image); // Cập nhật ảnh chính
        // Đúng cách cập nhật thumbnailImages, bao gồm cả ảnh chính và các ảnh phụ
        this.thumbnailImages = [product.image, ...(product.thumbnail || [])].map(this.getImageUrl);
        // this.reviews = reviews.filter(review => review.productId === productId);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    getImageUrl(imagePath) {
      if (imagePath && imagePath.indexOf('images') !== -1) {
        return require(`@/assets${imagePath}`)
      }
      if (imagePath && imagePath.indexOf('img') !== -1) {
        const imgSlice = imagePath.split(".").filter((item, index) => index !== 1)

        return require(`@/assets${imgSlice.join(".").replace("img", "images")}`)
      }

      return imagePath
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
      this.isFavourite = !this.isFavourite;
      const item = {
        id: this.product.id,
        name: this.product.name,
        size: this.selectedSize, // Nếu cần lưu kích thước vào danh sách yêu thích
        quantity: this.quantity, // Nếu cần lưu số lượng vào danh sách yêu thích
        price: this.product.price,
        image: this.selectedImage
      };
      // Thêm sản phẩm vào danh sách yêu thích
      this.$store.dispatch('addwhistList', item);
      // Cập nhật số lượng sản phẩm trong danh sách yêu thích
      this.$store.dispatch('updatewhistListCount');
    },


    rateProduct(star) {
      this.productRating = star;
    },
    submitComment() {
      const currentUsername = this.username;
      const newReview = {
        username: currentUsername,
        rating: this.productRating,
        comment: this.comment
      };
      this.reviews.push(newReview);
      // Lưu reviews vào Local Storage
      localStorage.setItem('reviews', JSON.stringify(this.reviews));

      // Reset form
      this.productRating = 0;
      this.username = '';
      this.comment = '';
      this.email = '';
    }
  },
};

</script>



<style>
.carousel-control-next {
  bottom: auto;
  background: #111111;
  width: 6%;
  padding: 10px 0;
  background-image: none;
  top: 40%;
}

.carousel-control-prev {
  bottom: auto;
  background: #111111;
  width: 6%;
  padding: 10px 0;
  background-image: none;
  top: 40%;
}

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

.add-to-cart,
.like {
  background: #ff9f1a;
  padding: 1.2em;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.add-to-cart:hover,
.like:hover {
  background: #b36800;
  color: #fff;
  text-decoration: none;
}

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
  flex-direction: row;
  /* Thay đổi hướng hiển thị từ dọc thành ngang */
  align-items: flex-start;
  /* Căn lề trên cho container */
  justify-content: flex-start;
  /* Căn lề trái cho container */
}

/* .product-main-image {
  width: 600px;
  height: 600px;
  margin-right: 20px;
 
} */

.hexagon-thumbnail {
  width: 130px;
  height: 130px;
  margin: 4px;
  padding-right: 40px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hexagon-thumbnail img {
  /* width: 100%; - dòng này sẽ được bỏ */
  /* height: auto; - dòng này sẽ được bỏ */
  max-width: 100%;
  /* Giới hạn chiều rộng tối đa của ảnh */
  max-height: 100%;
  /* Giới hạn chiều cao tối đa của ảnh */
  transition: border-color 0.3s ease;
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
  align-items: flex-start;
  justify-content: flex-start;
}

.product-thumbnails-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.product-thumbnails-row:last-child {
  margin-bottom: 0;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>