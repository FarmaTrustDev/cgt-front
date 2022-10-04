<template>
  <div style="margin-top: 1.5em">
    <div class="page-header clearfix mt-15">
      <!-- <h3 class="page-title pl-5 float-left">{{ translation.patient_list }}</h3> -->
      <div class="page-title float-left" style="width: 50%">
        {{translation.PatieList_2_627}} 
      </div>
      <div style="width: 25%; display: inline">
        <a-button
          type="primary"
          class="mrm-5 float-right"
          @click="goto('patients/create')"
          >{{ translation['AddNew_3_631'] }}</a-button
        >
      </div>
      <a-input
        ref="userNameInput"
        :placeholder="translation.searc_1_488"
        class="float-right page-search-input"
        style="width: 25%"
        @change="searchPatent"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </div>
    <div class="patient-page">
      <standardTable
        :columns="column"
        :pagination="showPagination"
        :api-service="PatientServices"
        :action-link="ActionLink"
        :rounded="true"
        :patient="true"
        :params="{ active: true }"
        @getFetch="getFetch"
        @fetchParent="fetch"
      />
    </div>
  </div>
</template>
<script>
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
import routeHelpers from '~/mixins/route-helpers'
import translationHelpers from '~/mixins/translation-helpers'

const ActionLink = '/hospital/patients'
export default {
  components: { standardTable },
  mixins: [routeHelpers, translationHelpers],
  middleware: 'auth',
  data() {
    return {
      column: [
        {
          title: `PUID`,
          dataIndex: 'hospitalPUID',
          key: 'PUID',
          width: 100,
          scopedSlots:{customRender: 'pUIDRender'}
        },
        {
          title:`${this.$store.getters.getTranslation.PatieName_2_93}`,
          dataIndex: 'name',
          key: 'name',
          width: 150,
        },
        {
          title: `${this.$store.getters.getTranslation._1_442}`,
          dataIndex: 'treatmentTypeId',
          key: 'treatmentTypeId',
          width: 75,
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          dataIndex: 'treatment_status',
          key: 'treatment_status',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'treatment_status' },
          class: 'treatment-status-col',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'action',
          width: 100,
          scopedSlots: { customRender: 'patientAction' },
        },
      ],
      loading: false,
      PatientServices,
      ActionLink,
      borderCard: false,
      fetchPatientService: {},
      showPagination: true,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[1].title=newValues.PatieName_2_93
        this.column[2].title=newValues._1_442
        this.column[4].title=newValues.Actio_1_220
      }
    }
  },
  methods: {
    getFetch(fetch) {
      this.fetchPatientService = fetch
    },
    fetch(params) {
      this.fetchPatientService()
    },
    fetchSearch(params) {
      this.fetchPatientService(params)
    },
    searchPatent(e) {
      const search = e.target.value
      this.fetchSearch({
        puid: search,
        name: search,
        TreatmentTypeName: search,
        PUID: search,
        PatientEnrollmentNumber: search
      })
    },
  },
}
</script>
