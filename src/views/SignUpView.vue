<template lang="">
  <div class="signup container">
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Sign up</h4>
          <p class="card-description">Basic form layout</p>
        
      <form class="forms-sample" @submit.prevent="register">
        <!-- <div class="form-group">
                      <label for="exampleInputUsername1">Username</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username" v-model="register_form.username">
                    </div> -->
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
            v-model="register_form.email"
            @blur="validateEmail"
          />
          <small v-if="emailError" class="text-danger">{{ emailError }}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="register_form.password"
            @blur="validatePassword"
          />
          <small v-if="passwordError" class="text-danger">{{
            passwordError
          }}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputConfirmPassword1">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputConfirmPassword1"
            placeholder="Password"
            v-model="register_form.confirm_password"
            @blur="validateConfirmPassword"
          />
          <small v-if="confirmPasswordError" class="text-danger">{{
            confirmPasswordError
          }}</small>
        </div>

        <!-- <div class="form-check form-check-flat form-check-primary">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input">
                        Remember me
                      </label>
                    </div> -->
        <button type="submit" class="btn btn-primary me-2">Sign up</button>
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
  setup() {
    const register_form = ref({
      email: "",
      password: "",
      confirm_password: "",
    });
    const store = useStore();
    const emailError = ref("");
    const passwordError = ref("");
    const confirmPasswordError = ref("");

    const validateEmail = () => {
      if (!register_form.value.email) {
        emailError.value = "Vui lòng không để trống trường này!";
      } else if (!isValidEmail(register_form.value.email)) {
        emailError.value = "Vui lòng nhập vào email hợp lệ!";
      } else {
        emailError.value = "";
      }
      console.log(emailError);
    };

    const validatePassword = () => {
      if (!register_form.value.password) {
        passwordError.value = "Vui lòng nhập vào mật khẩu!";
      } else if (register_form.value.password.length < 6) {
        passwordError.value = "Mật khẩu phải từ 6 kí tự";
      } else {
        passwordError.value = "";
      }
      console.log(passwordError);
    };
    const validateConfirmPassword = () => {
      if (!register_form.value.confirm_password) {
        confirmPasswordError.value = "Vui lòng nhập mật khẩu xác nhận!";
      } else if (
        register_form.value.confirm_password !== register_form.value.password
      ) {
        confirmPasswordError.value = "Mật khẩu xác nhận không khớp!";
      } else {
        confirmPasswordError.value = "";
      }
    };

    const register = () => {
      validateEmail();
      validatePassword();
      validateConfirmPassword();
      if (!emailError.value && !passwordError.value && !confirmPasswordError.value) {
        store.dispatch("register", register_form.value);
      }
    };

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return {
      register_form,
      register,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      emailError,
      passwordError,
      confirmPasswordError,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center; /* căn giữa theo chiều ngang */
  align-items: center; /* căn giữa theo chiều dọc */
  height: 100vh; /* chiều cao 100% của viewport */
}
</style>
