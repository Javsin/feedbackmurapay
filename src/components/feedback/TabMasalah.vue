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
                <p class="text-muted font-small mb-1 pt-2">Deskripsi saran yang ingin disampaikan</p>
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
                        <img :src="item.url" style="height: 43px; width: 43px; object-fit: contain;">
                        <button class="remove-image d-flex justify-content-center" @click="removeImage(index)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="align-self-center" style="width:14;height:14;"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
                        </button>
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
                    <input type="number" class="form-control font-small" placeholder="Whatsapp" v-model="form.whatsapp">
                </div>
            </div>
            <div class="col-12 my-2">
                <button class="btn background-dark-blue text-white btn-block font-medium fw-500 w-100" @click="simpanSaran()">KIRIM</button>
            </div>
            <div class="col-12">
                <p class="fw-500 text-muted font-small text-center">
                    Terimakasih atas laporan yang sobat kirimkan,  <br> kami akan melakukan analisa serta perbaikan terhadap kesalahan yang ditemukan.
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
    data(){ 
        return {
            show_upload : true,
            form: {
                deskripsi: "",
                nama: "",
                email: "",
                whatsapp: ""
            },
            data_image : [],
            count: 0
        }
    },
    methods : {
        limiter() {
            this.count = this.form.deskripsi.length;
        },
        simpanSaran() {
            console.log(this.form);
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            let x = {
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
                base64 : ""
            }
            let newfile = files[0];
            let filereader = new FileReader();
            filereader.readAsDataURL(newfile);
            filereader.onload = function (evt) {
                let base64 = evt.target.result;
                this.data_image = base64;
                x.base64 = base64;
            }
            this.data_image.push(x);
            this.$refs.fileimage.value = '';
            if(this.data_image.length == 4) {
                this.show_upload = false;
            }
        },
    }
}
</script>