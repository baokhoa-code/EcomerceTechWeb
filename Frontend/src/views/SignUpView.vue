<template>
    <div class="vh-100 d-flex justify-content-center align-items-center" style="background: rgb(57 181 255)">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card bg-white">
                        <div class="card-body p-5">
                            <form class="mb-3 mt-md-4" @submit.prevent="signupUser">
                                <h2 class="fw-bold mb-2 text-uppercase" style="margin-left: 38%;">Join Us !</h2>
                                <div class="alert alert-danger" v-if="messageError">
                                    {{ messageError }}
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Name</label>
                                    <input
                                        type="name"
                                        class="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Your Name"
                                        v-model="user.name"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="name@example.com"
                                        v-model="user.email"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        placeholder="*******"
                                        v-model="user.pass"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="adress" class="form-label">Shipping Address</label>
                                    <input
                                        type="address"
                                        class="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="ex: Ghardimaou, Jendouba, 8160"
                                        v-model="user.address"
                                    />
                                </div>
                                <div class="form-outline">
                                    <label class="form-label" for="typePhone">Phone number</label>
                                    <input
                                        type="tel"
                                        id="typePhone"
                                        class="form-control"
                                        placeholder="ex: 97 384 764"
                                        v-model="user.phone"
                                    />
                                </div>

                                <div class="d-grid">
                                    <br />
                                    <button class="btn btn-outline-dark" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { userService } from '@/services/user.service';
export default {
    name: 'LoginView',
    data() {
        return {
            user: {
                name: '',
                email: '',
                pass: '',
                address: '',
                phone: '',
            },
            messageError: '',
        };
    },
    methods: {
        async signupUser() {
            if (this.user.name == '') this.messageError = 'Name cannot be empty';
            if (this.user.email == '') this.messageError = 'Email cannot be empty';
            if (this.user.pass == '') this.messageError = 'Password cannot be empty';
            if (this.user.phone == '') this.messageError = 'Phone number cannot be empty';
            if (this.user.address == '') this.messageError = 'Shipping address cannot be empty';
            if (
                !this.user.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            )
                this.messageError = 'Email is invalid';
            else {
                try {
                    const data = await userService.create(this.user);
                    console.log(data.message);
                    if (data.message === 'Create success') {
                        if(confirm("Do you want to login by your created account?"))
                            this.$router.push({ name: 'login' });
                        else
                            this.$router.push({ name: 'home' });
                    } else this.messageError = data.message;
                } catch (error) {
                    this.messageError = error;
                }
            }
        },
    },
};
</script>
