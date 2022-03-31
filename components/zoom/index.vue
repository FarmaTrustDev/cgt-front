<template>
  <div>
    <a-modal
      :visible="visible"
      title="New Zoom Meeting"
      @ok="showModal(false)"
      @cancel="showModal(false)"
    >
      <form-fields />
    </a-modal>
  </div>
</template>
<script>
import FormField from '~/components/zoom/FormField'
export default {
  components: { 'form-fields': FormField },
  data() {
    return {
      visible: false,
    }
  },

  mounted() {
    this.$emit('showZoomModal', this.showModal)
  },
  methods: {
    showModal(show) {
      this.visible = show
    },
  },
}
</script>
