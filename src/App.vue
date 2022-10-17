<template>
  <Navbar/>
  <div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/layouts/StaticNavbar.vue";
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>


