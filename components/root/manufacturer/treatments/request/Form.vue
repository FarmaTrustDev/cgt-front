<template>
  <div>
    <!-- // DEtail view -->
    <span>
      <span v-if="isAccepted"> {{ modalMessage }}</span>
      <a-descriptions v-else title="Reject Treatment Detail">
        <a-descriptions-item label="Patient ID">
          {{ data.patientEnrollmentNumber }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="Collection - Delivery Date">
          {{ data.collectionDateDeliveryDate }}
        </a-descriptions-item>
        <a-descriptions-item label="Hospital ">
          {{ data.hospital.name }}
        </a-descriptions-item>
      </a-descriptions>
    </span>
    <!-- // DEtail view -->

    <a-form-item>
      <a-input
        v-decorator="[
          `schedulingId`,
          {
            rules: [
              { required: true, message: 'Please input your Patient Id!' },
            ],
            initialValue: data.id,
          },
        ]"
        type="hidden"
      ></a-input>
      <a-checkbox
        v-decorator="[
          `accepted`,
          {
            rules: [
              { required: true, message: 'Please input your Patient Id!' },
            ],
            initialValue: isAccepted,
            valuePropName: 'checked',
          },
        ]"
        class="d-none"
      />
    </a-form-item>
    <a-form-item v-if="!isAccepted" label="Note for Rejection:">
      <a-textarea
        v-decorator="[
          `reason`,
          {
            rules: [],
          },
        ]"
        placeholder="Type note here"
      ></a-textarea
    ></a-form-item>
  </div>
</template>
<script>
export default {
  props: {
    data: { type: Object, required: true },
    isAccepted: { type: Boolean, required: true },
  },
  data() {
    return { modalMessage: 'Are you sure you want to accept this treatment?' }
  },
  methods: {},
}
</script>
