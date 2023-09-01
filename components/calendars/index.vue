<template>
  <div>
    <FullCalendar
      :options="calendarOptions"
      :header="{
        left: 'prev,next ',
      }"
      @select="handleEventClick"
      @changeDate="handleDateClick"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  props: {
    handleDateClick: {
      default: () => ({}),
      type: Function,
      require: true,
    },
  },
  data() {
    return {
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
        selectable: true,
        displayEventTime : false,
        events:this.handleDateClick,
        eventContent: this.customizeEventContent,
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
        // select(info) {
        //   alert('selected ' + info.startStr + ' to ' + info.endStr)
        // },
        eventClick: this.handleEventClick,
        // dateClick: this.handleSelect,
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
  },
  methods: {
    handleEventClick(arg) {
      this.$emit('getEventClick', arg)
    },
    customizeEventContent(arg) {
      const event = arg.event;
      let backgroundColor;
      let color;

      // Set background color based on conditions
      if (event.extendedProps.globalId==='00000000-0000-0000-0000-000000000000') {
        backgroundColor = 'white';
        color="black"
      }else if(event.extendedProps.isCollection===true){
        backgroundColor = 'purple';
        color="white"
      } 

      return {
        html: `<div class="custom-event-content" style="padding-left:2px; margin-left:-7px; margin-top:-7px; margin-right:-7px; margin-bottom:-7px; text-align:center; padding-top:8px; height: 35px; border-radius:11px; width: 170px; background-color: ${backgroundColor}; color:${color}">${event.title}</div>`
      };
    }
  },
}
</script>

<style scoped>
.custom-event-content {
  /* Customize the styling of the event content here */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  font-weight: bold;
}
</style>

