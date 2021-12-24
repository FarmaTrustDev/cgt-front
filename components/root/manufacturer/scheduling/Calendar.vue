<template>
  <div>
    <FullCalendar
      :options="calendarOptions"
      :header="{
        left: 'prev,next',
      }"
      @changeDate="handleDateClick"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
// import AppointmentServices from '~/services/API/AppointmentServices'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        headerToolbar: {
          center: 'dayGridMonth,timeGridWeek', // buttons for switching between views
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
          next: {
            click(a, v) {
              console.log(a, v)
              return ''
            },
          },
        },
        select(info) {
          alert('selected ' + info.startStr + ' to ' + info.endStr)
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
    }
  },
  mounted() {
    console.log('asd')
    // this.loadData([
    //   {
    //     end: '2021-12-11T14:45:00',
    //     globalId: '1cf30c36-13c2-4a9d-866d-43054ca14948',
    //     id: 894,
    //     patient_Gender: null,
    //     patient_Id: 484,
    //     patient_Name: null,
    //     patient_Unique_Id: null,
    //     start: '2021-12-11T13:45:00',
    //     status_Id: 6,
    //     title: 'George Reece',
    //   },
    // ])
  },
  methods: {
    handleDateClick(arg, callback) {
      console.log(arg);
      const ddddata = [
        {
          end: '2021-12-11T14:45:00',
          globalId: '1cf30c36-13c2-4a9d-866d-43054ca14948',
          id: 894,
          patient_Gender: null,
          patient_Id: 484,
          patient_Name: null,
          patient_Unique_Id: null,
          start: '2021-12-11T13:45:00',
          status_Id: 6,
          title: 'George Reece',
        },
      ]
      // const g = [{ title: 'nice event', start: new Date() }]
      // AppointmentServices.calendarEvents(arg)
      //   .then((appointments) => {
      //     callback(appointments.data)
      //     // console.log(appointments)
      //     //  callback(g)
      //   })
      //   .finally(() => (this.loading = false))
      callback(ddddata)
    },
  },
}
</script>
