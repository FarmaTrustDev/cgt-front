<template>
  <div class="clearfix">
    <a-range-picker class="float-right calendar-range-picker-field"
    :default-value="[moment(getCurrentDate(new Date()),dateFormat), moment(getPreviousDate(new Date()),dateFormat)]"
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
    return { 
      params: {},
      dateFormat: 'YYYY/MM/DD', 
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    moment,
    searchTreatment(e) {
      // console.log(e.target.value)
      const search = e.target.value
      this.params = {
        ...this.params,
        puid: search,
        treatmentTypeName: search,
      }
      console.log(this.params)
      this.emitParams(this.params)
    },
    async searchDataRange(dates, dateString) {
      if (!isEmpty(dates)) {
        const params = {
          ...this.params,
          start: getFormattedMoment(dates[0]),
          end: getFormattedMoment(dates[1]),
        }
        this.params = params
        await this.emitParams(this.params)
      }
    },
    emitParams(params) {
      this.$emit('getParams', params)
    },
    getCurrentDate(date)
    {
      const current = date;
      const futureDate = current.getFullYear()+'-'+(current.getMonth()+2)+'-'+current.getDate();
      return futureDate
    },
    getPreviousDate(date)
    {
      const current = date;
      const previousDate = current.getFullYear()+'-'+(current.getMonth()-1)+'-'+current.getDate();
      return previousDate
    }
  },
}
</script>
