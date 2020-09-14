<template>
  <div class="">
    <div class="flex items-center justify-between mx-64  py-3">
      <div class="div">
        <h2 class="text-3xl font-semibold text-gray-900 leading-tight">{{pageTitle}}</h2>
      </div>
      <button class="mx-1 font-bold py-2 px-4 rounded inline-flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800" @click="$router.push({ name: 'Employee'})">Back</button>
    </div>
    <div class="items-center bg-white p-10 rounded mx-64  py-3">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
            Name
          </label>
          <input id="name" v-model="$v.employee.name.$model" :class="{'border-red-500': $v.employee.name.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Full name">
          <p v-if="!$v.employee.name.required" class="text-red-500 text-xs italic">Name is required</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
            Email
          </label>
          <input id="email" v-model="$v.employee.email.$model" :class="{'border-red-500': $v.employee.email.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Email">
          <p v-if="!$v.employee.email.required" class="text-red-500 text-xs italic">Email is required</p>
          <p v-if="!$v.employee.email.email" class="text-red-500 text-xs italic">Please enter a valid email</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="company">
            Company
          </label>
          <div class="relative">
            <select id="company" v-model="$v.employee.company_id.$model" :class="{'border-red-500': $v.employee.company_id.$error}" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="">Select Company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">{{company.name}}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <p v-if="!$v.employee.company_id.required" class="text-red-500 text-xs italic">Select company</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="birthday">
            birthday
          </label>
          <input id="birthday" v-model="$v.employee.birthday.$model" :class="{'border-red-500': $v.employee.birthday.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" dataformatas="Y-m-d" placeholder="birthday">
          <p v-if="!$v.employee.birthday.required" class="text-red-500 text-xs italic">Birthday is required</p>
        </div>
      </div>
      <div class="flex justify-end py-2">
        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded" type="button" @click="handleSave">
          Save
        </button>
        <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-2 px-4 rounded" type="button" @click="$router.back()">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Employee from '../../services/api/Employee'
import Company from '../../services/api/Company'
export default {
  name: 'EmployeeCreateUpdate',
  data() {
    return {
      employee: {
        name: '',
        email: '',
        birthday: '',
        company_id: ''
      },
      companies: []
    }
  },
  validations: {
    employee: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      company_id: {
        required
      },
      birthday: {
        required
      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.name === 'EmployeeCreate' ? 'New Employee' : 'Update Employee'
    }
  },
  mounted() {
    this.getCompanies()
    if (this.$route.params && this.$route.params.id) {
      this.Show(this.$route.params.id)
    }
  },
  methods: {
    getCompanies() {
      Company.index().then(r => {
        this.companies = r.data.companies
      })
    },
    handleSave() {
      this.$v.$touch()
      if (this.$v.employee.$invalid) {
        return alert('Validation Error')
      } else {
        return this.$route.name === 'EmployeeCreate' ? this.Store() : this.Update()
      }
    },
    Show(id) {
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Employee.show(id).then(r => {
        if (r.code === 200) {
          this.employee = r.data.employee
        }
        loader.hide()
      }).catch(() => {
        loader.hide()
      })
    },
    Store() {
      Employee.store(this.employee).then(r => {
        this.$router.push({ name: 'Employee' })
      })
    },
    Update() {
      Employee.update(this.employee).then(r => {
        this.$router.push({ name: 'Employee' })
      })
    }
  }
}
</script>
