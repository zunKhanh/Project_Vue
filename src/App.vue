<template>
  <router-view />
</template>
<script>
 // đảm bảo rằng dữ liệu cần thiết được tải trước khi component được render, giúp tránh các vấn đề liên quan đến dữ liệu chưa sẵn sàng
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {

  setup() {
    const store = useStore();
    //Hàm này được sử dụng để đăng ký một hàm callback sẽ được thực thi trước khi component được mount lần đầu tiên.
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  },
  
}
</script>

