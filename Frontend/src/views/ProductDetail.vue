<template>
    <br />
    <div class="mt-5" style="margin-top: 1rem !important" v-if="productDetaills == true">
        <div class="card">
            <div class="row g-0">
                <div class="col-md-6 border-end">
                    <div class="d-flex flex-column justify-content-center">
                        <div class="main_image">
                            <img :src="product.image" id="main_product_image" width="350" />
                        </div>
                        <div class="thumbnail_images">
                            <ul id="thumbnail">
                                <li>
                                    <img onclick="changeImage(this)" :src="product.image" width="70" />
                                </li>
                                <li>
                                    <img onclick="changeImage(this)" :src="product.image" width="70" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 right-side">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3>{{ product.name }}</h3>
                        </div>

                        <h3 style="color: #005eb8; font-size: xx-large">{{ product.price }} VND</h3>
                        <div class="mt-2 pr-3 content" style="margin-top: 1rem !important">
                            <p style="font-size: 16px">
                                {{ product.description }}
                            </p>
                        </div>
                        
                        <div class="mt-5">
                            <div class="r" style="display: flex; margin: auto">
                                <span class="fw-bold">Total: </span>
                                <div class="ratings d-flex flex-row align-items-center">
                                <span style="color: #005eb8; font-size: 1.1rem;">{{ product.totalPrice }} VND</span>
                            </div>
                        </div>
                        </div>
                        <div class="mt-5">
                            <div class="r" style="display: flex; margin: auto">
                                <span class="fw-bold">Status: </span>
                                <img src="../assets/icons8_done_48px.png" style="margin-left: 15px; width: 23px" />
                                <span id="exampleModalLabel" />
                                Available
                            </div>
                        </div>
                        <br />
                        <div class="buttons d-flex flex-row mt-5 gap-3">
                            <div class="row" style="margin-top: -30px">
                                <div>
                                    <h5>Quantity</h5>
                                </div>
                                <div class="d-flex flex-row">
                                    <button class="btn btn-link px-2" style="width: 30px" @click="product.quantity--">
                                        <i class="fas fa-minus"></i>
                                    </button>

                                    <input
                                        id="form1"
                                        min="1"
                                        name="quantity"
                                        :value="product.quantity"
                                        type="number"
                                        class="form-control form-control-sm"
                                        style="width: 53px"
                                    />

                                    <button class="btn btn-link px-2" style="width: 30px" @click="product.quantity++;;product.totalPrice += product.price;">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button
                                class="btn btn-dark"
                                style="background: #2970da"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                @click="addToCart(product)"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border: black">
                <div class="modal-header" style="background: #242121; color: white">
                    <div class="r" style="display: flex; margin: auto">
                        <img src="../assets/icons8_Done_64px_1.png" style="height: 31px" />
                        <h5 class="modal-title" id="exampleModalLabel">Product added to cart successfully</h5>
                    </div>
                </div>
                <div class="modal-body" style="display: flex">
                    <div class="card mb-3" style="max-width: 540px">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img :src="product.image" class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{ product.name }}</h5>
                                    <h6 class="card-text">{{ product.brand }}</h6>
                                    <br />
                                    <h6 class="card-text">Price : {{ product.price }} VND</h6>
                                    <p class="card-text">There are {{ $store.state.count }} items in your cart.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close" class="btn btn-dark" data-bs-dismiss="modal">
                        Continue shopping
                    </button>
                    <button type="submit" class="btn btn-dark" @click="Gotocart">Go to cart</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
</template>
<script>
import { productService } from '@/services/product.service';

export default {
    name: 'detailsView',
    props: {
        id: { type: Number, required: true },
    },
    data() {
        return {
            product: {
                id: '',
                name: '',
                brand: '',
                description: '',
                price: '',
                image: '',
                quantity: 1,
                totalPrice: '',
            },
            productDetaills: false,
        };
    },
    created() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            try {
                const findproduct = await productService.get(this.id);
                if (findproduct != undefined) {
                    this.product.name = findproduct.name;
                    this.product.brand = findproduct.brand;
                    this.product.price = findproduct.price;
                    this.product.description = findproduct.description;
                    this.product.image = findproduct.image;
                    this.product.id = findproduct.id;
                    this.product.quantity = 1;
                    this.product.totalPrice = findproduct.price;
                    this.productDetaills = true;
                } else {
                    this.$router.push({ name: 'notfound' });
                }
            } catch (error) {
                console.log(error);
            }
        },
        addToCart(item) {
            this.$store.commit('addToCart', item);
        },
        Gotocart() {
            this.$router.push({name: "cart"});
            document.getElementById("close").click();
        },
    },
};
</script>
<style>
.card {
    border: none;
    overflow: hidden;
}
.thumbnail_images ul {
    list-style: none;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.thumbnail_images ul li {
    margin: 5px;
    padding: 10px;
    border: 2px solid #eee;
    cursor: pointer;
    transition: all 0.5s;
}
.thumbnail_images ul li:hover {
    border: 2px solid #000;
}
.main_image {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    height: 400px;
    width: 100%;
    overflow: hidden;
}

.content p {
    font-size: 12px;
}
.ratings span {
    font-size: 14px;
    margin-left: 6px;
}
.colors {
    margin-top: 5px;
}
.colors ul {
    list-style: none;
    display: flex;
    padding-left: 0px;
}
.colors ul li {
    height: 20px;
    width: 20px;
    display: flex;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
}
.colors ul li:nth-child(1) {
    background-color: #6c704d;
}
.colors ul li:nth-child(2) {
    background-color: #96918b;
}
.colors ul li:nth-child(3) {
    background-color: #68778e;
}
.colors ul li:nth-child(4) {
    background-color: #263f55;
}
.colors ul li:nth-child(5) {
    background-color: black;
}
.right-side {
    position: relative;
}

.buttons .btn {
    height: 50px;
    width: 150px;
    border-radius: 0px !important;
}
</style>
