import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
    // giỏ hàng
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    cartItemCount: JSON.parse(localStorage.getItem("cartItemCount")) || 0,

    // yêu thích
    whistList: JSON.parse(localStorage.getItem("whistlist")) || [],
    whistListCount: JSON.parse(localStorage.getItem("whistlistCount")) || 0,
  },
  getters: {
    // chỉnh giá tiền VNĐ
    formatPrice: () => (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    // tính tổng tiền trong giỏ hàng
    Total(state) {
      if (Array.isArray(state.cartItems)) {
        return state.cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      } else {
        return 0; // Trả về 0 nếu giỏ hàng chưa được khởi tạo
      }
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },

    // giỏ hàng
    addToCart(state, item) {
      if (!state.cartItems) {
        state.cartItems = []; //lưu trữ sp trong giỏ hàng
      }
      state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );
      state.cartItems.push(item);
      state.cartItemCount += item.quantity; //cập nhật số lượng giỏ hàng
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
      );
    },

    // yêu thích sp
    addwhistList(state, item) {
      if (!state.whistList) {
        state.whistList = [];
      }
      const existingItemIndex = state.whistList.findIndex(
        (whistListItem) => whistListItem.id === item.id
      );
      if (existingItemIndex === -1) {
        state.whistList.push(item);
      } else {
        state.whistList[existingItemIndex] = item;
      }
      state.whistListCount = state.whistList.length;

      // Cập nhật Local Storage
      localStorage.setItem("whistlist", JSON.stringify(state.whistList));
      localStorage.setItem(
        "whistlistCount",
        JSON.stringify(state.whistListCount)
      );
    },

    // tăng sl yêu thích
    incrementList(state, index) {
      state.whistList[index].quantity++;
    },
    // giãm sl yêu thích
    decrementList(state, index) {
      if (state.whistList[index].quantity > 1) {
        state.whistList[index].quantity--;
      }
    },

    // tăng sl giỏ hàng
    increment(state, index) {
      state.cartItems[index].quantity++;
      state.cartItemCount++;
    },
    // giãm sl giỏ hàng
    decrement(state, index) {
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity--;
        state.cartItemCount--;
      }
    },

    // xóa giỏ hàng
    removeFromCart(state, index) {
      const removedProduct = state.cartItems.splice(index, 1)[0]; // Loại bỏ sản phẩm khỏi danh sách và lấy sản phẩm đã xóa
      state.cartItemCount -= removedProduct.quantity; // Giảm số lượng sản phẩm trong giỏ hàng
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Cập nhật Local Storage với danh sách mới
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
      );
    },

    // xóa giỏ hàng
    removeFromList(state, index) {
      const removedProduct = state.whistList.splice(index, 1)[0]; // Loại bỏ sản phẩm khỏi danh sách và lấy sản phẩm đã xóa
      state.whistListCount -= removedProduct.quantity; // Giảm số lượng sản phẩm trong giỏ hàng
      localStorage.setItem("whistList", JSON.stringify(state.whistList)); // Cập nhật Local Storage với danh sách mới
      localStorage.setItem(
        "whistListCount",
        JSON.stringify(state.whistListCount)
      );
    },
  },
  actions: {
    updateCartItemCount({ commit }) {
      commit("updateCartItemCount");
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    addwhistList({ commit }, product) {
      commit("addwhistList", product);
    },
    removeFromCart({ commit }, index) {
      commit("removeFromCart", index);
    },

    removeFromList({ commit }, index) {
      commit("removeFromList", index);
    },
    // Đăng nhập
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        switch (error.code) {
          case "auth/invalid-credential":
            alert(`${email} không tồn tại. Vui lòng kiểm tra lại.`);
            break;
          case "auth/too-many-requests":
            alert(`Sai mật khẩu vui lòng thử lại`);
            break;
          default:
            alert("Something went wrong");
            break;
        }
        return;
      }
      commit("SET_USER", auth.currentUser);

      router.push("/");
    },
    // Đăng kí
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert(
              `Email ${email} đã tồn tại vui lòng đăng nhập hoặc chọn một địa chỉ email khác để đăng kí!`
            );
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
            break;
        }
        return;
      }

      commit("SET_USER", auth.currentUser);
      router.push("/");
    },
    // Quên mật khẩu
    async forgotPassword(context, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Yêu cầu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
      } catch (error) {
        console.error(error.message);
        alert("Yêu cầu thất bại. Vui lòng thử lại.");
      }
    },
    // Đăng xuất
    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/sign-in");
    },
    // Đăng nhập/ Đăng kí với google
    async googleLogin({ commit }) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        commit("SET_USER", result.user);
        router.push("/");
      } catch (error) {
        switch (error.code) {
          default:
            alert(
              "Đã xảy ra lỗi trong quá trình đăng nhập Google. Vui lòng thử lại sau."
            );
        }
      }
    },
    // Đăng nhập/ Đăng kí với facebook
    async facebookLogin({ commit }) {
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        commit("SET_USER", result.user);
        router.push("/");
      } catch (error) {
        switch (error.code) {
          default:
            alert(
              "Đã xảy ra lỗi trong quá trình đăng nhập Facebook. Vui lòng thử lại sau."
            );
        }
      }
    },
    // Lưu session trạng thái đăng nhập của user
    async fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (
            router.isReady() &&
            router.currentRoute.value.path === "/sign-in"
          ) {
            router.push("/");
          }
        }
      });
    },
  },
  modules: {},
});
