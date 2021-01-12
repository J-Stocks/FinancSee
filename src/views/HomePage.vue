<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}" class="w-full text-center">FinancSee</router-link>
    </template>
    <template v-slot:main>
      <div class="flex justify-center">
        <div class="flex flex-col space-y-2">
          <router-link
              :to="{name: 'CompanyIndex'}"
              class="border border-gray-800 rounded hover:bg-gray-300 text-center p-1">
            Companies
          </router-link>
          <router-link
              :to="{name: 'Currency'}"
              class="border border-gray-800 rounded hover:bg-gray-300 text-center p-1">
            Currencies
          </router-link>
        </div>
      </div>
    </template>
  </default-layout>
</template>

<script>
  import DefaultLayout from "@/layouts/DefaultLayout";

  export default {
    name: 'HomePage',
    components: {
      DefaultLayout
    }
  }
</script>
