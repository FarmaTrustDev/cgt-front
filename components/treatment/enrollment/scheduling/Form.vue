<template>
  <div>
    <div v-for="(data, index) in rejection" :key="index">
      <a-alert :message="'The treatment was rejected by ' + data.organization +  '. Re-schedule the treatment from available slots below.'" type="success" />
      </div>
    <h3 class="page-title">{{ translation.Availslots_2_724 }}</h3>
    <div class="grey-card">
      <calendar
        :handle-date-click="fetchEvents"
        :disabled-date="disabledDate"
        @getEventClick="getEventClick"
      ></calendar>
    </div>
    <FormFields :treatment="treatment" :entity="entity"></FormFields>
    <FormActionButton :is-created="isCreated" />
    <a-modal
      :visible="visibleModal"
      ok-text="Ok"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
      <center>
        <p>
          <img
            :src="getImageUrl('Icons/cross-letter.jpg')"
            width="50%"
            height="50%"
          />
        </p>
        <h3><p>Please Select Today/Future Date</p></h3>
        <footer>
          <a-button class="ant-btn ant-btn-primary" @click="handleOk()"
            >Ok</a-button
          >
        </footer>
      </center>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import FormFields from '~/components/treatment/enrollment/scheduling/FormFields'
import calendar from '~/components/calendars/index'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
import SchedulingServices from '~/services/API/SchedulingServices'
import imagesHelper from '~/mixins/images-helper'
import {
  getMomentByStandardFormat,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
export default {
  components: { FormFields, calendar },
  mixins: [imagesHelper],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    rejection: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isCreated: false,
      loading: false,
      visibleModal: false,
      entity: {},
      events: [],
      manufacturerTreatment: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    fetchEvents(arg, callback) {
      this.loading = true
      TreatmentAvailabilityServices.get({
        ...arg,
        treatmentTypeId: this.treatment.treatmentTypeId,
      })
        .then((schedules) => {
          callback(schedules.data)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    getMomentByStandardFormat,
    getEventClick(detail) {
      // console.log(detail.event._def.publicId)
      SchedulingServices.getEstimation(detail.event._def.publicId).then(
        (response) => {
          const data = response.data
          const datetime = getMomentByStandardFormat(
            data.manufacturerTreatmentStartDate
          )
          // To prevent selecting past date
          if (
            moment(datetime._d, 'dd-mm-yyyy') < moment(Date(), 'dd-mm-yyyy')
          ) {
            this.visibleModal = true
          } else {
            this.form.setFieldsValue({
              manufacturerName: detail.event._def.title,
              treatmentAvailabilityId: detail.event._def.publicId,
              collectionDate: getMomentByStandardFormat(data.collectionDate),
              pickupDateTime: getMomentByStandardFormat(data.pickupDateTime),
              deliveryDate: getMomentByStandardFormat(data.deliveryDate),
              manufacturerTreatmentStartDate: getMomentByStandardFormat(
                data.manufacturerTreatmentStartDate
              ),
              completionDate: getMomentByStandardFormat(data.completionDate),
              deliveryArrivalDate: getMomentByStandardFormat(
                data.deliveryArrivalDate
              ),
              duration: data.duration,
            })
          }
        }
      )
      // console.log('detail._def', detail)
      // console.log(detail)
    },
    handleOk() {
      this.visibleModal = false
    },
  },
}
</script>
