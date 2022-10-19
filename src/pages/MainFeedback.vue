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
        <div class="tab-content mb-2 pb-3 position-relative" id="pills-tabContent-testi" style="height:85vh;overflow-y:scroll">
            <div class="tab-pane fade show active" id="pills-2-testi" role="tabpanel" aria-labelledby="pills-2-tab">
                <TabSaran :agen = kode_agen @showtoast="showtoast" />
            </div>
            <div class="tab-pane fade show" id="pills-1-testi" role="tabpanel" aria-labelledby="pills-1-tab">
                <TabMasalah :agen = kode_agen @showtoast="showtoast" />
            </div>
            <div class="toast bottom-0 start-50 translate-middle text-white border-0 position-absolute" v-bind:class="color" id="liveToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        {{message}}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TabSaran from "../components/feedback/TabSaran.vue";
import TabMasalah from "../components/feedback/TabMasalah.vue";
import {Toast} from 'bootstrap';
export default {
    components: {
        TabSaran,
        TabMasalah
    },
    data() {
        return {
            kode_agen : '',
            toast : '',
            color : 'background-orange',
            message : ''
        }
    },
    mounted() {
        this.toast = new Toast(document.getElementById('liveToast'));
        this.kode_agen = this.$route.params.kodeagen
    },
    methods: {
        showtoast(color,message) {
            this.color = color;
            this.message = message;
            setTimeout(() => {
                this.toast.show();
            }, 100);
        }
    }
}
</script>