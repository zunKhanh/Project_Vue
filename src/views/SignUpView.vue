<template>
  <div class="signup container">
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card" style="border-radius: 15px;">
        <div class="card-body m-3">
          <h3 class="card-title text-success text-center mb-5">Đăng ký</h3>
          <div class="form-group"></div>
          <!-- Form đăng ký bằng email -->
          <form class="forms-sample" @submit.prevent="registerWithEmail">
            <!-- USERNAME -->
            <div class="form-group">
              <input type="text" class="form-control"  placeholder="Nhập vào tên người dùng"
                v-model="register_form.name"  @input="validateName" />
              <small v-if="nameError" class="text-danger">{{nameError}}</small>
            </div>
            <!-- EMAIL -->
            <div class="form-group">
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Nhập vào email"
                v-model="register_form.email"  @input="validateEmail" />
              <small v-if="emailError" class="text-danger">{{ emailError}}</small>
            </div>
            <!-- PASSWORD -->
            <div class="form-group">
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Nhập vào mật khẩu"
                v-model="register_form.password"
                @input="validatePassword" />
              <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
            </div>
            <!-- CONFIRMPASSWORD -->
            <div class="form-group">
              <input type="password" class="form-control" id="exampleInputConfirmPassword1"
                placeholder="Nhập lại mật khẩu" v-model="register_form.confirm_password"
                 @input="validateConfirmPassword" />
              <small v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError}}</small>
            </div>
            <button type="submit" class="btn btn-success me-2 w-100" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Đăng ký</span>
            </button>
          </form>
          <div class="or-divider">
            <hr />
            <span class="or-text">Hoặc</span>
          </div>
          <!-- LOGIN/SIGNUP WITH GOOGLE OR FACEBOOK  -->
          <div class="social-container">
            <button type="button" class="btn btn-light me-2 mt-2 " style="min-width: 190px" @click="registerWithGoogle">
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
              <i class="fab fa-google fa-2x"></i> Google
            </button>
            <button type="button" class="btn btn-light mt-2" style="min-width: 190px" @click="registerWithFaceBook">
              <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet" />
              <i class="fa fa-facebook-square fa-2x"></i> Facebook
            </button>
          </div>
          <div class="mt-2">
            <small class="text-secondary">Bạn đã có tài khoản ?
              <router-link to="/sign-in" class="text-success">Đăng nhập</router-link></small>
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
  name:"SignUpView",
  setup() {
    const store = useStore();
    // register_form cần đăng kí  
    const register_form = ref({ name: "", email: "", password: "", confirm_password: "",});

    const isLoading = ref(false); // Biến lưu trạng thái loading form

    // Các biến error message
    const emailError = ref("");
    const nameError = ref("");
    const passwordError = ref("");
    const confirmPasswordError = ref("");

   // Đăng kí bằng email và password (username)
   const registerWithEmail = () => {
      validateName();
      validateEmail();
      validatePassword();
      validateConfirmPassword();
      if ( !nameError.value && !emailError.value && !passwordError.value && !confirmPasswordError.value) {
        isLoading.value = true; // Hiển thị trạng thái loading
        store.dispatch("register", register_form.value)
          .finally(() => {
            isLoading.value = false; // Ẩn trạng thái loading
          });
      }
    };
  // Đăng kí bằng Google
    const registerWithGoogle = async () => {
      await store.dispatch("googleLogin");
    };
  // Đăng kí bằng facebook
    const registerWithFaceBook = () => {
      store.dispatch("facebookLogin");
    };
  // Các phương thức validate cho form username, email, password
    const validateEmail = () => {
      if (!register_form.value.email) {
        emailError.value = "Vui lòng nhập email!";
      } else if (!isValidEmail(register_form.value.email)) {
        emailError.value = "Vui lòng nhập vào email hợp lệ!";
      } else {
        emailError.value = "";
      }
    };
    const validateName = () => {
      if (!register_form.value.name) {
        nameError.value = "Vui lòng nhập tên người dùng!";
      } else {
        nameError.value = "";
      }
    };

    const validatePassword = () => {
      if (!register_form.value.password) {
        passwordError.value = "Vui lòng nhập vào mật khẩu!";
      } else if (register_form.value.password.length < 6) {
        passwordError.value = "Mật khẩu phải từ 6 kí tự";
      } else if (!isValidPassword(register_form.value.password)) {
        passwordError.value =
          "Mật khẩu phải bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt";
      } else {
        passwordError.value = "";
      }
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

  // Kiểm tra tính hợp lệ email, password
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const isValidPassword = (password) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return passwordRegex.test(password);
    };

    return {
      register_form,
      registerWithEmail,
      registerWithGoogle,
      registerWithFaceBook,
      validateEmail,
      validateName,
      validatePassword,
      validateConfirmPassword,
      emailError,
      nameError,
      passwordError,
      confirmPasswordError,
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
