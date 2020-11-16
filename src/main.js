import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import wb from "./registerServiceWorker";


Vue.use(VueRouter);
Vue.prototype.$workbox = wb;

const routes = [
  // {
  //   path: '/', name:'Welcome',
  //   component: () => import('./components/WelcomePage.vue')
  // },
  {
    path: '/', name:'Songs',
    component: () => import('./components/Songs.vue')
  },
  {
    path: '/playlists', name:'Playlist',
    component: () => import('./components/Playlist.vue')
  },
  {
    path: '/playerSong', name:'PlayerSong',
    component: () => import('./components/PlayerSong.vue')
  },
  
];
const router = new VueRouter({
  routes
})



Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')
