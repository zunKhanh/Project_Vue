import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    cartItemCount: JSON.parse(localStorage.getItem("cartItemCount")) || 0,
  },
  getters: {
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

    // đếm số lượng giỏ hàng
    cartCount(state, payload) {
      state.cartItemCount += payload;

      localStorage.setItem("cart", JSON.stringify(state.cartItemCount));
    },

    // giỏ hàng
    addToCart(state, item) {
      if (Array.isArray(state.cartItems)) {
        // sản phẩm đã tồn tại chưa
        const existPro = state.cartItems.findIndex(
          (cartItem) => cartItem.id === item.id && cartItem.size === item.size
        );
        if (existPro !== -1) {
          state.cartItems[existPro].quantity++;
        } else {
          state.cartItems.push({ ...item, quantity: 1 });
        }
        state.cartItemCount += item.quantity;
      } else {
        state.cartItems = [];
        state.cartItems.push(item);
        state.cartItemCount++; // Tăng số lượng sản phẩm trong giỏ hàng
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
      );
    },

    // tăng sl
    increment(state, index) {
      state.cartItems[index].quantity++;
      state.cartItemCount++;
    },
    // giãm sl
    decrement(state, index) {
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity--;
        state.cartItemCount--;
      }
    },

    removeFromCart(state, index) {
      const removedProduct = state.cartItems.splice(index, 1)[0]; // Loại bỏ sản phẩm khỏi danh sách và lấy sản phẩm đã xóa
      state.cartItemCount -= removedProduct.quantity; // Giảm số lượng sản phẩm trong giỏ hàng
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Cập nhật Local Storage với danh sách mới
      localStorage.setItem(
        "cartItemCount",
        JSON.stringify(state.cartItemCount)
      ); // Cập nhật số lượng mới vào Local Storage
    },
  },
  actions: {
    updateCartItemCount({ commit }) {
      commit("updateCartItemCount");
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, index) {
      commit("removeFromCart", index);
    },
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // const user = auth.currentUser;
        // commit('SET_USER', auth.currentUser);
        // if (auth.currentUser) {
        // if (auth.currentUser.email === 'admin@example.com') {
        // router.push('/admin/products'); // Chuyển hướng người dùng đến trang sản phẩm của admin nếu là admin
        // } else {
        //   router.push('/'); // Chuyển hướng người dùng đến trang chính nếu không phải là admin
        // }
        // }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
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
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },
    async forgotPassword(context, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent. Please check your inbox.");
      } catch (error) {
        console.error(error.message);
        alert("Failed to send password reset email. Please try again.");
      }
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/sign-in");
    },
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

// import { createStore } from 'vuex';
// import router from '../router';
// import { auth } from '../firebase';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   setCustomUserClaims
// } from 'firebase/auth'

// export default createStore({
//   state: {
//     user: null
//   },
//   getters: {
//     isAdmin: (state)=>state.user? state.user.admin : false
//   },
//   mutations: {
//     SET_USER(state, user){
//       state.user = user;
//     },
//     CLEAR_USER(state){
//       state.user = null;
//     }
//   },
//   actions: {
//     async login ({commit}, details){
//       const {email,password} = details;
//       try {
//         await signInWithEmailAndPassword(auth, email, password)
//         const user = auth.currentUser;
//         commit('SET_USER', user);
//         if (user && user.admin) {
//           router.push('/admin');
//         } else {
//           router.push('/');
//         }
//       } catch (error) {
//         switch(error.code) {
//           case 'auth/user-not-found':
//             alert("User not found")
//             break
//           case 'auth/wrong-password':
//             alert("Wrong password")
//             break
//           default:
//             alert("Something went wrong")
//         }
//       }
//     },
//     async register({ commit },details) {
//       const {email,password} = details;
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         const user = userCredential.user;
//         // Kiểm tra xem người dùng đăng ký có phải là admin hay không
//         if (user.email === 'admin@example.com') {
//           await setCustomUserClaims(user.uid, { admin: true });
//           commit('SET_USER', user);
//           router.push('/admin');
//           return;
//         }
//         commit('SET_USER', user);
//         router.push('/');
//       } catch (error) {
//         switch(error.code) {
//           case 'auth/email-already-in-use':
//             alert("Email already in use")
//             break
//           case 'auth/invalid-email':
//             alert("Invalid email")
//             break
//           case 'auth/operation-not-allowed':
//             alert("Operation not allowed")
//             break
//           case 'auth/weak-password':
//             alert("Weak password")
//             break
//           default:
//             alert("Something went wrong")
//         }
//       }
//     },
//     async logout({ commit }) {
//       await signOut(auth)

//       commit('CLEAR_USER')

//       router.push('/sign-in')
//     },
//     fetchUser ({ commit }) {
//       auth.onAuthStateChanged(async user => {
//         if (user === null) {
//           commit('CLEAR_USER')
//         } else {
//           commit('SET_USER', user)

//           if (router.isReady() && router.currentRoute.value.path === '/login') {
//             router.push('/')
//           }
//         }
//       })
//     }
//   },
//   modules: {
//   }
// })
