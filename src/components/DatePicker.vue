<template>
  <input
      v-model="internalDate"
      @change="changeDate()"
      type="date"
      :max="max"
      :min="min"
      class="box-content bg-gray-200 border-2 border-black rounded p-0.5 m-0.5 focus:border-blue-900 hover:border-blue-900 ease-in-out"
  >
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      initialDate: String,
      max: String,
      min: String
    },
    data: function () {
      return {
        internalDate: null
      }
    },
    created() {
      this.internalDate = this.initialDate;
    },
    methods: {
      changeDate() {
        this.$emit('changeDate', this.internalDate);
      }
    }
  }
</script>