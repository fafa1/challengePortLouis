import Vue from 'vue'
import Router from 'vue-router'
import DataTable from '@/components/dataTable'
import RegisterForm from '@/components/registerForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DataTable',
      component: DataTable
    }
  ]
})
