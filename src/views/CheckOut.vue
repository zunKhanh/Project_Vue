<template>
  <section class="cart_area">
    <div class="container-fluid">
      <div v-if="cartItems && cartItems.length > 0">
        <div class="cart_inner">
          <form action="">
            <div class="row">
              <div class="col-md-6">
                <div class="table-responsive" style="margin-left: 100px">
                  <table class="table">
                    CHI TIẾT THANH TOÁN
                    <hr />
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>Họ<span>*</span></p>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            v-model="name"
                            @blur="validateName"
                            required
                          />
                          <span
                            id="firstNameError"
                            style="color: red; display: none"
                            >Vui lòng nhập họ</span
                          >
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>Tên<span>*</span></p>
                          <input
                            type="text"
                            name="last_name"
                            v-model="lastName"
                            @blur="validateLastName"
                            required
                          />
                          <span
                            id="lastNameError"
                            style="color: red; display: none"
                            >Vui lòng nhập tên</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="checkout__input">
                      <p>Quốc gia<span>*</span></p>
                      <input
                        type="text"
                        name="country"
                        v-model="country"
                        @blur="validateCountry"
                        required
                      />
                      <span id="countryError" style="color: red; display: none"
                        >Vui lòng nhập quốc gia</span
                      >
                    </div>
                    <div class="checkout__input">
                      <p>Địa chỉ 1<span>*</span></p>
                      <input
                        type="text"
                        name="address1"
                        v-model="address1"
                        placeholder="Street Address"
                        class="checkout__input__add"
                        required
                      />
                    </div>
                    <div class="checkout__input">
                      <p>Địa chỉ 2<span>*</span></p>
                      <input
                        type="text"
                        name="address2"
                        v-model="address2"
                        @blur="validateAddress2"
                        required
                      />
                      <span id="address2Error" style="color: red; display: none"
                        >Vui lòng nhập địa chỉ 2</span
                      >
                    </div>

                    <div class="checkout__input">
  <p>Mã bưu điện<span>*</span></p>
  <input
    type="text"
    name="post_code"
    v-model="postCode"
    @blur="validatePostCode"
    required
  />
  <span id="postCodeError" style="color: red; display: none"
    >Vui lòng nhập mã bưu điện hợp lệ (6 chữ số)</span
  >
