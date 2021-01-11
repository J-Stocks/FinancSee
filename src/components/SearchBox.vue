<template>
  <input
      v-model="searchString"
      type="text"
      placeholder="Search"
      autofocus
      maxlength="300"
      size="10"
      spellcheck="false"
      class="text-xl bg-gray-200 placeholder-gray-500 border-2 border-black rounded px-1 focus:border-blue-900 hover:border-blue-900 ease-in-out"
  />
</template>

<script>
  export default {
    name: "SearchBox",
    data: function () {
      return {
        searchString: '',
      }
    },
    computed: {
      searchPattern() {
        let outputPattern = '';
        if (this.searchString.trim()) {
          let searchTerms = this.searchString
              .trim()
              .split(/\s/)
              .map(term => term.replace(/[^\w\d]/g, ''))
              .filter(term => term !== '')
          ;
          if (searchTerms) {
            outputPattern = searchTerms.join('|');
          }
        }
        return outputPattern
      }
    },
    watch: {
      searchString() {
        this.emitSearch();
      }
    },
    methods: {
      emitSearch() {
        this.$emit('changeSearch', this.searchPattern);
      }
    }
  }
</script>