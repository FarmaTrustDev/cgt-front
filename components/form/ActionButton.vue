<template>
  <a-form-item>
    <a-button :type="btnType" html-type="submit">
      <slot name="icon" />{{ text }}</a-button
    >
    <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
  </a-form-item>
</template>
<script>
export default {
  props: {
    position: {
      default: 'left',
      type: String,
    },
    isCreated: { default: false, type: Boolean },
    text: { default: 'Submit', type: String },
    btnType: { default: 'primary', type: String },
  },
}
</script>
