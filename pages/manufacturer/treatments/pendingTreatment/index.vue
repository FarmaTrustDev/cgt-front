<template>
  <div class="mt-3">
    <div class="page-header clearfix mb-15">
      <h3 class="page-title pl-5 float-left">Ongoing {{translation['TreatList_2_258']}}</h3>
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
    <inProgress />
  </div>
</template>
<script>
import inProgress from '~/components/root/manufacturer/treatments/listing/InProgress'
import TreatmentService from '~/services/API/TreatmentTypeServices'
// @todo for Naveed here optimize in 1 table single component can handle the calls
export default {
  components: {
    inProgress,
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
