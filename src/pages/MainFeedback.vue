<template>
    <div class="mt-2">
        <div class="tabcustom text-center">
            <ul class="nav nav-pills justify-content-center" id="pills-tab-testi" role="tablist">
                <li class="nav-item flex-fill" role="presentation">
                    <a href="" class="nav-link active" id="pills-2-tab-testi"  data-bs-toggle="pill"  data-bs-target="#pills-2-testi" role="tab" aria-controls="pills-2" aria-selected="false">SARAN</a>
                </li>
                <li class="nav-item flex-fill" role="presentation">
                    <a href="" class="nav-link" id="pills-1-tab-testi" data-bs-toggle="pill" data-bs-target="#pills-1-testi" role="tab" aria-controls="pills-1" aria-selected="true">MASALAH</a>
                </li>
            </ul>
        </div>
        <div class="tab-content mb-2 pb-3" id="pills-tabContent-testi" style="height:85vh;overflow-y:scroll">
            <div class="tab-pane fade show active" id="pills-2-testi" role="tabpanel" aria-labelledby="pills-2-tab">
                <TabSaran :agen = kode_agen />
            </div>
            <div class="tab-pane fade show" id="pills-1-testi" role="tabpanel" aria-labelledby="pills-1-tab">
                <TabMasalah :agen = kode_agen />
            </div>
        </div>
    </div>
</template>
<script>
import TabSaran from "../components/feedback/TabSaran.vue";
import TabMasalah from "../components/feedback/TabMasalah.vue";
export default {
    components: {
        TabSaran,
        TabMasalah
    },
    data() {
        return {
            kode_agen : '',
        }
    },
    mounted() {
        this.kode_agen = this.$route.params.kodeagen
    },
}
</script>