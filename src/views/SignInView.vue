<template lang="">
  <div class="signin container">
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card" style="border-radius: 15px;">
        <div class="card-body m-3">
          <h3 class="card-title text-success text-center mb-5">Đăng nhập</h3>
          <form class="forms-sample" @submit.prevent="login">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                v-model="login_form.email"
                @input="validateEmail"
              />
              <small v-if="emailError" class="text-danger">{{emailError}}</small>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="login_form.password"
                @input="validatePassword"
              />
              <small v-if="passwordError " class="text-danger" >{{ passwordError }}</small>
            </div>
            <button type="submit" class="btn btn-success me-2 w-100" :disabled="isLoading">
      <span span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-else>Đăng nhập</span>
    </button>
            <div class="mt-2 "  >
                <router-link to="forgot-password" class="text-success" > <small >Quên mật khẩu </small></router-link>
             
             
            </div>
          </form>
          <div class="or-divider">
              <hr />
              <span class="or-text">Hoặc</span>
            </div>
            <div class="social-container">
              <button
                type="button"
                class="btn btn-light me-2"
                style="min-width: 190px"
                @click="loginWithGoogle"
              >
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
                />
                <i class="fab fa-google fa-2x"></i> Google
              </button>
              <button
                type="button"
                class="btn btn-light"
                style="min-width: 190px"
                @click="loginWithFacebook"
              >
                <link
                  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                  rel="stylesheet"
                />
                <i class="fa fa-facebook-square fa-2x"></i> Facebook
              </button>
            </div>
            <div class="mt-2">
              <small class="text-secondary"
                >Bạn chưa có tài khoản ?
                <router-link to="/sign-up" class="text-success"
                  >Đăng ký</router-link
                ></small
              >
            </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "SignInView",
  setup() {
    const store = useStore();
    // login_form cần đăng nhập
    const login_form = ref({ email: "", password: "" });

    const isLoading = ref(false);// Biến lưu trạng thái loading form

    // Các biến error message
    const emailError = ref("");
    const passwordError = ref("");
    // Đăng nhập bằng bằng email và password
    const login = () => {
      validateEmail();
      validatePassword();
      if (!emailError.value && !passwordError.value) {
        isLoading.value = true; // Hiển thị trạng thái loading
        store.dispatch("login", login_form.value)
          .finally(() => {
            isLoading.value = false; // Ẩn trạng thái loading
          });
      }
    };
    // Đăng nhập google
    const loginWithGoogle = () => {
      store.dispatch("googleLogin");
    };
    // Đăng nhập facebook
    const loginWithFacebook = () => {
      store.dispatch("facebookLogin");
    };
    // Các phương thức validate cho form email, password
    const validateEmail = () => {
      if (!login_form.value.email) {
        emailError.value = "Vui lòng không để trống trường này!";
      } else if (!isValidEmail(login_form.value.email)) {
        emailError.value = "Vui lòng nhập vào email hợp lệ!";
      } else {
        emailError.value = "";
      }
      console.log(emailError);
    };
    const validatePassword = () => {
      if (!login_form.value.password) {
        passwordError.value = "Vui lòng nhập vào mật khẩu!";
      } else {
        passwordError.value = "";
      }
      console.log(passwordError);
    };
    // Kiểm tra tính hợp lệ email
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
   
    return {
      login_form,
      login,
      loginWithGoogle,
      loginWithFacebook,
      validateEmail,
      validatePassword,
      emailError,
      passwordError,
      isLoading,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.social-container {
  text-align: center;
}

.or-divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.or-divider hr {
  /* color: #34a853; */
  width: 100%;
  margin-top: 8px;
  border-top: 1px solid #f8f3f3;
}

.or-text {
  color: #cacccb;
  background-color: #fff;
  padding: 0 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fa-facebook-square {
  color: blue;
  background-color: #fff;
}

.fa-google {
  background: conic-gradient(from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

input::placeholder {
  color: #b0b0b0;
  font-size: 14px;
}

span,
small {
  font-size: 14px;
}
</style>
