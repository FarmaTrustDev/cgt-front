<template>
  <div>
    <a-descriptions :title="translation.ColleDetai_2_816">
      <a-descriptions-item :label="translation.SamplColle_3_518">
        {{ getDateFormat(entity.collectionDate) }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.DelivDispa_3_728">
        {{ getDateFormat(entity.pickupDateTime) }}
      </a-descriptions-item>
      <br />
      <a-descriptions-item :label="translation.SamplDeliv_3_730">
        {{ getDateFormat(entity.deliveryDate) + getTime(entity.time)  }}
      </a-descriptions-item>

    </a-descriptions>
    <hr class="line" />
    <a-descriptions
      :title="translation.ExterEntit_2_760"
      class="external-entity"
    >
      <a-descriptions-item :label="translation.Manuf_1_89">
        {{ entity.manufacturerName }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.LogisProvi_2_380">
        {{ entity.logisticName }}
      </a-descriptions-item>
    </a-descriptions>
    <hr class="line" />

    <a-descriptions :title="translation.TreatSched_3_764">
      <a-descriptions-item :label="translation.TreatStart_3_732">
        {{ getDateFormat(entity.manufacturerTreatmentStartDate) }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.ComplDate_3_734">
        {{ getDateFormat(entity.completionDate) }}
      </a-descriptions-item>
      <br />
      <a-descriptions-item :label="translation.Durat_1_71">
        {{ entity.duration }} Days
      </a-descriptions-item>
      <a-descriptions-item :label="translation.DelivArriv_4_736">
        {{ getDateFormat(entity.deliveryArrivalDate) }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions :title="translation.Notes_1_350">
      <a-descriptions-item>
        {{ entity.notes }}
      </a-descriptions-item>
    </a-descriptions>
        <a-col :offset="18" v-if="isPharma()">
          
          <a-button
            type="primary"
            :loading="loading"
            dashed
            @click="showConfirm(treatment,true)"
          >
            Accept
          </a-button>
          <a-button
            class="new-treatment-btn"
            :loading="loading"
            dashed
            @click="showConfirm(treatment, false)"
          >
            Reject
          </a-button>
        </a-col>
        <a-modal 
              :visible="visibleSignature"
              :footer="null"
              @cancel="handleOk()"
              @ok="handleOk()"
            >
            <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
        </a-modal>
        <a-modal
      :title="
        isAccepted ? 'Accept Scheduling Request' : 'Reject Scheduling Request'
      "
      :visible="showResponseModal"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :width="700"
      @ok="submitTreatmentResult"
      @cancel="handleModal(false)"
    >
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <Form :is-accepted="isAccepted" :data="selectedRow" />

        <FormActionButton
          :text="getButtonText()"
          :btn-type="getButtonType()"
          :is-created="false"
          :loading="loading"
          :disabled="clicked"
          ><span slot="extra" class="mr-5">
            <a-button @click="handleModal(false)" Reject Scheduling Request>{{
              translation.cance_1_296
            }}</a-button>
          </span></FormActionButton
        >
      </a-form>
    </a-modal>
  </div>
  
</template>

<script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import Form from '~/components/root/manufacturer/treatments/request/Form'
import { isEmpty } from '~/services/Helpers'
import userDetail from '~/mixins/user-detail'
import Signature from '~/components/signature'
import notifications from '~/mixins/notifications'
import SchedulingServices from '~/services/API/SchedulingServices'
export default {
  components: { Form,Signature },
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [userDetail,notifications,routeHelpers],
  data() {
    return {
      moment,
      showResponseModal: false,
      isAccepted: false,
      selectedRow: {},
      data:{},
      clicked:false,
      visibleSignature:false,
      confirmLoading: false,
      loading: false,
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
    }
  },

  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    
    if(this.user.roleName === 'PHARMA'){
      this.data = JSON.parse(this.$route.query.dta)
    }
  },
  methods: {
    getDateFormat(date) {
      return moment(String(date)).format(' DD/MM/YYYY')
    },
    getTime(time) {
      if(!isEmpty(time)){
        return " at " + time
      }
      else { return ""}
    },
    submitTreatmentResult() {
      alert("as")
    },
    onSubmit(e) {
      
      this.loading = true
      this.clicked = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitData = values
          this.visibleSignature = true
        }
      })
      this.loading = false
      this.clicked = false
    },
    upsert(values)
    {
      const data = this.selectedRow
          const performedAction = values.accepted === true ? 'accepted' : 'rejected'
          SchedulingServices.markScheduleRequest(data.id, values).then(
            (response) => {
              this.visibleSignature = false
              this.success('Request ' + performedAction)
              this.handleModal(false)
              this.goto('/manufacturer/treatments')
            }
          )
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.submitData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleModal(show) {
      if (!show) {
        this.isAccepted = false
      }
      this.showResponseModal = show
    },
    showConfirm(record, isAccepted) {
      this.isAccepted = isAccepted
      this.selectedRow = this.data
      this.handleModal(true)
    },
    getButtonText() {
      return this.isAccepted
        ? this.$store.getters.getTranslation.Accep_1_278
        : this.$store.getters.getTranslation.Rejec_1_280
    },
    getButtonType() {
      return this.isAccepted ? 'primary' : 'danger'
    },
  },
}
</script>
