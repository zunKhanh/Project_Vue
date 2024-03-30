<template>
    <section class="cart_area">
        <div class="container">
            <div v-if="whistList && whistList.length > 0">
                <div class="cart_inner">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in whistList" :key="index">
                                    <!-- san phẩm -->
                                    <td>
                                        <div class="media">
                                            <img :src="item.image" alt="">
                                            <p @click="goToProductDetail(item.id)">{{ item.name }}
                                                <br>
                                                Size: {{ item.size }}
                                            </p>
                                        </div>
                                    </td>

                                    <td>
                                        <h5>{{ formattedPrice(item.price) }}</h5>
                                    </td>

                                    <td>
                                        <div class="product_count">
                                            <button class="increase items-count" type="button"
                                                @click="increment(index)">
                                                <i class="fa fa-chevron-up" aria-hidden="true"></i>
                                            </button>
                                            <input disabled v-model="item.quantity" class="input-text qty" min="1">
                                            <button class="reduced items-count" type="button" @click="decrement(index)">
                                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>{{ formattedPrice(item.quantity * item.price) }}</h5>
                                    </td>
                                    <td>
                                        <button class="btn btn-dark">Mua ngay</button>
                                        <button class="btn btn-defaut" @click=" removeFromList(index)">
                                            <i class="fa fa-close" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="text-center ">
                        <b>Không có sản phẩm yêu thích</b>
                        <br>
                        <button class="btn btn-light mt-3 ">
                            <router-link class="nav-link" to="/all-products">Continue Shopping</router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    computed: {
        whistList() {
            return this.$store.state.whistList;
        },
        Total() {
            return this.$store.getters.Total;
        },
        formattedPrice() {
            return this.$store.getters.formatPrice;
        }
    },

    created() {
        // Khôi phục danh sách yêu thích từ localStorage
        const whistList = JSON.parse(localStorage.getItem("whistlist"));
        if (whistList) {
            this.$store.commit("SET_WHISTLIST", whistList);
        }
    },

    methods: {
        goToProductDetail(productId) {
            this.$router.push({ name: 'ProductDetail', params: { id: productId } });
        },
        increment(index) {
            this.$store.commit('incrementList', index);
        },
        decrement(index) {
            this.$store.commit('decrementList', index);
        },
        removeFromList(index) {
            this.$store.dispatch('removeFromList', index);
        },


    }
};
</script>

<style>
/* Cart Area css
============================================================================================ */
.cart_area {
    padding-top: 50px;
    padding-bottom: 100px;
}



.cart_inner .table thead tr th {
    border-top: 0px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    color: #777777;
    border-bottom: 0px !important;
}

.cart_inner .table tbody tr td {
    padding-top: 30px;
    padding-bottom: 30px;
    vertical-align: middle;
    align-self: center;
}

.cart_inner .table tbody tr td .media p {
    margin-top: 10%;
    margin-left: 10px;
}

.cart_inner .table tbody tr td .media span {
    margin-top: 17%;
    margin-left: 10px;
}

.cart_inner .table tbody tr td .media img {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    width: 100px;
}

.cart_inner .table tbody tr td .media .media-body {
    vertical-align: middle;
    align-self: center;
}

.cart_inner .table tbody tr td .media .media-body p {
    margin-bottom: 0px;
}

.cart_inner .table tbody tr td h5 {
    font-size: 20px;
    color: #222222;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0px;
}

.cart_inner .table tbody tr td .product_count {
    margin-bottom: 0px;
}

.cart_inner .table tbody tr td .product_count input {
    width: 100px;
    padding-left: 30px;
    height: 40px;
    outline: none;
    box-shadow: none;
}

.cart_inner .table tbody tr td .product_count .increase {
    top: -2px;
}

.cart_inner .table tbody tr td .product_count .increase:before {
    content: "";
    height: 40px;
    width: 1px;
    position: absolute;
    left: -3px;
    top: 0px;
    background: #eeeeee;
}

.cart_inner .table tbody tr td .product_count .increase:after {
    content: "";
    height: 1px;
    width: 30px;
    position: absolute;
    left: -3px;
    top: 22px;
    background: #eeeeee;
}

.cart_inner .table tbody tr td .product_count .reduced {
    bottom: -6px;
}

.cart_inner .table tbody tr.bottom_button .gray_btn {
    line-height: 38px;
    background: #e8f0f2;
    border: 1px solid #eeeeee;
    border-radius: 3px;
    padding: 0px 40px;
    display: inline-block;
    color: #222222;
    text-transform: uppercase;
    font-weight: 500px;
}

