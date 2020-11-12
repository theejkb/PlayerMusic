import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/', name:'Welcome',
  //   component: () => import('./components/WelcomePage.vue')
  // },
  {
    path: '/songs', name:'Songs',
    component: () => import('./components/Songs.vue')
  },
  {
    path: '/playlists', name:'Playlist',
    component: () => import('./components/Playlist.vue')
  },
  {
    path: '/player', name:'Player',
    component: () => import('./components/Player.vue')
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
