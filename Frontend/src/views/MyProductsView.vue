<template>
    <br />
    <div class="container">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFromModal">
            Add new product
        </button>
        <br />
        <h1 style="text-align: center">My Products</h1>
        <br />
        <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            <div class="col hp" v-for="item in products" :key="item.id">
                <div class="card1 h-100 shadow-sm">
                    <a href="#">
                        <img :src="item.image" class="card1-img-top" alt="product.title" />
                    </a>

                    <div class="label-top shadow-sm">
                        <a class="text-white" href="#">{{ item.brand }}</a>
                    </div>
                    <div class="card-body">
                        <div class="clearfix mb-3">
                            <span class="float-start badge rounded-pill bg-success">${{ item.price }}</span>
                        </div>
                        <h4 class="card-title" style="display: inline-block;height: 60px">
                            {{ item.name }}
                        </h4>
                        <h5 class="card-title" style="display: inline-block;height: 60px;margin-top: 20px">
                            <a target="_blank" style="display: inline-block;height: 60px" href="#">{{ item.description }}</a>
                        </h5>

                        <div class="d-grid gap-2 my-4">
                            <button
                                @click="getData(item)"
                                type="button"
                                class="btn btn-info bold-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#update"
                            >
                                Update
                            </button>
                            <button
                                @click="getData(item)"
                                type="button"
                                class="btn btn-danger bold-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#delete"
                            >
                                Delete
                            </button>
                        </div>
                        <div class="clearfix mb-1"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add modal -->
        <div
            class="modal fade"
            id="addFromModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Add Product</h5>
                        <button
                            type="button"
                            class="btn-close"
                            @click="clear"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <!-- form start here -->
                        <form @submit.prevent="AddProduct" enctype="multipart/form-data">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="name"
                                aria-label="default input example"
                                v-model="addProduct.name"
                            />
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Brand"
                                aria-label="default input example"
                                v-model="addProduct.brand"
                            />
                            <div class="input-group">
                                <input
                                    class="form-control"
                                    type="number"
                                    placeholder="Price"
                                    aria-label="Dollar amount (with dot and two decimal places)"
                                    v-model="addProduct.price"
                                />
                                <span class="input-group-text">$</span>
                            </div>

                            <input class="form-control" lang="en" type="file" ref="file1" @change="onchanged1" />

                            <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Description"
                                v-model="addProduct.description"
                            ></textarea>
                            <div class="alert alert-success" v-if="messageSuccess">
                                {{ messageSuccess }}
                            </div>
                            <div class="alert alert-warning" v-if="messageWarning">
                                {{ messageWarning }}
                            </div>
                            <div class="alert alert-danger" v-if="messageDanger">
                                {{ messageDanger }}
                            </div>
                            <button type="submit" class="btn btn-success">Add</button>
                        </form>
                        <!-- form end here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="clear" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal 2 (update) -->
        <div
            class="modal fade"
            id="update"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Update Product</h5>
                        <button
                            type="button"
                            class="btn-close"
                            @click="clear"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <!-- form start here -->
                        <form @submit.prevent="UpdateProduct">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="name"
                                aria-label="default input example"
                                v-model="dataProduct.name"
                            />
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Brand"
                                aria-label="default input example"
                                v-model="dataProduct.brand"
                            />
                            <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Description"
                                v-model="dataProduct.description"
                            ></textarea>
                            <input class="form-control" lang="en" type="file" ref="file2" @change="onchanged2" />
                            <div id="preview">
                                <img :src="url" style="width: 100px; height: 100px" />
                            </div>
                            <input
                                class="form-control"
                                type="number"
                                pla
                                ceholder="price"
                                aria-label="default input example"
                                v-model="dataProduct.price"
                            />
                            <div class="alert alert-success" v-if="messageUpdateSuccess">
                                {{ messageUpdateSuccess }}
                            </div>
                            <div class="alert alert-success" v-if="messageUpdateDanger">
                                {{ messageUpdateDanger }}
                            </div>
                            <button type="submit" class="btn btn-success">Update</button>
                        </form>
                        <!-- form end here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="clear" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal 3 (delete) -->
        <div
            class="modal fade"
            id="delete"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Delete Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        .
                        <!-- form start here -->
                        <form>
                            <h3>Do you want to delete this product ?</h3>
                            <br />
                            <h5>Name: {{ dataProduct.name }}</h5>
                        </form>
                        <!-- form end here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close5" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-danger" @click="DeleteProduct(dataProduct.id)">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { productService } from '@/services/product.service';

