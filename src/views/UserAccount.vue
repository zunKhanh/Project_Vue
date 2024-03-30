<template>
  <section
    class="breadcrumb-section section-b-space"
    style="padding-top: 20px; padding-bottom: 20px"
  >
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>User Account</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="http://localhost:8080/">
                  <i class="fas fa-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">name</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>

  <section
    class="section-b-space"
    style="padding-top: 50px; padding-bottom: 200px"
  >
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-3">
          <ul
            class="nav nav-tabs custome-nav-tabs flex-column category-option"
            id="myTab"
            style="padding-left: 20px; height: 300px; margin-left: -100px"
          >
            <li class="nav-item mb-2">
              <a
                class="nav-link font-light"
                id="1-tab"
                data-toggle="tab"
                href="#order"
                role="tab"
                aria-controls="order"
                aria-selected="true"
              >
                <i class="fas fa-angle-right"></i> Orders
              </a>
            </li>

            <li class="nav-item mb-2">
              <a
                class="nav-link font-light"
                id="5-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                <i class="fas fa-angle-right"></i> Profile
              </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-9">
          <div class="tab-content" id="myTabContent">
            <!-- đơn hàng -->
            <div class="tab-pane fade show active" id="order" role="tabpanel">
              <div class="box-head mb-3">
                <h3>My Order</h3>
              </div>
              <div class="table-responsive">
                <table class="table cart-table">
                  <thead>
                    <tr class="table-head">
                      <th scope="col">Image</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">Status</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cartItems" :key="index">
                      <td>
                        <div class="media">
                          <img :src="item.image" alt="" />
                          <a @click="goToProductDetail(item.id)">
                            <br />
                          </a>
                        </div>
                      </td>

                      <td>
                        <p class="mt-0"></p>
                      </td>

                      <!-- tình trạng đơn hàng -->
                      <td>
                        <p class="success-button btn btn-sm"></p>
                      </td>

                      <!--tổng giá tiền -->
                      <td>
                        <p class="theme-color fs-6">
                          {{ formattedPrice(Total) }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- thông tin  -->
            <div class="tab-pane fade show" id="profile" role="tabpanel">
              <div class="box-head mt-lg-5 mt-3">
                <h3>Login Details</h3>
              </div>

              <ul class="dash-profile">
                <li>
                  <div class="left">
                    <h6 class="font-light">Email Address</h6>
                  </div>
                  <!-- email -->
                  <div class="right">
                    <h6></h6>
                  </div>
                  <a
                    href="javascript:void(0)"
                    data-toggle="modal"
                    data-target="#resetEmail"
                    >Edit</a
                  >
                </li>

                <li>
                  <div class="left">
                    <h6 class="font-light">Phone No.</h6>
                  </div>
                  <!-- sđt -->
                  <div class="right">
                    <h6></h6>
                  </div>
                  <a
                    href="javascript:void(0)"
                    data-toggle="modal"
                    data-target="#resetEmail"
                    >Edit</a
                  >
                </li>

                <li class="mb-0">
                  <div class="left">
                    <h6 class="font-light">Password</h6>
                  </div>
                  <!-- mật khẩu -->
                  <div class="right">
                    <h6></h6>
                  </div>
                  <a
                    href="javascript:void(0)"
                    data-toggle="modal"
                    data-target="#resetEmail"
                    >Edit</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cartItems;
    },
    Total() {
      return this.$store.getters.Total;
    },
    formattedPrice() {
      return this.$store.getters.formatPrice;
    },
  },

  methods: {
    goToProductDetail(productId) {
      this.$router.push({ name: "ProductDetail", params: { id: productId } });
    },
    increment(index) {
      this.$store.commit("increment", index);
    },
    decrement(index) {
      this.$store.commit("decrement", index);
    },
    removeFromCart(index) {
      this.$store.dispatch("removeFromCart", index);
    },
  },
};
</script>
<style>
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
  background-color: #eff2f7;
  margin-bottom: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 10px;
}
.section-b-space {
  padding-bottom: 80px;
}
@media (max-width: 1460px) {
  .section-b-space {
    padding-bottom: 70px;
  }
}
@media (max-width: 1199px) {
  .section-b-space {
    padding-bottom: 60px;
  }
}
@media (max-width: 991px) {
  .section-b-space {
    padding-bottom: 50px;
  }
}
@media (max-width: 767px) {
  .section-b-space {
    padding-bottom: 40px;
  }
}
@media (max-width: 575px) {
  .section-b-space {
    padding-bottom: 30px;
  }
}
.custome-nav-tabs {
  padding: 20px;
  color: black;
  border: none;
  border-radius: 5px;
  position: sticky;
  top: 10px;
  background: #eff2f7;
}
[dir="rtl"] .custome-nav-tabs {
  padding: 20px;
}
@media (max-width: 991px) {
  .custome-nav-tabs {
    position: fixed;
    z-index: 9;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    z-index: 1;
    border-radius: 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .custome-nav-tabs.show {
    left: 0;
  }
}
.cart_inner .table tbody tr td .media img {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    width: 100px;
}
.custome-nav-tabs .nav-item .nav-link {
  width: 100%;
  text-align: left;
  border-radius: 5px;
  background: transparent;
  border: 1px solid transparent;
  position: relative;
  font-size: 16px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  color: #212529 !important;
}
[dir="rtl"] .custome-nav-tabs .nav-item .nav-link {
  text-align: right;
}
.custome-nav-tabs .nav-item .nav-link i {
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
[dir="rtl"] .custome-nav-tabs .nav-item .nav-link i {
  top: 3px;
  left: unset;
  right: 0;
  -webkit-transform: rotate(180deg) translateY(-50%);
  transform: rotate(180deg) translateY(-50%);
}
.custome-nav-tabs .nav-item .nav-link:before {
  content: "\f101";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  opacity: 0;
}
[dir="rtl"] .custome-nav-tabs .nav-item .nav-link:before {
  left: unset;
  right: 0;
  top: 0;
  -webkit-transform: rotate(180deg) translateY(-50%);
  transform: rotate(180deg) translateY(-50%);
}
.custome-nav-tabs .nav-item .nav-link:hover {
  padding-left: 20px;
  color: var(--theme-color) !important;
}
[dir="rtl"] .custome-nav-tabs .nav-item .nav-link:hover {
  padding-left: 0;
  padding-right: 20px;
}
.custome-nav-tabs .nav-item .nav-link:hover:before {
  opacity: 1;
  left: 0px;
}

[dir="rtl"] .custome-nav-tabs .nav-item .nav-link:hover:before {
  left: unset;
  right: 0;
}

.custome-nav-tabs .nav-item .nav-link.active {
  padding-left: 20px;
  color: orange !important;
  font-weight: 600;
}

[dir="rtl"] .custome-nav-tabs .nav-item .nav-link.active {
  padding-left: 0;
  padding-right: 20px;
}

.custome-nav-tabs .nav-item .nav-link.active:before {
  opacity: 1;
  left: 0px;
}

[dir="rtl"] .custome-nav-tabs .nav-item .nav-link.active:before {
  left: unset;
  right: 0;
  top: 0;
  -webkit-transform: rotate(180deg) translateY(-50%);
  transform: rotate(180deg) translateY(-50%);
}

.font-light {
  color: #7e7e7e !important;
}

.category-option {
  position: sticky;
  top: 40px;
  z-index: 1;
}

@media (max-width: 991px) {
  .category-option {
    position: fixed;
    top: 0;
    left: -320px;
    background-color: #fff;
    z-index: 7;
    padding: calc(15px + (30 - 15) * ((100vw - 320px) / (1920 - 320)));
    width: 300px;
    height: 100vh;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    overflow-x: scroll;
    overflow-y: auto;
  }

  [dir="rtl"] .category-option {
    left: unset;
    right: -320px;
  }
}

.tab-content {
  margin-top: 30px;
}

.box-head {
  margin-bottom: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.box-head h2 {
  font-size: 25px;
  letter-spacing: 1.1px;
}

.box-head a {
  margin-left: 20px;
}

[dir="rtl"] .box-head a {
  margin-left: unset;
  margin-right: 20px;
}

.btn-solid-default {
  color: #fff;
  background-color: unset;
  border: 1px solid var(--theme-color);
}

.btn-solid-default::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: var(--theme-color);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.btn-solid-default:hover {
  color: #232323;
}

.btn-solid-default:hover::before {
  opacity: 0;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
}

.dash-profile li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 2px;
}

@media (max-width: 575px) {
  .dash-profile li {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
}

.dash-profile li .left {
  width: 220px;
}

@media (max-width: 575px) {
  .dash-profile li .left {
    width: auto;
    margin-right: 10px;
  }

  [dir="rtl"] .dash-profile li .left {
    margin-right: 0;
    margin-left: 10px;
  }
}

.dash-profile li .left h6 {
  margin: 0;
}

.dash-profile li a {
  margin-left: 20px;
}

[dir="rtl"] .dash-profile li a {
  margin-left: unset;
  margin-right: 20px;
}
</style>