<template>
  <div>
    <a-form-item :label="translation.ColleDate_3_290" class="pb-0">
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
        format="DD/MM/YYYY"
      >
      </a-date-picker>
    </a-form-item>
    <a-form-item :label="translation.ColleTime_2_772" class="pb-0">
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
        format="h:mm A"
      >
      </a-time-picker>
    </a-form-item>
    <a-form-item label="Description" class="pb-0">
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
        placeholder="Description"
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
        type="hidden"
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
