<template>
  <div>
    <a-date-picker
      class="availability-calender"
      :open="openDatePicker"
      :disabled-date="disabledDate"
      format="YYYY-MM-DD"
      @openChange="handleStartOpenChange"
      @change="onDateChange"
      @ok="showCalendarOpener(false)"
    />
    <FullCalendar
      class="grey-card"
      :options="calendarOptions"
      :header="{
        left: 'prev,next',
      }"
      @changeDate="handleDateClick"
    />
    <FormActionButton :loading="loading" :text="translation.savesched_2_520" @click="onSubmit"> </FormActionButton>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
import {
  getFormattedMoment,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import { isEmpty } from '~/services/Utilities'
import notifications from '~/mixins/notifications'
// import AppointmentServices from '~/services/API/AppointmentServices'
import nullHelper from '~/mixins/null-helpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  mixins: [nullHelper, notifications,routeHelpers],
  props: {
    manufacturerTreatment: {
      default: () => ({}),
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      calendarOptions: {
        headerToolbar: {
           left: false,
          center: 'title',
          right: 'prev,next'
        },
        plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        displayEventTime: false,
        selectable: false,
        events: this.handleDateClick,
        slotMinTime: '08:00:00',
        height: 550,
        slotMaxTime: '21:00:00',
        customButtons: {
          // next: {
          //   click(a, v) {
          //     console.log(a, v)
          //     return ''
          //   },
          // },
        },
        select(info) {
          // alert('selected ' + info.startStr + ' to ' + info.endStr)
        },
        dateClick: this.handleDateClick,
        views: {
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 3 },
            buttonText: '3 day',
          },
        },
      },
      openDatePicker: false,
      calendarEventsData: [],
      entityId: null,
      isCreated: false,
      savedEvents: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  methods: {
    getFormattedMoment,
    disabledDate: _disabledPreviousDate,
    onDateChange(dateTime) {
      if (dateTime) {
        const dateM = getFormattedMoment(dateTime)
        // this.openDatePicker = true

        this.addEvent([
          {
            end: dateM,
            title: `${this.user.organizationName}`,
            start: dateM,
          },
        ])
      }
    },
    addEvent(data) {
      let updatedData = this.calendarEventsData

      updatedData = [...updatedData, ...data]
      this.calendarOptions.events = [...updatedData, ...this.savedEvents]
      this.calendarEventsData = updatedData
    },
    handleDateClick(arg, callback) {
      this.loading = true
      const manufacturerTreatment = this.manufacturerTreatment
      if (!this.isEmpty(manufacturerTreatment)) {
        TreatmentAvailabilityServices.get({
          organizationId: this.manufacturerTreatment.organizationId,
          treatmentTypeId: manufacturerTreatment.treatmentTypeId,
          ...arg,
        })
          .then((schedules) => {
            this.savedEvents = schedules.data
            callback(schedules.data)
          })
          .catch((e) => {
            if (!isEmpty(e.response)) {
              // this.error = e.response.data.message
            }
          })
          .finally(() => (this.loading = false))
        // console.log(this.error)
      }
    },
    showCalendarOpener(show) {
      this.openDatePicker = show
    },
    handleStartOpenChange(open) {
      this.showCalendarOpener(open)
    },
    checkCreated() {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
      }
    },
    onSubmit(e) {
      if (this.isCreated) {
        TreatmentAvailabilityServices.create(
          this.entityId,
          this.calendarEventsData
        )
          .then((response) => {
            this.success(response.message)
            this.goto('/manufacturer/schedules')
          })
          .catch(this.error)
          .finally(() => (this.loading = false))
      }
    },
  },
}
</script>
