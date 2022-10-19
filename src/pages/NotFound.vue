<template>
  <section class="container">
    <div
      class="
        vh-100
        d-flex
        justify-content-center
        gap-2
        p-2
      "
    >
      <img :src="image" alt="404" class="img-fluid  align-self-center" loading="lazy" />
    </div>
  </section>
</template>

<script>
import NotFound from "../assets/images/404.svg";

export default {
  computed: {
    image() {
      return NotFound;
    },
  },
};
</script>