<template>
  <div>
    <a-form-item label="manufacturer">
      <a-input
        v-decorator="[
          'manufacturerName',
          {
            rules: [
              { required: true, message: 'Please inputmanufacturerName!' },
            ],
            initialValue: entity.manufacturerName,
          },
        ]"
        :disabled="true"
        size="large"
        placeholder="Email/Username"
      />
      <a-input
        v-decorator="[
          'treatmentAvailabilityId',
          {
            rules: [{ required: true, message: 'Please input your Email!' }],
            initialValue: entity.treatmentAvailabilityId,
          },
        ]"
        type="hidden"
      />
    </a-form-item>
    <logistic-lookup></logistic-lookup>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Sample Collection Date">
          <a-date-picker
            v-decorator="[
              'collectionDate',
              {
                initialValue: entity.collectionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Delivery Dispatch Date">
          <a-date-picker
            v-decorator="[
              'dispatchDate',
              {
                initialValue: entity.dispatchDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Samples Delivery Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryDate',
              {
                initialValue: entity.deliveryDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Treatment Start Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'treatmentStartDate',
              {
                initialValue: entity.treatmentStartDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12"
        ><a-form-item label="Date of Birth" class="pb-0">
          <a-date-picker
            v-decorator="[
              'completionDate',
              {
                initialValue: entity.completionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Delivery Arrival Date " class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryArrivalDate',
              {
                initialValue: entity.dob,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Duration" class="pb-0">
          <a-input-number
            v-decorator="[
              'duration',
              {
                initialValue: entity.duration,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          ></a-input-number> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item label="Notes" class="pb-0">
          <a-textarea
            v-decorator="[
              'notes',
              {
                initialValue: entity.notes,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          ></a-textarea> </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>
<script>
import LogisticLookup from '~/components/lookups/LogisticLookup.vue'
export default {
  components: { LogisticLookup },
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      manufacturerName: null,
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
    }
  },
  methods: { onSubmit(e) {} },
}
</script>
