<template>
  <div class="tab-pane fade show active" id="order" role="tabpanel">
    <div class="box-head mb-3">
      <h3>Tất cả hóa đơn</h3>
    </div>
    <div class="table-responsive">
      <table class="table cart-table">
        <thead>
          <tr class="table-head">
            <th scope="col">Thong tin khach hang</th>
            <th scope="col">thông tin sản phẩm</th>
            <th scope="col">phương thức vận chuyển</th>
            <th scope="col">Phương thức thanh toán</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, orderIndex) in orderOfUsers" :key="orderIndex">
            <td>
              Email: {{ order.email }} <br />
              Số điện thoại:{{ order.phoneNumber }} <br />
              địa chỉ:{{ order.address1 }}
            </td>
            <td>
              <span v-for="(item, index) in order.cartItems" :key="index">
                <ul>
                  {{
                    item.name
                  }}-size{{
                    item.size
                  }}-x{{
                    item.quantity
                  }}
                </ul>
              </span>
            </td>
            <td>{{ order.selectedShipping }}</td>
            <td>{{ order.paymentMethod }}</td>
            <td>{{ order.totalWithShipping }} vnd</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      selectedShipping: "",
      paymentMethod: "",
      phoneNumber: "",
      email: "",
      totalWithShipping: 0,
      orderStatus: "Đang giao", // Trạng thái mặc định là "Đang giao"
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
    orderOfUsers() {
      return this.$store.state.orders;
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
    processPayment() {
      const data = {
        name: this.name,
        selectedShipping: this.selectedShipping,
        paymentMethod: this.paymentMethod,
        phoneNumber: this.phoneNumber,
        email: this.email,
        cartItems: this.cartItems.map((item) => ({ name: item.name })),
        totalWithShipping: this.totalWithShipping,
        orderStatus: this.orderStatus, // Trạng thái của đơn hàng
      };
      this.$store.dispatch("submitOrder", data);
    },
  },
};
</script>
