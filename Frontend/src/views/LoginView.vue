<template>
    <div class="vh-100 d-flex justify-content-center align-items-center" style="background: rgb(57 181 255)">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card bg-white">
                        <div class="card-body p-5" style="padding-left: 7rem !important; padding-right: 7rem !important">
                            <form class="mb-3 mt-md-4" @submit.prevent="loginUser">
                                <h2 class="fw-bold mb-2 text-uppercase" style="margin-left: 32%; padding-bottom: 22px">
                                    Welcome !
                                </h2>
                                <div class="alert alert-danger" v-if="messageError">
                                    {{ messageError }}
                                </div>
                                <div class="mb-3">
                                    <label for="typeUser" class="form-label">User Type</label>
                                    <select class="form-select" id="typeUser" v-model="user.type" style="width: 120px">
                                        <option value="User" selected>User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="text" class="form-control" id="email" placeholder="name@example.com"
                                        v-model="user.email" />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="pass" placeholder="*******"
                                        v-model="user.pass" />
                                </div>
                                <div class="d-grid">
                                    <button class="btn btn-outline-dark" type="submit"
                                        style="width: 200px; margin-left: auto; margin-right: auto">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div>
                                <p class="mb-0 text-center">
                                    Don't have an account?
                                    <router-link to="/signin" class="text-primary fw-bold"> Sign Up </router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userService } from '@/services/user.service';
import { adminService } from '@/services/admin.service';

export default {
    name: 'LoginView',
    data() {
        return {
            user: {
                type: 'User',
                email: '',
                pass: '',
            },
            messageError: '',
        };
    },
    methods: {
        async loginUser() {
            if (this.user.email == '') this.messageError = 'Email cannot be empty';
            else {
                if (this.user.pass == '') this.messageError = 'Password cannot be empty';
                else {
                    if (
                        !this.user.email.match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        )
                    )
                        this.messageError = 'Email is invalid';
                    else {
                        if (this.user.type == 'Admin') {
                            try {
                                const data = await adminService.login(this.user);
                                if (data.message === 'Login success') {
                                    this.$store.dispatch('uid', data.id);
                                    this.$store.dispatch('utype', this.user.type);
                                    this.$store.dispatch('token', data.accessToken);
                                    this.$router.push({ name: 'OrdersView' });
                                } else this.messageError = data.message;
                            } catch (error) {
                                this.messageError = error;
                            }
                        } else {
                            try {
                                const data = await userService.login(this.user);
                                if (data.message === 'Login success') {
                                    this.$store.dispatch('uid', data.id);
                                    this.$store.dispatch('utype', this.user.type);
                                    this.$store.dispatch('uname', data.name);
                                    this.$store.dispatch('token', data.accessToken);
                                    this.$router.push({ name: 'products' });
                                } else this.messageError = data.message;
                            } catch (error) {
                                this.messageError = error;
                            }
                        }
                    }
                }
            }
        },
    },
};
</script>
