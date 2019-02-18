<template>
  <div class="search-component filter-item">
    <el-input
      v-model="searchVal"
      :placeholder="placeholder"
      class="input-with-select"
      @keyup.enter.native="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
  </div>
</template>

<script>
export default {
  // name: 'SearchForm',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      searchVal: null
    }
  },
  methods: {
    search() {
      this.$emit('handleSearch', this.searchVal)
      // if (this.searchVal !== '' && this.searchVal !== null && this.searchVal !== undefined) {
      //   this.$emit('handleSearch', this.searchVal)
      // }
    }
  }
}
</script>
