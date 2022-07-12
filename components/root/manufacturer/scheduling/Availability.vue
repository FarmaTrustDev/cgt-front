<template>
  <div>
    <a-date-picker
    class="availability-calender"
      :open="openDatePicker"
      :disabled-date="disabledDate"
      format="YYYY-MM-DD HH:mm:ss"
      show-time
      @openChange="handleStartOpenChange"
      @change="onDateChange"
      @ok="showCalendarOpener(false)"
    />
    <FullCalendar
      :options="calendarOptions"
      :header="{
        left: 'prev,next',
      }"
      @changeDate="handleDateClick"
    />
    <FormActionButton :loading="loading" @click="onSubmit"> </FormActionButton>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
import { getFormattedMoment,_disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
import notifications from '~/mixins/notifications'
// import AppointmentServices from '~/services/API/AppointmentServices'
import nullHelper from '~/mixins/null-helpers'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  mixins: [nullHelper, notifications],
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
          center: 'dayGridMonth', // buttons for switching between views
        },
        plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        selectable: true,
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
            title: 'Cellfuse',
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
          .catch(this.error)
          .finally(() => (this.loading = false))
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
          })
          .catch(this.error)
          .finally(() => (this.loading = false))
      }
    },
  },
}
</script>