export default {
    name: 'MyProductsView',
    data() {
        return {
            dataProduct: {
                name: '',
                price: 0,
                image: '',
                brand: '',
                description: '',
                id: '',
                tempdata: '',
            },
            addProduct: {
                name: '',
                price: 0,
                image: '',
                brand: '',
                description: '',
            },
            products: [],
            messageSuccess: '',
            messageDanger: '',
            messageWarning: '',
            messageUpdateSuccess: '',
            messageUpdateDanger: '',
            url: null,
        };
    },
    methods: {
        clear() {
            this.$refs.file1.value = null;
            this.$refs.file2.value = null;
            this.dataProduct.name = '';
            this.dataProduct.price = 0;
            this.dataProduct.image = '';
            this.dataProduct.brand = '';
            this.dataProduct.description = '';
            this.dataProduct.id = '';
            this.addProduct.name = '';
            this.addProduct.price = 0;
            this.addProduct.image = '';
            this.addProduct.brand = '';
            this.addProduct.description = '';
            this.addProduct.id = '';
            this.url = null;
            this.messageSuccess = '';
            this.messageDanger = '';
            this.messageWarning = '';
            this.messageUpdateSuccess = '';
            this.messageUpdateDanger = '';
        },
        onchanged1() {
            this.addProduct.image = this.$refs.file1.files[0];
        },
        onchanged2() {
            this.dataProduct.image = this.$refs.file2.files[0];
            this.url = URL.createObjectURL(this.dataProduct.image);
        },
        async AddProduct() {
            const formdata = new FormData();
            formdata.append('name', this.addProduct.name);
            formdata.append('brand', this.addProduct.brand);
            formdata.append('price', this.addProduct.price);
            formdata.append('description', this.addProduct.description);
            formdata.append('image', this.addProduct.image);
            const data = await productService.create(formdata);
            if (data.message == 'Create success') {
                this.messageSuccess = data.message;
                this.messageDanger = '';
                this.messageWarning = '';
            }
            if (data.message == 'Create fail') {
                this.messageDanger = data.message;
                this.messageSuccess = '';
                this.messageWarning = '';
            }
            if (data.message == 'All field must be filled') {
                this.messageWarning = data.message;
                this.messageDanger = '';
                this.messageSuccess = '';
            }
            this.getProducts();
        },
        async UpdateProduct() {
            const formdata = new FormData();
            formdata.append('name', this.dataProduct.name);
            formdata.append('brand', this.dataProduct.brand);
            formdata.append('price', this.dataProduct.price);
            formdata.append('description', this.dataProduct.description);
            if (this.dataProduct.image != this.dataProduct.tempdata.image)
                formdata.append('image', this.dataProduct.image);
            const data = await productService.update(this.dataProduct.id, formdata);
            if (data.message == 'Update success') {
                this.messageUpdateSuccess = data.message;
                this.messageUpdateDanger = '';
            }
            if (data.message == 'Update fail') {
                this.messageUpdateSuccess = '';
                this.messageUpdateDanger = data.message;
            }
            this.getProducts();
        },
        async DeleteProduct(pid){
            try {
                await productService.delete(pid);
                document.getElementById('close5').click();
                this.clear();
                this.getProducts();
            } catch (error) {
                console.log(error);
            }
        },
        async getProducts() {
            try {
                const productsList = await productService.getMany();
                this.loading = false;
                this.products = productsList;
            } catch (error) {
                this.loading = true;
                console.log(error);
            }
        },
        getData(data) {
            this.dataProduct.name = data.name;
            this.dataProduct.brand = data.brand;
            this.dataProduct.price = data.price;
            this.dataProduct.description = data.description;
            this.dataProduct.image = data.image;
            this.dataProduct.id = data.id;
            this.dataProduct.tempdata = data;
            this.url = data.image;
        },
    },
    created() {
        const checkType = this.$store.state.utype;
        if(checkType == '' || checkType == 'User')
            this.$router.push({ name: 'home' })
        else
            this.getProducts();
    },
};
</script>
<style>
.form-control {
    margin-bottom: 16px;
}
.input-group-text {
    margin-bottom: 16px;
}

