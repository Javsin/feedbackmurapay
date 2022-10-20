<template>
    <div class="background-gray py-2">
        <div class="container">
            <p class="font-medium fw-500 text-dark-blue">
                Disampaikan oleh {{agen}}
            </p>
        </div>
    </div>
    <div class="container my-2">
        <div class="row">
            <div class="col-12">
                <p class="fw-500 font-small mb-1 text-dark-blue">Saran (Feedback)</p>
                <p class="fw-500 font-small mb-1 text-muted">Pilih salah satu saran agar kami dapat memberikan layanan lebih.</p>
            </div>
            <div class="col-12">
                <a v-for="nama in kategori" :key="nama.id" 
                    :class="{ 'background-dark-blue text-white border-0' : active_el == nama.id }" @click="gantiwarna(nama.id)" class="badge badge-light text-dark fw-500 text-decoration-none p-2 me-2 rounded-lg mt-2 mr-2 border-orange">{{nama.nama_kategori}}
                </a>
            </div>
            <div class="col-12">
                <p class="text-muted font-small mb-1 pt-2">Deskripsi saran yang ingin disampaikan</p>
                <div class="wrap-deskripsi" style="position:relative;">
                    <textarea id="textarea" autocomplete="off" spellcheck="false" wrap="soft" maxlength="1000" rows="5" max-rows="6" class="form-control font-small border-dark-blue" v-model="form.deskripsi" @keyup="limiter()"></textarea>
                    <div class="counter text-muted font-small" style="position:absolute;bottom:0;right:0;padding:0 5px 2px 0;"><span class="count">{{ count }}</span> / 1000</div>
                </div>
            </div>
        </div>
    </div>
    <div class="background-gray py-2">
    </div>
    <div class="container my-2">
        <div class="row">
            <div class="col-12">
                <p class="fw-500 font-small mb-1 text-dark-blue mb-1">Kontak Info</p>
                <p class="fw-500 text-muted font-small mb-2">Tinggalkan nama, email dan nomor whatsapp yang bisa kami hubungi.</p>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <input type="text" class="form-control font-small" placeholder="Nama" v-model="form.nama">
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="form-group">
                    <input type="email" class="form-control font-small" placeholder="Email" v-model="form.email">
                </div>
            </div>
             <div class="col-12 mb-2">
                <div class="form-group">
                    <input type="number" class="form-control font-small" placeholder="Whatsapp" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="form.whatsapp">
                </div>
            </div>
            <div class="col-12 my-2">
                <button class="btn background-dark-blue text-white btn-block font-medium fw-500 w-100" @click="simpanSaran()" :disabled="disable" >KIRIM</button>
            </div>
            <div class="col-12">
                <p class="fw-500 text-muted font-small text-center">
                    Terimakasih atas saran & masukannya <br>  Kami akan terus berusaha untuk menjadi lebih baik lagi
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        agen: String
    },
    emits: ['showtoast'],
    data() {
        return {
            kategori: [],
            active_el: 0,
            count: 0,
            disable: false,
            form: {
                kategori:'',
                deskripsi:'',
                kd_agen: '',
                nama: '',
                email: '',
                whatsapp: ''
            }
        }
    },
    created() {
        this.get_kategori()
    },
    methods: {
        gantiwarna(posisi){
            this.active_el = posisi
            this.form.kategori = posisi
        },
        limiter(){
            this.count = this.form.deskripsi.length
        },
        async simpanSaran(){
            try{
                this.disable = true
                const senData = {
                    'wtinkouridol': this.$route.params.token,
                    'nama': this.form.nama,
                    'email': this.form.email,
                    'kategori' : this.form.kategori,
                    'kode_agen' : this.agen,
                    'deskripsi' : this.form.deskripsi,   
                    'nomor_fu' : this.form.whatsapp             
                }
                let url = 'https://api.murapay.id:5743/api/external/saveSaran'
                const response = await axios.post(url, JSON.stringify(senData),{
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if(response.data.status == '200'){
                    this.$emit('showtoast', 'background-orange', 'Saran berhasil dikirim')
                    setTimeout(function(){
                        this.disable = false
                        window.location.replace("com.app.murapay://home");
                    }, 5000);
                }else{
                    this.disable = false
                    this.$emit('showtoast', 'bg-danger', response.data.message)
                }
            }catch(error){
                this.disable = false
                this.$emit('showtoast', 'bg-danger', error)
            }
        },
        async get_kategori(){
            try{
                const sendData = {
                    wtinkouridol: this.$route.params.token,
                };
                let url = 'https://api.murapay.id:5743/api/external/kategori_feedback'
                const response = await axios.post(url, JSON.stringify(sendData), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if(response.data.status == '200'){
                    this.kategori = response.data.response
                }else{
                    this.$emit('showtoast', 'bg-danger', response.data.message)
                }
            }catch(error){
                this.$emit('showtoast', 'bg-danger', error)
            }
        }
    }
}
</script>