.cart_inner .table tbody tr.bottom_button td:last-child {
    width: 60px;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text {
    margin-left: -446px;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text input {
    width: 200px;
    padding: 0px 15px;
    border-radius: 3px;
    border: 1px solid #eeeeee;
    height: 40px;
    font-size: 14px;
    color: #cccccc;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    margin-right: -3px;
    outline: none;
    box-shadow: none;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text input.placeholder {
    font-size: 14px;
    color: #cccccc;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
}


.cart_inner .table tbody tr.bottom_button td .cupon_text input:-moz-placeholder {
    font-size: 14px;
    color: #cccccc;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text input::-moz-placeholder {
    font-size: 14px;
    color: #cccccc;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text input::-webkit-input-placeholder {
    font-size: 14px;
    color: #cccccc;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text .primary-btn {
    height: 40px;
    line-height: 38px;
    text-transform: uppercase;
    padding: 0px 38px;
    margin-right: -3px;
    border-radius: 0;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text .gray_btn {
    padding: 0px 40px;
}

.cart_inner .table tbody tr.shipping_area td:nth-child(3) {
    vertical-align: top;
}

.cart_inner .table tbody tr.shipping_area .shipping_box {
    margin-left: -250px;
    text-align: right;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li {
    margin-bottom: 12px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li:last-child {
    margin-bottom: 0px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li a {
    padding-right: 30px;
    font-size: 14px;
    color: #777777;
    position: relative;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li a:before {
    content: "";
    height: 16px;
    width: 16px;
    border: 1px solid #cdcdcd;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li a:after {
    content: "";
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #ffba00;
    display: inline-block;
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li.active a:after {
    opacity: 1;
}

.cart_inner .table tbody tr.shipping_area .shipping_box h6 {
    font-size: 14px;
    font-weight: normal;
    color: #222222;
    font-family: "Roboto", sans-serif;
    margin-top: 20px;
    margin-bottom: 20px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box h6 i {
    color: #777777;
    padding-left: 5px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .shipping_select {
    display: block;
    width: 100%;
    background: #e8f0f2;
    border: 1px solid #eeeeee;
    height: 40px;
    margin-bottom: 20px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .shipping_select .list {
    width: 100%;
    border-radius: 0px;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .shipping_select .list li {
    font-size: 14px;
    font-weight: normal;
    color: #777777;
}

.cart_inner .table tbody tr.shipping_area .shipping_box input {
    height: 40px;
    outline: none;
    border: 1px solid #eeeeee;
    background: #e8f0f2;
    width: 100%;
    padding: 0px 15px;
    margin-bottom: 20px;
}

.cart_inner .table tbody tr.out_button_area .checkout_btn_inner {
    margin-left: -388px;
}

.cart_inner .table tbody tr.out_button_area .checkout_btn_inner .primary-btn {
    height: 40px;
    padding: 0px 30px;
    line-height: 38px;
    text-transform: uppercase;
    border-radius: 0;
}

.cart_inner .table tbody tr.out_button_area .checkout_btn_inner .primary-btn:hover:before {
    left: 240px;
}

.product_count {
    display: inline-block;
    position: relative;
    margin-bottom: 24px;
}

.product_count label {
    font-size: 14px;
    color: #777777;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    padding-right: 10px;
}

.product_count input {
    width: 76px;
    border: 1px solid #eeeeee;
    border-radius: 3px;
    padding-left: 10px;
}

.product_count button {
    display: block;
    border: none;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    position: absolute;
    right: 0px;
    font-size: 14px;
    color: #cccccc;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}

.product_count button:hover {
    color: #222222;
}

.product_count .increase {
    top: -4px;
}

.product_count .reduced {
    bottom: -8px;
}

.primary-btn {
    position: relative;
    overflow: hidden;
    color: #fff;
    padding: 0 30px;
    line-height: 50px;
    border-radius: 50px;
    display: inline-block;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;

    background: -webkit-linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
    background: -moz-linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
    background: -o-linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
    background: linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
}

.primary-btn:before {
    position: absolute;
    left: -145px;
    top: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: #000;
    opacity: 0;
    -webkit-transform: skew(40deg);
    -moz-transform: skew(40deg);
    -ms-transform: skew(40deg);
    -o-transform: skew(40deg);
    transform: skew(40deg);
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}

.primary-btn:hover {
    color: #fff;
}

.primary-btn:hover:before {
    left: 180px;
    opacity: .3;
}

.gray_btn {
    line-height: 38px;
    background: #e8f0f2;
    border: 1px solid #eeeeee;
    border-radius: 3px;
    padding: 0px 40px;
    display: inline-block;
    color: #222222;
    text-transform: uppercase;
    font-weight: 500;
}
</style>