<template>
  <div class="clearfix">
    <a-range-picker class="float-right calendar-range-picker-field"
     :default-value="[moment(getPreviousDate(new Date())), moment(getCurrentDate(new Date()))]"
     separator="-"
     :format="dateFormat" 
     @change="searchDataRange"
     />
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
import { getFormattedMoment, _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
import {STANDARD_UK_DATE_FORMAT} from '~//services/Constant/DateTime'
import { isEmpty } from '~/services/Utilities'
export default {
  props:{
    searchByType:{type : String , default: ''}
  },
  data() {
    return { 
      params: {},
      dateFormat: STANDARD_UK_DATE_FORMAT, 
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    searchByType(newValue, oldValue)
    {
      if(!isEmpty(newValue))
      {
        this.params={
          ...this.params,
          puid: newValue,
          treatmentTypeName: newValue,
          patientEnrollmentNumber: newValue,
          manufacturerPUID:newValue,
          hospitalPUID:newValue,
          logisticPUID:newValue,
        }
        this.emitParams(this.params)
      }
    }
  },
  mounted(){
    if(!isEmpty(this.searchByType))
    {
      this.params={
        ...this.params,
        puid: this.searchByType,
        treatmentTypeName: this.searchByType,
        patientEnrollmentNumber: this.searchByType,
        manufacturerPUID:this.searchByType,
        hospitalPUID:this.searchByType,
        logisticPUID:this.searchByType,
      }
      this.emitParams(this.params)
      // this.searchTreatment(this.searchByType)
    }
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
        patientEnrollmentNumber: search,
        manufacturerPUID:search,
        hospitalPUID:search,
        logisticPUID:search
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
      const futureDate = _getFutureMomentStandardFormatted(2, 'month');
      return futureDate
    },
    getPreviousDate(date)
    {
      const current = date;
      const previousDate = current.getFullYear()+'-'+(current.getMonth())+'-'+current.getDate();
      return previousDate
    }
  },
}
</script>
