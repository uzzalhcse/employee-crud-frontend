<template>
  <div class="home">
    <div class="flex items-center justify-between mx-64 py-3">
      <div class="div">
        <h2 class="text-3xl font-semibold text-gray-900 leading-tight">Employee List</h2>
      </div>
      <button class="mx-1 font-bold py-2 px-4 rounded inline-flex items-center bg-green-300 hover:bg-green-400 text-green-800" @click="$router.push({ name: 'EmployeeCreate'})">New Employee</button>
    </div>
    <div class="mx-64 py-3">
      <section class="bg-white rounded-lg">
        <div ref="loadingContainer" class="align-middle inline-block min-w-full overflow-hidden rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 stripe">
            <thead class="bg-gray-600 text-white">
              <tr>
                <th class="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Id
                </th>
                <th class="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-right text-xs leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in employee.data" :key="item.id">
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{ item.id }}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{ item.name }}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{ item.email }}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button class="mx-1 font-bold h-8 w-8 justify-center rounded-full inline-flex items-center bg-green-300 hover:bg-green-400 text-green-800" @click="$router.push({name: 'EmployeeUpdate', params: { id: item.id }})">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="handleDelete(item.id)" class="mx-1 font-bold h-8 w-8 justify-center rounded-full inline-flex items-center bg-orange-300 hover:bg-orange-400 text-orange-800">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>

            <!-- More rows... -->
            </tbody>
          </table>
        </div>
      </section>
      <paginate
        :page-count="employee.last_page"
        :page-range="5"
        :margin-pages="1"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        active-class="bg-teal-300"
        prev-link-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full outline-none"
        next-link-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full outline-none"
        container-class="inline-flex items-center float-right mt-5"
        page-link-class="px-2 focus:outline-none"
        page-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-1 rounded-full focus:outline-none"
      />
    </div>
  </div>
</template>

<script>

import Employee from '../../services/api/Employee'

export default {
  name: 'Home',
  data() {
    return {
      employee: {
        last_page: 10,
        data: []
      },
      currentPage: 1
    }
  },
  created() {
    this.index()
  },
  methods: {
    index(page = 1) {
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Employee.index(page).then(r => {
        if (r.code === 200) {
          this.employee = r.data.employee
        }
        loader.hide()
      }).catch(e => {
        loader.hide()
      })
    },
    handleDelete(id) {
      var r = confirm('Do you want to delete employee ?')
      if (r === true) {
        Employee.delete(id).then(() => {
          this.index(this.currentPage)
        })
      }
    },
    clickCallback(pageNum) {
      this.currentPage = pageNum
      this.index(pageNum)
    }
  }
}
</script>
