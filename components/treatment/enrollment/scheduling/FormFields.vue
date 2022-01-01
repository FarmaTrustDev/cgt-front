<template>
  <div>
    <a-row>
      <a-col :span="12" class="plr-10">
        <a-form-item label="Manufacturer">
          <a-input
            v-decorator="[
              'manufacturerName',
              {
                rules: [
                  { required: true, message: 'Please input manufacturerName!' },
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

          <a-input
            v-decorator="[
              'treatmentId',
              {
                rules: [
                  { required: true, message: 'Please input your treatmentId!' },
                ],
                initialValue: treatment.id,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="plr-10 mt-5">
        <logistic-lookup></logistic-lookup>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Sample Collection Date">
          <a-date-picker
            v-decorator="[
              'hospitalCollectionDate',
              {
                initialValue: entity.hospitalCollectionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Collection Date!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Delivery Dispatch Date">
          <a-date-picker
            v-decorator="[
              'pickupDateTime',
              {
                initialValue: entity.pickupDateTime,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Dispatch Date!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Samples Delivery Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryDate',
              {
                initialValue: entity.deliveryDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Delivery Date!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
    </a-row>
    <a-row>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Treatment Start Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'manufacturerTreatmentStartDate',
              {
                initialValue: entity.manufacturerTreatmentStartDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Start Date!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>

      <a-col :span="8" class="plr-10">
        <a-form-item label="Completion Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'completionDate',
              {
                initialValue: entity.completionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Completion Date!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
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
    </a-row>
    <a-row>
      <a-col :span="12" class="plr-10">
        <a-form-item label="Delivery Arrival Date " class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryArrivalDate',
              {
                initialValue: entity.deliveryArrivalDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Delivery Arrival Date Birth!',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="12" class="plr-10">
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
import { STANDARD_UK_DATE_FORMATE } from '~/services/Constant/DateTime'
export default {
  components: { LogisticLookup },
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dateFormat: STANDARD_UK_DATE_FORMATE,
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
