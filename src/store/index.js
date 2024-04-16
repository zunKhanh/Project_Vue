import { createStore } from "vuex";
import router from "../router";
import { auth, firestore } from "../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth"; // import các phương thức đăng nhập / đăng kí

export default createStore({
  state: {
    // Biến lưu trữ
    user: null,

    // giỏ hàng
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    cartItemCount: JSON.parse(localStorage.getItem("cartItemCount")) || 0,

    // yêu thích
    whistList: JSON.parse(localStorage.getItem("whistlist")) || [],
    whistListCount: JSON.parse(localStorage.getItem("whistlistCount")) || 0,

    // order
    orders: JSON.parse(localStorage.getItem("orders")) || [],
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

    //order
    Orders(state) {
      return state.orders;
    },
  },
  mutations: {
    // Lưu người dùng vào user state
    SET_USER(state, user) {
      state.user = user;
    },
    // Xóa user
    CLEAR_USER(state) {
      state.user = null;
    },
    submitOrder(state) {
      console.log(state);
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartItemCount = 0;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
      );
    },
    // giỏ hàng
    addToOrder(state, data) {
      state.orders.push(data);
      localStorage.setItem("orders", JSON.stringify(state.orders));
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
      state.cartItemCount++; // Tăng số lượng sản phẩm trong giỏ hàng lên 1
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

    // xóa yêu thích
    removeWishlist(state, productId) {
      state.whistList = state.whistList.filter((item) => item.id !== productId);
      state.whistListCount--;
      localStorage.setItem("whistlist", JSON.stringify(state.whistList)); // Cập nhật Local Storage với danh sách mới
      localStorage.setItem(
        "whistlistCount",
        JSON.stringify(state.whistListCount)
      );
    },

    // tăng sl giỏ hàng
    increment(state) {
      state.cartItemCount++;
    },
    // giãm sl giỏ hàng
    decrement(state, index) {
      if (state.cartItems[index].quantity > 1) {
        state.cartItemCount--;
      }
    },
    // xóa giỏ hàng
    removeFromCart(state, index) {
      state.cartItems = state.cartItems.filter((item, i) => i !== index); // Lọc ra tất cả các sản phẩm ngoại trừ sản phẩm cần xóa
      state.cartItemCount--; // Giảm số lượng sản phẩm trong giỏ hàng
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Cập nhật Local Storage với danh sách mới
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
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

    removeFromWishlist({ commit }, productId) {
      commit("removeWishlist", productId);
    },

    //thanh toan' thanh' cong^ thi` xoa' san? pham^? khoi? gio? hang'
    clearCart(context) {
      context.commit("clearCart");
    },
    submitOrder({ commit }, order) {
      commit("addToOrder", order);
      commit("clearCart");
    },
    // Đăng nhập
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        // console.error("Error code:", error.code);
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
    //admin Đăng nhập
    async loginAdmin({ commit }, details) {
      const { email, password } = details;
      try {
        // Đăng nhập người dùng
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Kiểm tra vai trò của người dùng trong Firestore
        const userDocRef = doc(firestore, "users", userCredential.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (
          userDocSnapshot.exists() &&
          userDocSnapshot.data().role === "admin"
        ) {
          // Nếu người dùng có vai trò là 'admin', chuyển hướng tới '/admin'
          router.push("/admin");
          commit("SET_USER", auth.currentUser);
        } else {
          // Nếu không phải 'admin', thông báo lỗi
          console.error("User is not an admin");
          router.push("/");
          alert("Bạn không có quyền truy cập trang này!");
        }
      } catch (error) {
        console.error("Error logging in:", error);

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
      }
    },
    // Đăng ký người dùng và thêm thông tin vào Firestore
    async register({ commit }, details) {
      const { name, email, password } = details;
      try {
        // Đăng ký người dùng
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Thêm thông tin người dùng vào Firestore với vai trò mặc định là 'user'
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          username: name,
          email: email,
          password: password,
          role: "user", // Vai trò mặc định của người dùng là 'user'
        });
        // Cập nhật state của ứng dụng với người dùng hiện tại
        commit("SET_USER", auth.currentUser);
        router.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert(
              `Email ${email} đã tồn tại, vui lòng đăng nhập hoặc chọn một địa chỉ email khác để đăng kí!`
            );
            break;
          default:
            alert("Đã xảy ra lỗi");
            break;
        }
      }
    },
    // Quên mật khẩu
    async resetPassword(context, email) {
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
      router.push("/");
    },
    // Đăng nhập/ Đăng kí với google
    async googleLogin({ commit }) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);

        // Lấy thông tin người dùng từ kết quả đăng nhập Google
        const { displayName, email, uid } = result.user;

        // Thêm thông tin người dùng vào Firestore
        await setDoc(doc(firestore, "users", uid), {
          username: displayName,
          email: email,
          role: "user", // Vai trò mặc định của người dùng là 'user'
        });

        commit("SET_USER", result.user);
        router.push("/");
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(
          "Đã xảy ra lỗi trong quá trình đăng nhập Google:",
          error.message
        );
        alert(
          "Đã xảy ra lỗi trong quá trình đăng nhập Google. Vui lòng thử lại sau."
        );
      }
    },
    // Đăng nhập/ Đăng kí với facebook

    async facebookLogin({ commit }) {
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);

        // Lấy thông tin người dùng từ kết quả đăng nhập Facebook
        const { displayName, email, uid } = result.user;

        // Thêm thông tin người dùng vào Firestore
        await setDoc(doc(firestore, "users", uid), {
          username: displayName,
          email: email,
          role: "user", // Vai trò mặc định của người dùng là 'user'
        });

        commit("SET_USER", result.user);
        router.push("/");
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(
          "Đã xảy ra lỗi trong quá trình đăng nhập Facebook:",
          error.message
        );
        alert(
          "Đã xảy ra lỗi trong quá trình đăng nhập Facebook. Vui lòng thử lại sau."
        );
      }
    },

    // Lưu session trạng thái đăng nhập của user
    async fetchUser({ commit }) {
      // onAuthStateChanged của Firebase Authentication được sử dụng để theo dõi thay đổi trong trạng thái xác thực của người dùng
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          // Không cho phép đăng nhập khi đã đăng nhập
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
