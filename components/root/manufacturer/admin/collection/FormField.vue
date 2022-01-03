<template>
  <div>
    <a-form-item label="Process step">
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input Process!' }],
            initialValue: collection.name,
          },
        ]"
        size="large"
        placeholder="input Process!"
      />

      <a-input
        v-decorator="[
          'treatmentTypeId',
          {
            rules: [
              {
                required: true,
                message: 'Please input your treatmentTypeId!',
              },
            ],
            initialValue: treatmentType.id,
          },
        ]"
        type="hidden"
      />
      <a-input
        v-decorator="[
          'type',
          {
            rules: [
              {
                required: true,
                message: 'Please input your treatmentTypeId!',
              },
            ],
            initialValue: type,
          },
        ]"
        type="hidden"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  props: {
    treatmentType: {
      type: Object,
      default: () => {
        return {}
      },
    },
    collection: {
      type: Object,
      default: () => {
        return {}
      },
    },
    type: {
      type: Number,
      require: true,
      default: null,
    },
  },
  data() {
    return {}
  },
}
</script>
