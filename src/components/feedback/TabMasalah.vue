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
                <p class="fw-500 font-small mb-1 text-dark-blue">Kesalahan tak terduga (Bug)</p>
                <p class="fw-500 font-small mb-1 text-muted">Laporkan bug setiap kali Anda menemukan masalah agar dapat membantu
                kami untuk memperbaikinya lebih cepat.</p>
            </div>
            <div class="col-12">
                <div class="wrap-deskripsi" style="position:relative;">
                    <textarea id="textarea" autocomplete="off" spellcheck="false" wrap="soft" maxlength="1000" rows="5" max-rows="6" class="form-control font-small border-dark-blue" v-model="form.deskripsi" @keyup="limiter()"></textarea>
                    <div class="counter text-muted font-small" style="position:absolute;bottom:0;right:0;padding:0 5px 2px 0;"><span class="count">{{ count }}</span> / 1000</div>
                </div>
            </div>
            <div class="col-12">
                <p class="font-small mb-0 pt-1 text-muted">Upload screen shot (<i>optional</i>) membantu kami menemukan sumber masalah lebih detail. ({{data_image.length}} / 4).</p>
            </div>
            <div class="col-12 mt-2">
                <div class="d-flex">
                    <div v-for="(item,index) in data_image" :key="index" class="rounded border-dark-blue p-1 d-flex justify-content-center me-2 position-relative">
                        <div v-if="item.show == true">
                            <img :src="item.url" style="height: 43px; width: 43px; object-fit: contain;">
                            <button class="remove-image d-flex justify-content-center" @click="removeImage(index)">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="align-self-center" style="width:14;height:14;"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
                            </button>
                        </div>
                        <div v-else>
                           <div class="loader"></div>
                        </div>
                    </div>
                    <div v-if="show_upload" class="rounded border-dark-blue p-1 d-flex justify-content-center" style="width:52px;height:52px;position-relative" @click="$refs.fileimage.click()">
                        <input ref="fileimage" type="file" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange($event)" hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-lg text-orange align-self-center" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </div>
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
                    <input type="text" inputmode="numeric" onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="form-control font-small" placeholder="Whatsapp" v-model="form.whatsapp">
                </div>
            </div>
            <div class="col-12 my-2">
                <button class="btn background-dark-blue text-white btn-block font-medium fw-500 w-100" @click="simpanSaran()" :disabled="disable">KIRIM</button>
            </div>
            <div class="col-12">
                <p class="fw-500 text-muted font-small text-center">
                    Terimakasih atas laporan yang sudah di kirimkan  <br> Kami akan melakukan analisa serta perbaikan terhadap kesalahan yang ditemukan.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        agen: String
    },
    emits: ['showtoast'],
    data(){ 
        return {
            show_upload : true,
            form: {
                deskripsi: "",
                nama: "",
                email: "",
                whatsapp: ""
            },
            disable : false,
            data_image : [],
            count: 0
        }
    },
    methods : {
        limiter() {
            this.count = this.form.deskripsi.length;
        },
        async simpanSaran() {
            try {
                this.disable = true
                const senData = {
                'wtinkouridol': this.$route.params.token,
                'nama': this.form.nama,
                'email': this.form.email,
                'kategori' : this.form.kategori,
                'kode_agen' : this.agen,
                'deskripsi' : this.form.deskripsi,   
                'nomor_fu' : this.form.whatsapp,
                'foto': this.data_image.map(item => item.url)             
                }
                let url = 'https://api.murapay.id:5743/api/external/saveFeedback'
                const response = await axios.post(url, JSON.stringify(senData),{
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if(response.data.status == '200'){
                    this.$emit('showtoast', 'background-orange', 'Laporan Kesalahan tak terduga(Bug) berhasil dikirim')
                    setTimeout(function(){
                        this.disable = false
                        window.location.replace("com.app.murapay://home");
                    }, 5000);
                }else{
                    this.disable = false
                    this.$emit('showtoast', 'bg-danger', response.data.message)
                }   
            } catch (error) {
                this.disable = false
                this.$emit('showtoast', 'bg-danger', error.message)
            }
        },
        async onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            let x = {
                show : false,
                url : ""
            }
            let newfile = files[0];
            let base = await this.base64_image(newfile);
            base = base.replace(/^data:image\/[a-z]+;base64,/, "");
            let count = this.data_image.length;
            this.data_image.push(x);
            let d = new Date();
            let filename = `${this.agen}_${d.getTime()}_${newfile.name}`
            await this.upload(base, count, filename);
            this.$refs.fileimage.value = '';
            if(this.data_image.length == 4) {
                this.show_upload = false;
            }
        },
        async base64_image(file){
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = error => reject(error);
            });
        },
        removeImage(index){
            this.data_image.splice(index, 1);
            this.show_upload = true;
        },
        async upload(base64,count,filename) {
            let formdata = new FormData();
            formdata.append("image", base64);
            formdata.append("filename", filename);
            await axios.post("https://murapay.id/app/addon/uploadfeed.php", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.data_image[count].show = true;
                this.data_image[count].url = res.data.url;
            }).catch(err => {
                this.$emit('showtoast', 'bg-danger', err.message);
            })
        }
    }
}
</script>