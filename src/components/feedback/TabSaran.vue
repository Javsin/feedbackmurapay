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
                    <input type="number" class="form-control font-small" placeholder="Whatsapp" v-model="form.whatsapp">
                </div>
            </div>
            <div class="col-12 my-2">
                <button class="btn background-dark-blue text-white btn-block font-medium fw-500 w-100" @click="simpanSaran()">KIRIM</button>
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
export default {
    props: {
        agen: String
    },
    data() {
        return {
            kategori: [
                {
                    id: "1",
                    nama_kategori : "Produk baru"
                },
                {
                    id: "2",
                    nama_kategori : "Fitur baru"
                },
                {
                    id: "3",
                    nama_kategori : "Media topup saldo"
                },
                {
                    id: "4",
                    nama_kategori : "Optimalisasi aplikasi"
                },
                {
                    id: "5",
                    nama_kategori : "Lainnya"
                }
            ],
            active_el: 0,
            count: 0,
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
    methods: {
        gantiwarna(posisi){
            this.active_el = posisi
            this.form.kategori = posisi
        },
        limiter(){
            this.count = this.form.deskripsi.length
        },
        simpanSaran(){
            const params = {
                'nama': this.form.nama,
                'email': this.form.email,
                'kategori' : this.form.kategori,
                'kode_agen' : this.agen,
                'deskripsi' : this.form.deskripsi,   
                'whatsapp' : this.form.whatsapp             
            }
            console.log(params)
            // axios.post('/api/save-saran',params).then(res => {
            //     if(res.data=='success'){
            //         this.$bvToast.toast('Terima kasih atas waktu dan keinginan Sobat dalam memberi masukan kepada Kami', {
            //             title: 'Data berhasil di kirim',
            //             variant: 'success',
            //             solid: true,
            //             toaster: 'b-toaster-top-full',
            //             appendToast: false,
            //         })
            //         setTimeout(function(){
            //             window.location.replace("com.unitedtronik://home");
            //         }, 5000);
            //     }else if(res.data=='fail'){
            //         this.$bvToast.toast('Mohon periksa kembali data anda', {
            //             title: 'Data gagal di kirim',
            //             variant: 'danger',
            //             solid: true,
            //             toaster: 'b-toaster-top-full',
            //             appendToast: false,
            //         })
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // })
        },
    }
}
</script>