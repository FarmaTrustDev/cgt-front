<template>
  <div>
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="81"
      viewBox="0 0 50 81"
      fill="none"
    >
      <path
        d="M4.94067 0.5H45.0595C46.9925 0.5 48.5595 2.067 48.5595 4V37.9951H1.44067V4.00001C1.44067 2.06701 3.00768 0.5 4.94067 0.5Z"
        :fill="getUpperPortion(type)"
        :stroke="color"
        class="blink_me"
      />
      <path
        d="M1.44067 38.9951H48.5595V72.9901C48.5595 74.9231 46.9925 76.4901 45.0595 76.4901H4.94068C3.00768 76.4901 1.44067 74.9231 1.44067 72.9901V38.9951Z"
        :fill="getLowerPortion(type)"
        :stroke="color"
        class="blink_me"
      />
      <path
        d="M4.14844 76.9901H45.8514L45.2532 78.4856C44.6458 80.0042 43.1749 81 41.5393 81H8.22964C6.32291 81 4.68125 79.6542 4.30731 77.7845L4.14844 76.9901Z"
        :fill="color"
      />
      <line
        x1="5.45068"
        y1="10.9258"
        x2="5.45068"
        y2="27.5693"
        :stroke="color"
        stroke-linecap="round"
      />
      <line
        x1="5.45068"
        y1="49.4208"
        x2="5.45068"
        y2="66.0644"
        :stroke="color"
        stroke-linecap="round"
      />
    </svg> -->
    <svg
      width="49"
      height="85"
      viewBox="0 0 49 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="80" rx="4" fill="#D9D9D9" />
      <path
        d="M0 19H48V39H0V19Z"
        da="3"
        :class="getBlinkClass()"
        :fill="getColor(3)"
      />
      <path
        d="M0 39H48V59H0V39Z"
        da="2"
        :class="getBlinkClass()"
        :fill="getColor(2)"
      />
      <path
        d="M0 59H48V75C48 77.2091 46.2091 79 44 79H4C1.79086 79 0 77.2091 0 75V59Z"
        :class="getBlinkClass()"
        :fill="getColor(1)"
        da="1"
      />
      <path
        d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H44C45.933 0.5 47.5 2.067 47.5 4V39.5H0.5V4Z"
        :stroke="color"
      />
      <path
        d="M0.5 40.5H47.5V76C47.5 77.933 45.933 79.5 44 79.5H4C2.067 79.5 0.5 77.933 0.5 76V40.5Z"
        :stroke="color"
      />
      <path
        d="M3 80H44.703L44.1048 81.4955C43.4973 83.0141 42.0265 84.0099 40.3909 84.0099H7.0812C5.17447 84.0099 3.53281 82.6641 3.15887 80.7944L3 80Z"
        fill="black"
      />
      <line
        x1="4.50977"
        y1="14.9258"
        x2="4.50976"
        y2="31.5693"
        :stroke="color"
        stroke-linecap="round"
      />
      <line
        x1="4.50977"
        y1="53.4209"
        x2="4.50976"
        y2="70.0645"
        :stroke="color"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script>
// const types = [1, 2, 3, 4]0,25,50,75,100

const colors = {
  red: '#FC1212',
  blue: '#2F79E3',
  yellow: '#FE9418',
  grey: '#D9D9D9',
}
const typeColor = [colors.grey, colors.blue, colors.yellow, colors.red]
export default {
  props: {
    color: { type: String, default: '#1943AE' },
    type: { type: Number, default: 0 },
  },
  data() {
    return {}
  },
  methods: {
    getUpperPortion(type) {
      if (this.type > 1) {
        return colors.red
      }
      return colors.grey
    },
    getLowerPortion(type) {
      if (this.type > 1) {
        return colors.red
      }
      if (this.type === 1) {
        return colors.yellow
      }
      return colors.grey
    },
    getColor(type) {
      return type <= this.type ? typeColor[this.type] : '#D9D9D9'
    },
    getBlinkClass() {
      return this.type > 2 && 'blink_me'
    },
  },
}
</script>
