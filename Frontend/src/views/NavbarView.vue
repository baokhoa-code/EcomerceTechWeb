<template>
    <nav class="navbar navbar-expand-lg" style="background: #39b5ff">
        <div class="container">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link to="/"><img src="../assets/logo-full.svg" width="120" height="40" /></router-link>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
                        <li class="nav-item">
                            <router-link class="nav-link active" style="color: white" aria-current="page" to="/"
                                >Home</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" v-if="uid && utype == 'User'" to="/products">Products</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" v-if="uid && utype == 'Admin'" to="/myproducts"
                                >My Products</router-link
                            >
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" v-if="uid == null" to="/login">Log In</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" v-if="uid == null" to="/signin">Sign Up</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" v-if="uid && utype == 'Admin'" to="/orders"
                                >Orders</router-link
                            >
                        </li>

                        <!-- <li class="nav-item">
                            <router-link class="nav-link" to="/test">test</router-link>
                        </li> -->

                        <li v-if="uid && utype == 'User'">
                            <router-link id="cart" to="/cart" class="cart" :data-totalitems="count">
                                <i class="fas fa-shopping-cart"></i>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-if="uid">
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle fas fa-user"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style="width: 100%"
                            >
                                <span
                                    style="
                                        margin-left: 10px;
                                        margin-bottom: 15px;
                                        font-size: 0.7rem;
                                        letter-spacing: 1px;
                                    "
                                    >Hello, {{ utype }}: {{ uname }}</span
                                >
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#informodel"
                                        @click="getData()"
                                        >Information</a
                                    >
                                </li>
                                <li><a class="dropdown-item" style="cursor: pointer" v-on:click="logout">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div>
        <!-- Infomation Modal -->
        <div class="modal fade" id="informodel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="border: black">
                    <div class="modal-header" style="background: #242121; color: white">
                        <div class="r" style="display: flex; margin: auto">
                            <h5 class="modal-title" id="exampleModalLabel">User Information</h5>
                        </div>
                    </div>
                    <div class="modal-body" style="display: block">
                        <div class="alert alert-danger" v-if="messageError">
                            {{ messageError }}
                        </div>
                        <div class="alert alert-success" role="alert" v-if="messageSucess">
                            {{ messageSucess }}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input
                                type="name"
                                class="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Your Name"
                                v-model="userData.name"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="name@example.com"
                                v-model="userData.email"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="*******"
                                v-model="userData.pass"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="adress" class="form-label">Shipping Address</label>
                            <input
                                type="address"
                                class="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ex: Ghardimaou, Jendouba, 8160"
                                v-model="userData.address"
                            />
                        </div>
                        <div class="form-outline">
                            <label class="form-label" for="typePhone">Phone number</label>
                            <input
                                type="tel"
                                id="typePhone"
                                class="form-control"
                                placeholder="ex: 97 384 764"
                                v-model="userData.phone"
                            />
                        </div>
                    </div>
                    <div class="modal-footer" style="justify-content: flex-start">
                        <button type="button" class="btn btn-info" style="color: white" @click="UpdateUser()">
                            Change Infomation
                        </button>
                        <button
                            type="button"
                            id="close"
                            data-bs-dismiss="modal"
                            class="btn btn-danger"
                            style="margin-left: 227px"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>
<script>
import { userService } from '@/services/user.service';
import { adminService } from '@/services/admin.service';
export default {
    name: 'NavbarView',
    data() {
        return {
            userData: {
                id: '',
                type: '',
                name: '',
                phone: '',
                address: '',
                email: '',
                pass: '',
            },
            messageError: '',
            messageSucess: '',
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('uid', null);
            this.$store.dispatch('utype', '');
            this.$store.dispatch('token', '');
            this.$router.push({ name: 'login' });
        },
        async getData() {
            this.userData.id = this.$store.state.uid;
            this.userData.type = this.$store.state.utype;
            if (this.userData.type == 'Admin') {
                try {
                    const data = await adminService.get(this.userData.id);
                    if (data.message === 'Retrieve success') {
                        this.userData.name = data.name;
                        this.userData.address = data.address;
                        this.userData.phone = data.phone;
                        this.userData.pass = data.pass;
                        this.userData.email = data.email;
                    }
                } catch (error) {
                    this.messageError = error;
                }
            } else {
                try {
                    const data = await userService.get(this.userData.id);
                    if (data.message === 'Retrieve success') {
                        this.userData.name = data.name;
                        this.userData.address = data.address;
                        this.userData.phone = data.phone;
                        this.userData.pass = data.pass;
                        this.userData.email = data.email;
                    }
                } catch (error) {
                    this.messageError = error;
                }
            }
        },
        async UpdateUser() {
            var data1;
            try {
                if(this.userData.type == 'Admin')
                    data1 = await adminService.update(this.userData.id,this.userData);
                else
                    data1 = await userService.update(this.userData.id,this.userData);
                if (data1.message === 'Update success') {
                    this.messageSucess = data1.message;
                } else this.messageError = data1.message;
            } catch (error) {
                this.messageError = error;
            }
        },
    },
    mounted() {},
    watch() {},
    created() {},
    computed: {
        uid() {
            return this.$store.state.uid;
        },
        utype() {
            return this.$store.state.utype;
        },
        uname() {
            return this.$store.state.uname;
        },
        count() {
            return this.$store.state.count;
        },
    },
};
</script>
<style>
.cart {
    position: fixed;
    top: 20px;
    right: 40px;
    width: 30px;
    height: 30px;
    background: #292d48;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 5px;
}

.cart i {
    font-size: 25px;
    color: white;
}

.cart:before {
    content: attr(data-totalitems);
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    top: -12px;
    right: -12px;
    background: #ff0000;
    line-height: 24px;
    padding: 0 5px;
    height: 24px;
    min-width: 24px;
    color: white;
    text-align: center;
    border-radius: 24px;
}

.cart.shake {
    -webkit-animation: shakeCart 0.4s ease-in-out forwards;
    animation: shakeCart 0.4s ease-in-out forwards;
}

.navbar-expand-lg .navbar-nav .nav-link {
    color: white;
}
</style>
