<template>
  <a-form-item>
    <a-button :type="btnType" html-type="submit">
      <slot name="icon" />{{ getText() }}</a-button
    >
    <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
  </a-form-item>
</template>
<script>
const defaultText = 'Create'
export default {
  props: {
    position: {
      default: 'left',
      type: String,
    },
    isCreated: { default: false, type: Boolean },
    text: { default: defaultText, type: String },
    btnType: { default: 'primary', type: String },
  },
  data() {
    return {}
  },
  methods: {
    getText() {
      if (this.isCreated) {
        if (this.text !== defaultText) {
          return this.text
        }
        return 'Update'
      }
      return this.text
    },
  },
}
</script>
