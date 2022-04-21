<template>
  <div class="clearfix">
    <a-range-picker @change="searchDataRange" class="float-right" />
    <a-input
      ref="userNameInput"
      placeholder="Search"
      class="float-right page-search-input"
      @change="searchTreatment"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Utilities'
export default {
  data() {
    return { params: {} }
  },
  methods: {
    searchTreatment(e) {
      const search = e.target.value
      this.params = {
        puid: search,
        treatmentTypeName: search,
        ...this.params,
      }
      this.emitParams()
    },
    searchDataRange(dates, a) {
      if (!isEmpty(dates)) {
        this.params = {
          start: dates[0],
          end: dates[1],
          ...this.params,
        }
      }
      this.emitParams()
    },
    emitParams() {
      this.$emit('getParams', this.params)
    },
  },
}
</script>
