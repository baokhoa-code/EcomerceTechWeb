import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/ProductsView.vue'),
    },
    {
        path: '/products/:id',
        name: 'details',
        component: () => import('../views/ProductDetail.vue'),
        props: (route) => {
            console.log(route);
            // ({ id: parseInt(route.params.id) })
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('../views/SignUpView.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/HomeView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart.vue'),
    },
    {
        path: '/orders',
        name: 'OrdersView',
        component: () => import('../views/Orders.vue'),
    },
    {
        path: '/userorders',
        name: 'UserOrdersView',
        component: () => import('../views/UserOrders.vue'),
    },
    {
        path: '/myproducts',
        name: 'myproducts',
        component: () => import('../views/MyProductsView.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
