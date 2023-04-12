import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
let cart = localStorage.getItem('cart');
let count = localStorage.getItem('count');
export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state() {
    return {
      uid: null,
      utype: '',
      uname: '',
      token: '',
      count: count ? parseInt(count) : 0,
      cart: cart ? JSON.parse(cart) : [],
    }
  },
  getters: {
    uid: (state) => {
      return state.uid;
    },
    utype: (state) => {
      return state.utype;
    },
    uname: (state) => {
      return state.uname;
    },
    token: (state) => {
      return state.token;
    },
  },
  mutations: {
    uid(state, uid) {
      state.uid = uid;
    },
    utype(state, utype) {
      state.utype = utype;
    },
    uname(state, uname) {
      state.uname = uname;
    },
    token(state, token) {
      state.token = token;
    },
    addToCart(state, item) {
      let found = state.cart.find(product => product.id == item.id);

      if (found) {
        found.quantity++;
        found.totalPrice = found.quantity * found.price;
      } else {

        state.cart.push(item);

        state.count++;


      }
      this.commit('saveCart');
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {

        state.count--;

        state.cart.splice(index, 1);
        state.cart.splice()
      }
      this.commit('saveCart');
    },
    decrementQuentity(state, item) {

      let found = state.cart.find(product => product.id == item.id);

      if (found && found.quantity > 1) {
        found.quantity--;
        found.totalPrice = found.quantity * found.price;
      }
      this.commit('saveCart');
    },
    saveCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('count', state.count);
    },
    resetCart(state) {
      state.cart = [],
        state.count = 0,
        localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('count', state.count);
    }
  }
  ,
  actions: {
    uid(context, uid) {
      context.commit('uid', uid);
    },
    utype(context, utype) {
      context.commit('utype', utype);
    },
    uname(context, uname) {
      context.commit('uname', uname);
    },
    token(context, token) {
      context.commit('token', token);
    },
  },
  modules: {
  }

})
