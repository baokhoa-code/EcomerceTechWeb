<template>
    <br />
    <form @submit.prevent="AddProduct" enctype="multipart/form-data">
        <input type="file" ref="file" @change="onchanged" />
        <div id="preview">
            <img v-if="url" :src="url" style="width:100px;height:100px;"/>
        </div>
        <button>Send</button>
    </form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { productService } from '@/services/product.service';
// import axios from 'axios';

export default {
    name: 'testView',
    data() {
        return {
            image: '',
            url: null,
        };
    },
    methods: {
        onchanged() {
            this.image = this.$refs.file.files[0];
            this.url = URL.createObjectURL(this.image);
        },
        async AddProduct() {
            const formdata = new FormData();    
            formdata.append('name', 'day la test4');
            formdata.append('brand', 'day la test3');
            formdata.append('price', 0);
            formdata.append('description', 'day la test3');
            formdata.append('image', this.image);
            // await axios.post('http://localhost:3000/api/products', formdata);
            var data = await productService.create(formdata);
            console.log(data);
        },
    },

    created() {},
};
</script>
