import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Employee',
    component: () => import('../views/employee')
  },
  {
    path: '/employee/create',
    component: () => import('../views/employee/createUpdate'),
    name: 'EmployeeCreate'
  },
  {
    path: '/employee/update/:id',
    component: () => import('../views/employee/createUpdate'),
    name: 'EmployeeUpdate'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
