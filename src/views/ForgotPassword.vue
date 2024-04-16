<template lang="">
  <div class="signin container">
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card" style="border-radius: 15px;">
        <div class="card-body">
          <h3 class="card-title text-success text-center mb-5">Gửi yêu cầu đặt lại mật khẩu</h3>

          <form class="forms-sample" @submit.prevent="forgot">
           
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Email hoặc gmail của bạn"
                v-model="forgot_form.email"
                @input="validateEmail"
              />
              <small v-if="emailError" class="text-danger">{{ emailError }}</small>
            </div>
            <button type="submit" class="btn btn-success me-2 w-100" :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-else>Gửi</span>
    </button>
            <div class="mt-4">
              <router-link class="text-success" to="/sign-in">Quay về trang đăng nhập</router-link>
            </div>
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
  name: 'ForgotPassword',
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const forgot_form = ref({ email: '' });
    const emailError = ref("");

    // Reset password
    const forgot = () => {
      validateEmail();
      if (!emailError.value) {
        isLoading.value = true; // Hiển thị trạng thái loading
        store.dispatch("resetPassword", forgot_form.value.email)
          .finally(() => {
            isLoading.value = false; // Ẩn trạng thái loading
          });

      }
    };
    const validateEmail = () => {
      if (!forgot_form.value.email) {
        emailError.value = "Vui lòng không để trống trường này!";
      } else if (!isValidEmail(forgot_form.value.email)) {
        emailError.value = "Vui lòng nhập vào email hợp lệ!";
      } else {
        emailError.value = "";
      }
    };

   

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };



    return {
      forgot_form,
      forgot,
      validateEmail,
      emailError,
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
