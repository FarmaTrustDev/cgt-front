<template>
  <div>
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">{{ translation.patient_list }}</h3>

      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('patients/create')"
        >{{ translation['AddNew_3_631'] }}</a-button
      >
      <a-input
        ref="userNameInput"
        :placeholder="translation.searc_1_488"
        class="float-right page-search-input"
        @change="searchPatent"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </div>
    <div class="patient-page">
      <standardTable
        :columns="column"
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
          dataIndex: 'enrollmentNumber',
          key: 'PUID',
          width: '10%',
        },
        {
          title: `${this.$store.getters.getTranslation.PatieName_2_93}`,
          dataIndex: 'name',
          key: 'name',
          width: '10%',
        },
        {
          title: `${this.$store.getters.getTranslation._1_442}`,
          dataIndex: 'treatmentTypeId',
          key: 'treatmentTypeId',
          width: '5%',
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          // title: 'Treatment Status',
          dataIndex: 'treatment_status',
          key: 'treatment_status',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'treatment_status' },
          width: '63%',
          class: 'treatment-status-col',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'action',
          width: '12%',
          scopedSlots: { customRender: 'patientAction' },
        },
      ],
      loading: false,
      PatientServices,
      ActionLink,
      borderCard: false,
      fetchPatientService: {},
    }
  },
  /* computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }, */
  methods: {
    getFetch(fetch) {
      this.fetchPatientService = fetch
    },
    fetch(params) {
      this.fetchPatientService(params)
    },
    searchPatent(e) {
      const search = e.target.value
      this.fetch({ puid: search, name: search, TreatmentTypeName: search })
    },
  },
}
</script>
