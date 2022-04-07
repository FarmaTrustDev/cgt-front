<template>
  <div class="consumables-tile">
    <div class="position-relative svg-container">
      <svg
        class="position-relative progressive-svg"
        viewBox="-8 -7 110.063 63.375"
      >
        <path
          id="progress"
          d="M0,56.1V32.1C0,14.4,14.4,0,32.1,0h23.9c17.8,0,32.1,14.4,32.1,32.1v23.95"
          fill="none"
          stroke="#2359e8"
          stroke-width="16"
          pathLength="100"
          stroke-dasharray="46,100"
          style="stroke: rgb(255, 9, 9)"
        ></path>
      </svg>
      <svg class="static-svg" viewBox="-8 -7 110.063 63.375">
        <path
          d="M0,56.1V32.1C0,14.4,14.4,0,32.1,0h23.9c17.8,0,32.1,14.4,32.1,32.1v23.9"
          fill="none"
          stroke="#ececec"
          stroke-width="16"
          pathLength="100"
        ></path>
      </svg>
    </div>
    <figure>
      <span class="digit top-digit">46</span>
      <div class="slider-beast">
        <svg
          class="slider-svg"
          width="158"
          height="50"
          viewBox="0 0 166 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_235:30)">
            <path
              d="M4 22C4 12.0589 12.0589 4 22 4H143.101C153.042 4 161.101 12.0589 161.101 22V35.2095C161.101 45.1506 153.042 53.2094 143.101 53.2094H22C12.0589 53.2094 4 45.1506 4 35.2094V22Z"
              fill="#1E2B4D"
            ></path>
          </g>
          <path
            d="M82.5498 19.1484V43.8077"
            stroke="#2359E8"
            stroke-width="3.2"
            stroke-linecap="round"
          ></path>
        </svg>

        <span class="digit">46</span>

        <span
          data-value="46"
          class="drag-image ui-draggable ui-draggable-handle"
          style="left: 46px"
        >
          <span class="img-dragger-dots"></span>
        </span>
      </div>
    </figure>
    <h6 class="consumables-heading">Consumables HAS (GIBCO MEM)</h6>
  </div>
</template>
<script>
export default {
    
}
</script>