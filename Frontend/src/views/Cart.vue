<!-- eslint-disable no-unused-vars -->
<template>
    <div>
        <section class="h-100 h-custom">
            <div class="container h-100 py-5">
                <div
                    v-if="$store.state.cart.length > 0"
                    class="row d-flex justify-content-center align-items-center h-100"
                >
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="h5">Shopping Bag</th>

                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in $store.state.cart" :key="item.id">
                                        <th scope="row" class="border-bottom-0">
                                            <div class="d-flex align-items-center">
                                                <img
                                                    :src="item.image"
                                                    class="img-fluid rounded-3"
                                                    style="width: 83px; height: 112px"
                                                    alt="Book"
                                                />
                                                <div class="flex-column ms-4">
                                                    <p class="mb-2">
                                                        {{ item.name }}
                                                    </p>
                                                    <p class="mb-0">{{ item.brand }}</p>
                                                </div>
                                            </div>
                                        </th>

                                        <td class="align-middle border-bottom-0">
                                            <div class="d-flex flex-row">
                                                <button class="btn btn-link px-2" @click="decrementQuentity(item)">
                                                    <i class="fas fa-minus"></i>
                                                </button>

                                                <input
                                                    id="form1"
                                                    min="1"
                                                    name="quantity"
                                                    :value="item.quantity"
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    style="width: 53px"
                                                />

                                                <button class="btn btn-link px-2" @click="addToCart(item)">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="align-middle border-bottom-0">
                                            <p class="mb-0" style="font-weight: 500">{{ item.totalPrice }} VND</p>
                                        </td>
                                        <td class="align-middle border-bottom-0">
                                            <img
                                                class="mb-0"
                                                style="height: 25px"
                                                src="../assets/icons8_close_50px.png"
                                                @click="removeFromCart(item)"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card shadow-2-strong mb-5 mb-lg-0" style="border-radius: 16px">
                        <div class="card-body p-4">
                            <div class="row">
                                <div class="col-lg-4 col-xl-3">
                                    <div class="d-flex justify-content-between" style="font-weight: 500">
                                        <p class="mb-2">Subtotal</p>
                                        <p class="mb-2">{{ totalPrice - 7 }} VND</p>
                                    </div>

                                    <div class="d-flex justify-content-between" style="font-weight: 500">
                                        <p class="mb-0">Shipping</p>
                                        <p class="mb-0">7 VND</p>
                                    </div>

                                    <hr class="my-4" />

                                    <div class="d-flex justify-content-between mb-4" style="font-weight: 500">
                                        <p class="mb-2">Total (Shipping included)</p>
                                        <p class="mb-2">{{ totalPrice }}VND</p>
                                    </div>

                                    <button
                                        @click="CheckOutProducts"
                                        v-if="uid"
                                        type="button"
                                        class="btn btn-primary btn-block btn-lg"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        <div class="d-flex justify-content-between">
                                            <span>Checkout</span>
                                        </div>
                                    </button>
                                    <button
                                        v-if="uid == null"
                                        type="button"
                                        class="btn btn-primary btn-block btn-lg"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal1"
                                    >
                                        <div class="d-flex justify-content-between">
                                            <span>Checkout</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row d-flex justify-content-center align-items-center h-100">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="h5">Shopping Bag</th>
                            </tr>
                        </thead>
                    </table>
                    <br />
                    <div>
                        <p style="text-align:center;">Cart is empty</p>
                        <br />
                        <br />
                        <router-link to="/products">
                            <img src="../assets/icons8_back_64px.png" style="height: 37px" />
                        </router-link>
                        <a style="width: auto"> Continue shopping </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border: black">
                <div class="modal-header" style="background: #242121; color: white">
                    <div class="r" style="display: flex; margin: auto">
                        <img src="../assets/icons8_Done_64px_1.png" style="height: 31px" />
                        <h5 class="modal-title" id="exampleModalLabel">Order will be processed</h5>
                    </div>
                </div>
                <div class="modal-body" style="display: flex">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img
                                src="../assets/time-check-symbol_ready_timer_checkmark_countdown_compliance_done_reminder-512.webp"
                                class="img-fluid rounded-start"
                                alt="..."
                            />
                        </div>
                        <div class="col">
                            <p class="card-text" style="margin-top: 62px; margin-left: 46px">
                                Your order will be processed !
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <!-- Modal 2 -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border: black">
                <div class="modal-header" style="background: #242121; color: white">
                    <div class="r" style="display: flex; margin: auto">
                        <img src="../assets/icons8_close_26px.png" style="height: 31px" />
                        <h5 class="modal-title" id="exampleModalLabel">You need to login first</h5>
                    </div>
                </div>
                <div class="modal-body" style="display: flex">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../assets/R.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col">
                            <p class="card-text" style="margin: revert; margin-left: 29px">You need to login first</p>

                            <div class="container row">
                                <button type="button" class="btn btn-outline-dark" @click="CreateAccount">
                                    Create an account
                                </button>
                                <br />
                                <button type="button" class="btn btn-outline-dark" @click="Login">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close1" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal 2 -->
</template>
<script>
import { cartService } from '@/services/cart.service';
import { userService } from '@/services/user.service';
var today = new Date();
var now_date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

export default {
    name: 'CartView',
    data() {
        return {
            cartData: {
                uid: '',
                user_name: '',
                user_address: '',
                user_phone: '',
                created_date: '',
                cart: '',
                total: 0,
                valid: false,
            },
        };
    },
    computed: {
        uid() {
            return this.$store.state.uid;
        },
        totalPrice() {
            let total = 0;

            for (let item of this.$store.state.cart) {
                total += item.totalPrice;
            }
            total = total + 7;
            return total.toFixed(2);
        },
    },
    methods: {
        async CheckOutProducts() {
            try {
                const data1 = await userService.get(this.uid);
                this.cartData.uid = data1.id;
                this.cartData.user_name = data1.name;
                this.cartData.user_address = data1.address;
                this.cartData.user_phone = data1.phone;
                this.cartData.created_date = now_date;
                this.cartData.total = this.totalPrice;
                this.cartData.valid = false;
                this.cartData.cart = JSON.stringify(
                    // eslint-disable-next-line no-unused-vars
                    this.$store.state.cart.map(({ image, ...keepAttrs }) => {
                        return keepAttrs;
                    }),
                );
                const data2 = await cartService.create(this.cartData);
                if (data2.message === 'Create success') {
                    this.$store.commit("resetCart");
                    this.$router.push({ name: 'products' });
                } else alert('Something is wrong');
            } catch (error) {
                alert(error);
            }
        },
        addToCart(item) {
            this.$store.commit('addToCart', item);

            console.log(item);
        },
        removeFromCart(item) {
            this.$store.commit('removeFromCart', item);
        },
        decrementQuentity(item) {
            this.$store.commit('decrementQuentity', item);
        },
        CreateAccount() {
            this.$router.push({ name: 'signin' });
            document.getElementById('close1').click();
        },
        Login() {
            this.$router.push({ name: 'login' });
            document.getElementById('close1').click();
        },
    },
    created() {},
};
</script>
