<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="data"
      class="rounded-table"
      :loading="loading"
    >
      <template slot="name" slot-scope="name">
        <strong>{{ name }}</strong>
      </template>
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
          <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
            <span class="treatmentName">{{ name }}</span>
          </a-tooltip>
      </template>
      <template slot="print" slot-scope="text, schedule">
        <a-button
          v-for="bag in schedule.treatment.bags"
          :key="bag.message"
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(schedule.id)"
          >{{ bag.puid }}</a-button
        >
      </template>
    </a-table>
    <!-- View the Modal -->
    <ViewLabelModal v-if="showViewModal" :key="schedulingId" />
  </div>
</template>

<script>
import ViewLabelModal from '~/components/labeling/ViewLabelModal'
// import LabelServices from '~/services/API/LabelServices';
export default {
  components: { ViewLabelModal },
  props: {
    data: { type: Array, required: true },
  },
  data() {
    return {
      showViewModal: false,
      schedulingId: null,
      loading: true,
      columns: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation['Colle-_4_268']}`,
          dataIndex: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          title: `${this.$store.getters.getTranslation.Print_1_111}`,
          dataIndex: 'print',
          scopedSlots: { customRender: 'print' },
        },
      ],
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
        this.columns[0].title=newValues.PatieID_2_264
        this.columns[1].title=newValues['Colle-_4_268']
        this.columns[2].title=newValues.TreatType_2_67
        this.columns[3].title=newValues.Print_1_111
      }
    }
  },  
  mounted(){
    setInterval(() => {
      this.revertLoading()
    }, 300);
  },
  methods: {
  revertLoading()
    {
      this.loading = false
    },
    openViewModal(id) {
      this.showViewModal = true
      this.schedulingId = id
      // LabelServices.scheduling(id);
    },
  },
}
</script>