</div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>Điện thoại<span>*</span></p>
                          <input
                            type="text"
                            name="phone"
                            v-model="phoneNumber"
                            @blur="validatePhoneNumber"
                          />
                          <p v-if="phoneError" style="color: red">
                            {{ phoneError }}
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>Email<span>*</span></p>
                          <input
                            type="text"
                            name="email"
                            v-model="email"
                            @blur="validateEmail"
                          />
                          <p v-if="emailError" style="color: red">
                            {{ emailError }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </table>
                </div>
              </div>
              <div
                class="col-md-4 btn btn-light"
                style="height: 200px; margin-left: 200px; margin-top: 50px"
              >
                <div class="cart">
                  <div class="cart-body mt-3">
                    <h4>Đơn hàng của bạn</h4>
                    <hr />
                    <div class="row">
                      <div class="checkout__order__products">Sản Phẩm</div>
                      <ul>
                        <tr v-for="(item, index) in cartItems" :key="index">
                          <!-- san phẩm -->
                          <td>
                            <div class="media">
                              <!-- <img :src="item.image" alt="" /> -->
                              <p>
                                {{ item.name }}
                                <br />
                              </p>
                            </div>
                          </td>
                        </tr>
                      </ul>
                      <div class="col-md-6">
                        <b>Tổng cộng:</b>
                      </div>
                      <div class="col-md-6">
                        {{ formattedPrice(Total) }}
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>Phương thức vận chuyển<span>*</span></p>
                            <select
                              v-model="selectedShipping"
                              @change="updateTotal"
                            >
                              <option value="" disabled selected hidden>
                                Chọn đơn vị vận chuyển
                              </option>
                              <option
                                v-for="shippingOption in shippingOptions"
                                :value="shippingOption.value"
                                :key="shippingOption.value"
                              >
                                {{ shippingOption.label }}
                              </option>
                            </select>
                            <p v-if="!selectedShipping" style="color: red">
                              Vui lòng chọn phương thức vận chuyển.
                            </p>
                          </div>
                        </div>
                        <div v-if="selectedShipping">
                          Bạn đã chọn: {{ selectedShipping }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <b>Tổng Thanh Toán:</b>
                        </div>
                        <div class="col-md-6">
                          {{ formattedPrice(totalWithShipping) }}
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div>
                      <div>
                        <h4>Chọn phương thức thanh toán</h4>
                        <div>
                          <div class="checkout__input__radio">
                            <label for="payment_cash">
                              Thanh toán khi nhận hàng
                              <input
                                type="radio"
                                id="payment_cash"
                                name="payment_method"
                                value="Thanh toán khi nhận hàng"
                                v-model="paymentMethod"
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                          <p v-if="!paymentMethod" style="color: red">
                            Vui lòng chọn phương thức thanh toán.
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div>
                      <button
                        class="form-control btn btn-dark w-75"
                        style="height: 50px"
                        type="button"
                        @click="processPayment"
                      >
                        Thanh toán
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="text-center">
            <b>Giỏ hàng không có sản phẩm</b>
            <br />
            <button class="btn btn-light mt-3">
              <router-link class="nav-link" to="/all-products"
                >Continue Shopping</router-link
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      selectedShipping: "",
      shippingOptions: [
        {
          label: "Việt Nam Post",
          value: "Việt Nam post(+40000nvd)",
          additionalCost: 40000,
        },
        {
          label: "Giao hàng hỏa tốc",
          value: "Giao hàng hỏa tốc(+70000nvd)",
          additionalCost: 70000,
        },
      ],
      paymentMethod: "",
      watch: {
        paymentMethod(newVal) {
          if (newVal === "Thanh toán khi nhận hàng") {
            this.paymentMethod = "Thanh toán khi nhận hàng";
          } else if (newVal === "Paypal") {
            this.paymentMethod = "Paypal";
          }
        },
      },
      phoneNumber: "",
      phoneError: "",
      email: "",
      emailError: "",
      address1: "",
      lastName: "",
      country: "",
      address2: "",
      postCode: "",
    };
  },
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
    shippingCost() {
      const selectedOption = this.shippingOptions.find(
        (option) => option.value === this.selectedShipping
      );
      return selectedOption ? selectedOption.additionalCost : 0;
    },
    totalWithShipping() {
      return this.Total + this.shippingCost;
    },
    orderOfUsers() {
      console.log(this.$store.state.orders);
      return this.$store.state.orders;
    },
  },
  methods: {
    increment(index) {
      this.$store.commit("increment", index);
    },
    decrement(index) {
      this.$store.commit("decrement", index);
    },
    removeFromCart(index) {
      this.$store.dispatch("removeFromCart", index);
    },
    updateTotal() {},
    validatePhoneNumber() {
      if (this.phoneNumber && !/^\d{10,11}$/.test(this.phoneNumber)) {
        this.phoneError = "Vui lòng nhập số điện thoại hợp lệ.";
      } else {
        this.phoneError = "";
      }
    },
    validateName() {
      if (!this.name) {
        document.getElementById("firstNameError").style.display = "inline";
      } else {
        document.getElementById("firstNameError").style.display = "none";
      }
    },
    validateLastName() {
      if (!this.lastName) {
        document.getElementById("lastNameError").style.display = "inline";
      } else {
        document.getElementById("lastNameError").style.display = "none";
      }
    },
    validateCountry() {
      if (!this.country) {
        document.getElementById("countryError").style.display = "inline";
      } else {
        document.getElementById("countryError").style.display = "none";
      }
    },
    validateAddress2() {
      if (!this.address2) {
        document.getElementById("address2Error").style.display = "inline";
      } else {
        document.getElementById("address2Error").style.display = "none";
      }
    },
    validatePostCode() {
    if (!this.postCode || !/^\d{6}$/.test(this.postCode)) {
      document.getElementById("postCodeError").style.display = "inline";
    } else {
      document.getElementById("postCodeError").style.display = "none";
    }
  },
    processPayment() {
      if (!this.validateForm()) {
        alert("Vui lòng điền đầy đủ thông tin và kiểm tra lại!");
        return;
      }
      if (!this.selectedShipping) {
        alert("Vui lòng chọn phương thức vận chuyển.");
        return;
      }
      if (!this.paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán.");
        return;
      }
      const data = {
        name: this.name,
        selectedShipping: this.selectedShipping,
        paymentMethod: this.paymentMethod,
        phoneNumber: this.phoneNumber,
        email: this.email,
        cartItems: this.cartItems,
        totalWithShipping: this.totalWithShipping,
        address1: this.address1,
      };
      this.$store.dispatch("submitOrder", data);
      alert("Thanh toán thành công!");
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Vui lòng nhập email hợp lệ.";
      } else {
        this.emailError = "";
      }
    },
    validateForm() {
      if (this.phoneNumber && !/^\d{10,11}$/.test(this.phoneNumber)) {
        this.phoneError = "Vui lòng nhập số điện thoại hợp lệ.";
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Vui lòng nhập email hợp lệ.";
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped>
.cart {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
}

.cart-body {
  text-align: left;
}

.checkout__order__products {
  font-weight: bold;
}

.checkout__order__products span {
  float: right;
}
.btn-dark {
  background-color: #000;
  color: #fff;
}
.table-responsive {
  margin-left: 100px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  color: #333;
  font-family: "Arial", sans-serif;
}

.checkout__input p {
  font-size: 16px;
  color: #333;
  margin: 0;
  line-height: 1.5;
}
.checkout__input input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.checkout__input span {
  color: red;
}
</style>
