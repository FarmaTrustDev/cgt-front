<template>
  <div>
    <div v-for="(data, index) in rejectedData" :key="index" class="mb-5">
      <a-alert
        :message="
          'The treatment was rejected by ' +
          data.organization +
          ' Re-schedule the treatment from available slots below.'
            "
          :description="getRejectionDetail(data.rejectionReason)"
        type="success"
      />
    </div>
    <div v-if="!isEmpty(pickupShipment)">
      <a-skeleton :loading="isEmpty(schedule)">
        <a-row>
          <h4 class="heading pl-0">{{translation.OutboShipp_4_378}}</h4>
          <a-col :span="12">
            <pickup-detail :scheduling="schedule" :shipment="pickupShipment"
          /></a-col>
          <a-col :span="1"></a-col>
          <a-col :span="12">
            <delivery-detail
              :scheduling="schedule"
              :shipment="deliveryShipment"
          /></a-col>
        </a-row>
      </a-skeleton>
    </div>
    <div v-else>
      <a-alert
        v-if="showData"
        class="mb-15"
        :message="
          'Request sent to ' +
          logisticName +
          ', you can ship the sample once logistic provider approved the request'
        "
        type="info"
      />
      <a-form
        v-if="treatment.phaseId >= TREATMENT_PHASES.OUTBOUND_SCHEDULING.id"
        :form="form"
        :layout="formLayout"
        @submit="onSubmit"
      >
        <LogisticLookup :logisticId="logisticId" :params="{ Id: logisticId }" />
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item :label="translation.SamplColle_3_518" class="pb-0">
              <a-input
                v-decorator="[
                  `treatmentId`,
                  {
                    initialValue: treatment.id,
                  },
                ]"
                type="hidden"
              />

            <a-input
              v-decorator="[
                `hospitalId`,
                {
                  initialValue: treatment.hospitalId,
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                `patientId`,
                {
                  initialValue: treatment.patientId,
                },
              ]"
              type="hidden"
            />
            <a-date-picker
              v-decorator="[
                'collectionDate',
                {
                  initialValue:collectionDate,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Delivery Arrival Date!',
                    },
                  ],
                },
              ]"
              :format="dateFormat"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              @change="collectionDateChange"
            >
            </a-date-picker> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="Expected Delivery Date" class="pb-0">
            <a-date-picker
              v-decorator="[
                'deliveryDate',
                {
                  initialValue:deliveryDate,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your expected delivery Date!',
                    },
                  ],
                },
              ]"
              :disabled-date="disabledDate"
              :format="dateFormat"
              style="width: 100%"
              size="large"
              disabled 
            >
            </a-date-picker> </a-form-item
        ></a-col>
      </a-row>
      <a-form-item>
        <FormActionButton v-if="!showData" :loading="loading" :custom-text="translation['Submi_1_248']" />
      </a-form-item>
    </a-form>
    <alert v-else :message="translation.Collenot_3_573" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import withFetch from '~/mixins/with-fetch'
import shipmentHelpers from '~/mixins/shipment-helpers'
import pickupDetail from '~/components/treatment/treatment/pickup/Detail'
import deliveryDetail from '~/components/treatment/treatment/delivery/Detail'
import { TREATMENT_PHASES } from '~/services/Constant/Phases.js'
import LogisticLookup from '~/components/lookups/LogisticLookup'
import SchedulingServices from '~/services/API/SchedulingServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import { isEmpty } from '~/services/Utilities'
import {
  // getMomentByStandardFormat,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import alert from '~/components/alert'
export default {
  components: { LogisticLookup, alert, pickupDetail, deliveryDetail },
  mixins: [withFetch, notifications, routeHelpers, shipmentHelpers],
  props: {
    treatment: { type: Object, required: true },
  },
  data() {
    return {
      loading: false,
      visible: false,
      schedule: null,
      moment,
      pickupShipment: {},
      deliveryShipment: {},
      rejectedData: [],
      logisticId: null,
      logisticName: '',
      collectionDate: null,
      deliveryDate: null,
      showData: false,
      outStatus: null,
      formLayout: 'vertical',
      treatmentId: this.$route.params.id,
      form: this.$form.createForm(this, {
        name: 'scheduling',
      }),
      dateFormat: STANDARD_UK_DATE_FORMAT,
      TREATMENT_PHASES,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.GetRejectionDetail(this.treatmentId)
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    collectionDateChange(value, date) {
      const futureDate = moment(date, 'DD/MM/YYYY')
      this.form.setFieldsValue({
        deliveryDate: futureDate.add(2, 'day'),
      })
    },
    // (getMomentByStandardFormat(date).add(2, 'day'))
    GetRejectionDetail(treatmentId) {
      TreatmentServices.schedule(treatmentId, 2).then((response) => {
        this.rejectedData = response.data
        // eslint-disable-next-line eqeqeq
        if (this.rejectedData.length != 0) {
          this.visible = true
        }
      })
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          SchedulingServices.createForManufacturer(values)
            .then((response) => {
              this.success(response.message)
              this.goto('/manufacturer/treatments')
            })
            .catch(this.error)
        }
      })
    },
    getRejectionDetail(data){
      if(!isEmpty(data))
      {
        return "Reason: " + 'data'
      }
      else{
        return "Reason: " + 'N/A'
      }
    },
    fetch(id) {
      SchedulingServices.getDetailByTreatmentOut(this.treatment.id)
        .then((response) => {
          this.schedule = response.data
          console.log(this.schedule.logisticId)
          if (this.schedule.logisticName != null) {
            this.showData = true
            this.logisticId = this.schedule.logisticId
            this.collectionDate = this.schedule.collectionDate
            this.deliveryDate = this.schedule.deliveryDate
            this.logisticName = this.schedule.logisticName
          }
        })
        .then(() => {
          if (this.showData) {
            this.markShipmentFlags()
          }
        })
        .finally(() => {
          this.loading = false
          // this.showData=false
        })
    },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
