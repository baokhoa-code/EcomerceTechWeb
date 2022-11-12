<template>
    <div class="container">
        <br />
        <h1 style="text-align: center">Orders</h1>
        <br />
        <table class="table table-bordered" v-if="orders.length > 0">
            <thead style="background: #39b5ff; color: white">
                <tr>
                    <!-- <th scope="col"></th> -->
                    <th scope="col">Customer name</th>
                    <th scope="col">Customer Address</th>
                    <th scope="col">Customer Phone</th>
                    <th scope="col">Date</th>
                    <th scope="col">Products</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <!-- <th scope="row"></th> -->
                    <td class="align-middle">{{ item.user_name }}</td>
                    <td class="align-middle">{{ item.user_address }}</td>
                    <td class="align-middle">{{ item.user_phone }}</td>
                    <td class="align-middle">{{ item.created_date }}</td>
                    <td>
                        <table class="table mb-0 table-bordered">
                            <thead>
                                <tr class="table-secondary">
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="cartitem in item.cartObj" :key="cartitem.id">
                                    <td>{{ cartitem.name }}</td>
                                    <td>{{ cartitem.quantity }}</td>
                                    <td>{{ cartitem.price }} VND</td>
                                    <td>{{ cartitem.totalPrice }} VND</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="table-active">Total Price (shipping included)</td>
                                    <td>{{ item.total }} VND</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <div class="d-grid gap-2">
                            <button
                                type="button"
                                v-if="item.valid == false"
                                @click="GetData(item, 'valid')"
                                class="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#validateFromModal"
                            >
                                Validate
                            </button>
                            <button
                                type="button"
                                v-if="item.valid == true"
                                @click="GetData(item, 'unvalid')"
                                class="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#validateFromModal"
                            >
                                Unvalidate
                            </button>
                            <button
                                type="button"
                                v-if="item.valid == true"
                                @click="GetData(item, '')"
                                class="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#detailFromModal"
                            >
                                Print Detail
                            </button>
                            <button
                                type="button"
                                class="btn"
                                style="background: red; color: white"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteFromModal"
                                @click="GetData(item, '')"
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="row d-flex justify-content-center align-items-center h-100">
            <br />
            <div>
                <p style="text-align: center">Orders page is empty</p>
                <br />
                <br />
                <router-link to="/products">
                    <img src="../assets/icons8_back_64px.png" style="height: 37px" />
                </router-link>
                <a style="width: auto"> Continue shopping </a>
            </div>
        </div>

        <!-- Validate Modal -->
        <div
            class="modal fade"
            id="validateFromModal"
            tabindex="-1"
            aria-labelledby="validateFromModalLable"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content" style="border: black">
                    <div class="modal-header" style="background: #242121; color: white">
                        <div class="r" style="display: flex; margin: auto">
                            <h5 class="modal-title" id="validateFromModalLable">
                                Do you want to make this order {{ orderData.type }}?
                            </h5>
                        </div>
                    </div>

                    <div class="card mb-2" style="margin: 1rem !important; max-width: 540px">
                        <div class="card-body">
                            <h5 class="card-title">{{ orderData.user_name }}</h5>
                            <h6 class="card-text">{{ orderData.user_address }}</h6>
                            <h6 class="card-text">{{ orderData.user_phone }}</h6>
                            <br />
                            <h6 class="card-text">Total Price : {{ orderData.total }} VND</h6>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-dark" @click="validorder(orderData.item)">Yes</button>
                        <button type="button" id="close1" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Validate Modal -->

        <!-- Delete Modal -->
        <div
            class="modal fade"
            id="deleteFromModal"
            tabindex="-1"
            aria-labelledby="deleteFromModalLable"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content" style="border: black">
                    <div class="modal-header" style="background: #242121; color: white">
                        <div class="r" style="display: flex; margin: auto">
                            <h5 class="modal-title" id="deleteFromModalLable">Do you want to delete this order?</h5>
                        </div>
                    </div>

                    <div class="card mb-2" style="margin: 1rem !important; max-width: 540px">
                        <div class="card-body">
                            <h5 class="card-title">{{ orderData.user_name }}</h5>
                            <h6 class="card-text">{{ orderData.user_address }}</h6>
                            <h6 class="card-text">{{ orderData.user_phone }}</h6>
                            <h6 class="card-text">{{ orderData.created_date }}</h6>
                            <br />
                            <h6 class="card-text">Total Price : {{ orderData.total }} VND</h6>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-dark" @click="deleteorder(orderData.id)">Yes</button>
                        <button type="button" id="close2" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete Modal -->

        <!-- Order detail, print Model) -->
        <div
            class="modal fade"
            id="detailFromModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="detailFromModalLable"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-xl">
                <div class="modal-content" style="border: black">
                    <div class="modal-header" style="background: #242121; color: white">
                        <h5 class="modal-title" id="detailFromModalLable" style="display: flex; margin: auto">
                            Print the order
                        </h5>
                    </div>
                    <div class="modal-body">
                        <!-- form start here -->
                        <div class="container" id="printJS-form">
                            <div class="col-md-12">
                                <div class="invoice">
                                    <!-- begin invoice-company -->

                                    <div class="row align-items-start">
                                        <div class="col">CanThoTech, Inc</div>
                                    </div>
                                    <!-- end invoice-company -->
                                    <!-- begin invoice-header -->
                                    <div class="invoice-header">
                                        <div class="invoice-from">
                                            <small>from</small>
                                            <address class="m-t-5 m-b-5">
                                                <strong class="text-inverse">CanThoTech, Inc.</strong><br />
                                                Address: Can Tho, Viet Nam<br />
                                                Phone: (+84) 372 753 988
                                            </address>
                                        </div>
                                        <div class="invoice-to">
                                            <small>to</small>
                                            <address class="m-t-5 m-b-5">
                                                <strong class="text-inverse">{{ orderData.user_name }}</strong
                                                ><br />
                                                Address: {{ orderData.user_address }}<br />
                                                Phone: (+84) {{ orderData.user_phone }}
                                            </address>
                                        </div>
                                        <div class="invoice-date">
                                            <small>Ordered date:</small>
                                            <div class="date text-inverse m-t-5">
                                                {{ orderData.created_date }}
                                            </div>
                                            <br />
                                            <div class="invoice-detail">Services Product</div>
                                        </div>
                                    </div>
                                    <!-- end invoice-header -->
                                    <!-- begin invoice-content -->
                                    <div class="invoice-content">
                                        <!-- begin table-responsive -->
                                        <div class="table-responsive">
                                            <table class="table table-invoice">
                                                <thead>
                                                    <tr>
                                                        <th>PRODUCTS</th>
                                                        <th class="text-center" width="10%">RATE</th>
                                                        <th class="text-center" width="10%">QUANTITY</th>
                                                        <th class="text-right" width="20%">LINE TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in orderData.cartObj" :key="item.id">
                                                        <td>
                                                            <span class="text-inverse">{{ item.name }}</span
                                                            ><br />
                                                            <small>{{ item.brand }}</small>
                                                        </td>
                                                        <td class="text-center">{{ item.price }} DT</td>
                                                        <td class="text-center">{{ item.quantity }}</td>
                                                        <td class="text-right">{{ item.totalPrice }} DT</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!-- end table-responsive -->
                                        <!-- begin invoice-price -->
                                        <div class="invoice-price">
                                            <div class="invoice-price-left">
                                                <div class="invoice-price-row">
                                                    <div class="sub-price">
                                                        <small>SUBTOTAL</small>
                                                        <span class="text-inverse">{{ orderData.total - 7 }} VND</span>
                                                    </div>
                                                    <div class="sub-price">
                                                        <i class="fa fa-plus text-muted"></i>
                                                    </div>
                                                    <div class="sub-price">
                                                        <small>SHIPPING</small>
                                                        <span class="text-inverse">7 VND</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="invoice-price-right">
                                                <small>TOTAL</small>
                                                <span class="f-w-600">{{ orderData.total }} VND</span>
                                            </div>
                                        </div>
                                        <!-- end invoice-price -->
                                    </div>
                                    <!-- end invoice-content -->
                                    <!-- begin invoice-note -->
                                    <div class="invoice-note">
                                        * Make all cheques payable to CanThoTech<br />
                                        * Payment is due within 10 days<br />
                                        * If you have any questions concerning this invoice, contact
                                        khoab1910658@student.ctu.edu.vn or nhanB1910676@student.ctu.edu.vn
                                    </div>
                                    <!-- end invoice-note -->
                                    <!-- begin invoice-footer -->
                                    <div class="invoice-footer">
                                        <p class="text-center m-b-5 f-w-600">THANK YOU FOR YOUR BUSINESS</p>
                                    </div>
                                    <!-- end invoice-footer -->
                                </div>
                            </div>
                        </div>
                        <!-- form end here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close3" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn" style="background: red; color: white" @click="printinvoice">
                            Export as PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import printJS from 'print-js';
