<template>
  <div class="mt-3 manf-treatment container" style="margin-top: 20px">
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">
        {{ translation['TreatList_2_258'] }}
      </h3>
      <a-select
        class="
          float-right
          page-search-input
          mr-5
          ant-selection-placeholder
          selection-tab
        "
        :placeholder="translation.TreatType_2_67"
        @change="onChange"
      >
        <a-select-option
          v-for="treatmentType in treatmentTypes"
          :key="treatmentType.id" :value="treatmentType.name"
          >{{ treatmentType.name }}</a-select-option
        >
      </a-select>
    </div>
    <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1"  :tab="translation.NewTreat_2_260">
          <new-request :search-by-type="searchByType" />
        </a-tab-pane>
        <a-tab-pane key="2"  :tab="translation.PendiTreat_2_300">
          <in-progress :search-by-type="searchByType" />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="translation['Compltreat_2_394']"
          ><completed :search-by-type="searchByType"
        /></a-tab-pane>
        <a-tab-pane key="4" :tab="translation['AllTreat_2_826']">
          <all :search-by-type="searchByType"
        /></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import newRequests from '~/components/root/manufacturer/treatments/listing/NewRequest'
import All from '~/components/root/manufacturer/treatments/listing/All'
import Completed from '~/components/root/manufacturer/treatments/listing/Completed'
import inProgress from '~/components/root/manufacturer/treatments/listing/InProgress'
import TreatmentService from '~/services/API/TreatmentTypeServices'
// @todo for Naveed here optimize in 1 table single component can handle the calls
export default {
  components: {
    'new-request': newRequests,
    'in-progress': inProgress,
    all: All,
    completed: Completed,
  },
  data() {
    return {
      loading: false,
      treatmentTypes: [],
      typeLoading: false,
      searchByType: ''
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    searchByType(newValue, oldValue)
    {
      if(newValue !== oldValue)
      {
        this.searchByType = newValue
      }
    },
  },
  mounted() {
    this.fetchTreatmentTypes()
  },
  methods: {
    searchTreatment() {},
    fetchTreatmentTypes() {
      this.typeLoading = true
      TreatmentService.getActive()
        .then((response) => {
          this.treatmentTypes = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    onChange(e)
    {
      this.searchByType = e
    }
  },
}
</script>
