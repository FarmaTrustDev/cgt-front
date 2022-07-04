<template>
  <div class="clearfix">
    <a-range-picker class="float-right calendar-range-picker-field"
    :default-value="[moment('2015-06-06',dateFormat), moment('2015-06-06',dateFormat)]"
     @change="searchDataRange"
     :format="dateFormat" />
    <a-input
      ref="userNameInput"
      :placeholder="translation.searc_1_488"
      class="float-right page-search-input pb-10"
      @change="searchTreatment"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>
  </div>
</template>
<script>
import moment from 'moment';
import { getFormattedMoment } from '~/services/Helpers/MomentHelpers'
import { isEmpty } from '~/services/Utilities'
export default {
  data() {
    return { params: {},
    dateFormat: 'YYYY/MM/DD', }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    moment,
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