import { cartService } from '@/services/cart.service';
export default {
    name: 'OrdersView',
    data() {
        return {
            orders: [],
            orderData: {
                id: 0,
                type: '',
                user_name: '',
                user_address: '',
                user_phone: '',
                created_date: '',
                cart: '',
                cartObj: {},
                total: 0,
                item: {},
            },
        };
    },
    created() {
        const checkType = this.$store.state.utype;
        if(checkType == '' || checkType == 'User')
            this.$router.push({ name: 'home' })           
        else
            this.getOrders();
    },
    methods: {
        async getOrders() {
            try {
                const cartList = await cartService.getMany();
                if (cartList) {
                    const temparray = cartList.map((item) => {
                        return { cartObj: JSON.parse(item.cart), ...item };
                    });
                    this.orders = temparray;
                }
            } catch (error) {
                console.log(error);
            }
        },
        GetData(item, type) {
            this.orderData.type = type;
            this.orderData.id = item.id;
            this.orderData.user_name = item.user_name;
            this.orderData.user_address = item.user_address;
            this.orderData.user_phone = item.user_phone;
            this.orderData.created_date = item.created_date;
            this.orderData.cart = item.cart;
            this.orderData.cartObj = item.cartObj;
            this.orderData.total = item.total;
            this.orderData.item = item;
        },
        async validorder(item) {
            try {
                item.valid = !item.valid;
                await cartService.update(item.id, { valid: item.valid });
                document.getElementById('close1').click();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteorder(id) {
            try {
                await cartService.delete(id);
                document.getElementById('close2').click();
                this.getOrders();
            } catch (error) {
                console.log(error);
            }
        },
        printinvoice() {
            printJS({
                printable: 'printJS-form',
                type: 'html',
                targetStyles: ['*'],
                scanStyles: true,
            });
        },
    },
};
</script>
<style>
body {
    background: rgb(255, 255, 255);
}

.invoice {
    background: #fff;
    padding: 20px;
}

.invoice-company {
    font-size: 20px;
}

.invoice-header {
    margin: 0 -20px;
    background: #f0f3f4;
    padding: 20px;
}

.invoice-date,
.invoice-from,
.invoice-to {
    display: table-cell;
    width: 1%;
}

.invoice-from,
.invoice-to {
    padding-right: 20px;
}

.invoice-date .date,
.invoice-from strong,
.invoice-to strong {
    font-size: 16px;
    font-weight: 600;
}

.invoice-date {
    text-align: right;
    padding-left: 20px;
}

.invoice-price {
    background: #f0f3f4;
    display: table;
    width: 100%;
}

.invoice-price .invoice-price-left,
.invoice-price .invoice-price-right {
    display: table-cell;
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
    width: 75%;
    position: relative;
    vertical-align: middle;
}

.invoice-price .invoice-price-left .sub-price {
    display: table-cell;
    vertical-align: middle;
    padding: 0 20px;
}

.invoice-price small {
    font-size: 12px;
    font-weight: 400;
    display: block;
}

.invoice-price .invoice-price-row {
    display: table;
    float: left;
}

.invoice-price .invoice-price-right {
    width: 25%;
    background: #2d353c;
    color: #fff;
    font-size: 28px;
    text-align: right;
    vertical-align: bottom;
    font-weight: 300;
}

.invoice-price .invoice-price-right small {
    display: block;
    opacity: 0.6;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 12px;
}

.invoice-footer {
    border-top: 1px solid #ddd;
    padding-top: 10px;
    font-size: 10px;
}

.invoice-note {
    color: #999;
    margin-top: 80px;
    font-size: 85%;
}

.invoice > div:not(.invoice-footer) {
    margin-bottom: 20px;
}

.btn.btn-white,
.btn.btn-white.disabled,
.btn.btn-white.disabled:focus,
.btn.btn-white.disabled:hover,
.btn.btn-white[disabled],
.btn.btn-white[disabled]:focus,
.btn.btn-white[disabled]:hover {
    color: #2d353c;
    background: #fff;
    border-color: #d9dfe3;
}
</style>
