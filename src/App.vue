<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/sign-in">Sign In</router-link>
    <router-link to="/sign-up">Sign Up</router-link>
  </nav> -->
  
<header-componnet-vue></header-componnet-vue>
  <router-view />
  <footer-component-vue></footer-component-vue>
</template>
<script>
import FooterComponentVue from "./components/FooterComponent.vue";
import HeaderComponnetVue from "./components/HeaderComponnet.vue";
export default{
  components:{
    HeaderComponnetVue,
    FooterComponentVue
  }
}
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
