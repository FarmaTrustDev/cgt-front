<template>
  <div class="clearfix">
    <a-range-picker class="float-right" @change="searchDataRange" />
    <a-input
      ref="userNameInput"
      :placeholder="translation.searc_1_488"
      class="float-right page-search-input"
      @change="searchTreatment"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>
  </div>
</template>
<script>
import { getFormattedMoment } from '~/services/Helpers/MomentHelpers'
import { isEmpty } from '~/services/Utilities'
export default {
  data() {
    return { params: {} }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
    async searchDataRange(dates, dateString) {
      if (!isEmpty(dates)) {
        const params = {
          ...this.params,
          start: getFormattedMoment(dates[0]),
          end: getFormattedMoment(dates[1]),
        }
        this.params = params
        await this.emitParams()
      }
    },
    emitParams() {
      this.$emit('getParams', this.params)
    },
  },
}
</script>
