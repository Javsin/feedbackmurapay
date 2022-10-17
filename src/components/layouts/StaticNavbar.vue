<template>
  <header class="background-dark-blue">
    <div class="container">
      <div class="row gx-2 ps-2 mb-0" style="height: 60px" id="layout-navigation">
        <div class="col-1 d-flex align-items-center" @click="back">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f37021" class="bi bi-arrow-left h-70" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </div>
        <div class="col-11 d-flex align-items-center">
          <p class="w-100 text-white font-large-1 fw-500">Feedback</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    back() {
      window.location = "com.app.murapay://home";
    },
  },
};
</script>
