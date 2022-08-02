<template>
  <div class="mt-3">
    <div class="page-header clearfix ">
      <h3 class="page-title pl-5 float-left">{{translation['TreatList_2_258']}}</h3>
      <a-select
        class="float-right page-search-input mr-6 ant-selection-placeholder selection-tab pr-5"
        :placeholder="translation.TreatType_2_67"
      >
        <a-select-option
          v-for="treatmentType in treatmentTypes"
          :key="treatmentType.id"
          >{{ treatmentType.name }}</a-select-option
        >
      </a-select>
    </div>
    <div class="h-tabs large-tabs rounded-table manf-treatment-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1" :tab="translation.NewTreat_2_260">
          <new-request />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="translation.PendiTreat_2_300">
          <in-progress />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Treatment"><completed /></a-tab-pane>
        <a-tab-pane key="4" tab="All Treatments"> <all /></a-tab-pane>
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
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
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
  },
}
</script>