:root {
    --font1: 'Heebo', sans-serif;
    --font2: 'Fira Sans Extra Condensed', sans-serif;
    --font3: 'Roboto', sans-serif;

    --btnbg: #39b5ff;
    --btnfontcolor: rgb(255, 255, 255);
    --btnfontcolorhover: rgb(92, 89, 89);
    --btnbghover: #39b5ff;
    --btnactivefs: #39b5ff;

    --label-index: #960796;
    --danger-index: #5bc257;
    /* PAGINATE */
    --link-color: #000;
    --link-color-hover: #fff;
    --bg-content-color: #39b5ff;
}

.container-fluid {
    max-width: 1400px;
}

.card1 {
    background: #fff;
    position: relative;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow,
        0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
    border: 0;
    border-radius: 1rem;
}

.card1-img,
.card1-img-top {
    border-top-left-radius: calc(1rem - 1px);
    border-top-right-radius: calc(1rem - 1px);
}

.card1 h5 {
    overflow: hidden;
    height: 55px;
    font-weight: 300;
    font-size: 1rem;
}

.card1 h5 a {
    color: black;
    text-decoration: none;
}

.card1-img-top {
    width: 100%;
    min-height: 250px;
    max-height: 250px;
    object-fit: contain;
    padding: 30px;
}

.card1 h2 {
    font-size: 1rem;
}

.card1:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* Centered text */
.label-top {
    position: absolute;
    background-color: var(--label-index);
    color: #fff;
    top: 8px;
    right: 8px;
    padding: 5px 10px 5px 10px;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 3px;
    text-transform: uppercase;
}

.top-right {
    position: absolute;
    top: 24px;
    left: 24px;

    width: 90px;
    height: 90px;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 900;
    background: #8bc34a;
    line-height: 90px;
    text-align: center;
    color: white;
}

.top-right span {
    display: inline-block;
    vertical-align: middle;
    /* line-height: normal; */
    /* padding: 0 25px; */
}

.aff-link {
    /* text-decoration: overline; */
    font-weight: 500;
}

.over-bg {
    background: rgba(53, 53, 53, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border-radius: 0.5 rem;
}
.bold-btn {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: 5px 50px 5px 50px;
}
.box .btn {
    font-size: 1.5rem;
}

@media (max-width: 1025px) {
    .btn {
        padding: 5px 40px 5px 40px;
    }
}
@media (max-width: 250px) {
    .btn {
        padding: 5px 30px 5px 30px;
    }
}

/* START BUTTON */
.btn-warning {
    background: var(--btnbg);
    color: var(--btnfontcolor);
    fill: #ffffff;
    border: none;
    text-decoration: none;
    outline: 0;
    /* box-shadow: -1px 6px 19px rgba(247, 129, 10, 0.25); */
    border-radius: 1rem;
}
.btn-info {
    background: #08b21d;
    color: #ffffff;
    fill: #ffffff;
    border: none;
    text-decoration: none;
    outline: 0;
    border-radius: 1rem;
}
.btn-danger {
    background: #ff0000;
    color: #ffffff;
    fill: #ffffff;
    border: none;
    text-decoration: none;
    outline: 0;
    border-radius: 1rem;
}
.btn-sucess {
    border-radius: 1rem;
}
.btn-secondary {
    border-radius: 1rem;
}
.btn-warning:hover {
    background: var(--btnbghover);
    color: var(--btnfontcolorhover);
    /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}
.btn-check:focus + .btn-warning,
.btn-warning:focus {
    background: var(--btnbghover);
    color: var(--btnfontcolorhover);
    /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}
.btn-warning:active:focus {
    box-shadow: 0 0 0 0.25rem var(--btnactivefs);
}
.btn-warning:active {
    background: var(--btnbghover);
    color: var(--btnfontcolorhover);
    /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}

/* END BUTTON */

.bg-success {
    font-size: 1rem;
    background-color: var(--btnbg) !important;
    color: var(--btnfontcolor) !important;
}
.bg-danger {
    font-size: 1rem;
}

.price-hp {
    font-size: 1rem;
    font-weight: 600;
    color: darkgray;
}

.amz-hp {
    font-size: 0.7rem;
    font-weight: 600;
    color: darkgray;
}

.fa-question-circle:before {
    /* content: "\f059"; */
    color: darkgray;
}

.fa-heart:before {
    color: crimson;
}
.fa-chevron-circle-right:before {
    color: darkgray;
}
</style>
