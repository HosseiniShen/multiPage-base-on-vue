import Vue from 'vue'
import sub from './index.vue'
import 'utils/initial.js'

new Vue({
  el: '#sub',
  render: h => h(sub)
});