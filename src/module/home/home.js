import Vue from 'vue'
import home from './home.vue'
import 'utils/initial.js'

new Vue({
  el: '#home',
  render: h => h(home)
});