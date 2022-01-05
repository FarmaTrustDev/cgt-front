<template>
  <div>
    <a-form-item label="Collection Date" class="pb-0">
      <a-date-picker
        v-decorator="[
          'collectionDate',
          {
            rules: [
              {
                required: true,
                message: ' select your Collection Date',
              },
            ],
          },
        ]"
        style="width: 100%"
        size="large"
      >
      </a-date-picker>
    </a-form-item>
    <a-form-item label="Collection Time" class="pb-0">
      <a-time-picker
        v-decorator="[
          'collectionTime',
          {
            rules: [
              {
                required: true,
                message: ' select your Collection Date',
              },
            ],
          },
        ]"
        use12-hours
        style="width: 100%"
        size="large"
        format="h:mm:ss A"
      >
      </a-time-picker>
    </a-form-item>
    <a-form-item label="Collection Time" class="pb-0">
      <a-textarea
        v-decorator="[
          'notes',
          {
            rules: [
              {
                required: true,
                message: ' Add some description',
              },
            ],
          },
        ]"
        style="width: 100%"
        size="large"
      ></a-textarea>
      <a-input
        v-decorator="[
          'treatmentId',
          {
            initialValue: treatment.id,
            rules: [
              {
                required: true,
                message: ' Add some description',
              },
            ],
          },
        ]"
      ></a-input>
    </a-form-item>
  </div>
</template>
<script>
export default {
  props: { treatment: { required: true, type: Object } },
  data() {
    return {}
  },
}
</script>
