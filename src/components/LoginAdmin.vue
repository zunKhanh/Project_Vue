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
                <small v-if="emailError " class="text-danger">{{
                  emailError
                }}</small>
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
                <small
                  v-if="passwordError "
                  class="text-danger"
                  >{{ passwordError }}</small>
              </div>
              <button type="submit" class="btn btn-success me-2 w-100" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else>Đăng nhập</span>
      </button>
              <!-- <div class="mt-2 "  >
                  <router-link to="forgot-password" class="text-success" > <small >Quên mật khẩu </small></router-link>
              </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "LoginAdmin",
  setup() {
    const store = useStore();

    const isLoading = ref(false);

    const login_form = ref({ email: "", password: "" });

    const emailError = ref("");
    const passwordError = ref("");

    const login = () => {
      validateEmail();
      validatePassword();
      if (!emailError.value && !passwordError.value) {
        isLoading.value = true; // Hiển thị trạng thái loading
        store
          .dispatch("loginAdmin", login_form.value)

          .finally(() => {
            isLoading.value = false; // Ẩn trạng thái loading
          });
      }
    };
    const validateEmail = () => {
      if (!login_form.value.email) {
        emailError.value = "Vui lòng không để trống trường này!";
      } else if (!isValidEmail(login_form.value.email)) {
        emailError.value = "Vui lòng nhập vào email hợp lệ!";
      } else {
        emailError.value = "";
      }
      // console.log(emailError);
    };
    const validatePassword = () => {
      if (!login_form.value.password) {
        passwordError.value = "Vui lòng nhập vào mật khẩu!";
      } else if (login_form.value.password.length < 6) {
        passwordError.value = "Mật khẩu phải từ 6 kí tự";
      } else {
        passwordError.value = "";
      }
      // console.log(passwordError);
    };
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    return {
      login_form,
      login,
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
</style>