
import { createStore } from 'vuex';
import router from '../router';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'

export default createStore({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user){
      state.user = user;
    },
    CLEAR_USER(state){
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          commit('SET_USER', user);
          if (user.email === 'admin@example.com') {
            router.push('/admin/products'); // Chuyển hướng người dùng đến trang sản phẩm của admin nếu là admin
          } else {
            router.push('/'); // Chuyển hướng người dùng đến trang chính nếu không phải là admin
          }
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not found");
            break;
          case 'auth/wrong-password':
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }
      }
      // // commit('SET_USER', auth.currentUser)

      // router.push('/')
    },
    
    async register({ commit },details) {
      const {email,password} = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')

    },
    async logout({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/sign-in')
    },
    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/sign-in') {
            router.push('/')
          }
        }
      })
    }
  },
  modules: {
  }
})

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
