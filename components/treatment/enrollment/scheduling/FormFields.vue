<template>
  <div>
    <a-row>
      <a-col :span="12" class="plr-10">
        <a-form-item :label="translation.Manuf_1_89">
          <a-input
            v-decorator="[
              'manufacturerName',
              {
                rules: [
                  { required: true, message: 'Please input manufacturerName' },
                ],
                initialValue: entity.manufacturerName,
              },
            ]"
            :disabled="true"
            size="large"
            placeholder="Select manufacturer"
          />
          <a-input
            v-decorator="[
              'treatmentAvailabilityId',
              {
                rules: [
                  { required: true, message: 'Please input your Email' },
                ],
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
                  { required: true, message: 'Please input your treatmentId' },
                ],
                initialValue: treatment.id,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="plr-10">
        <logistic-lookup></logistic-lookup>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8" class="plr-10">
        <a-form-item :label="translation.SamplColle_3_518">
          <a-date-picker
            v-decorator="[
              'collectionDate',
              {
                initialValue: entity.collectionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Collection Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Container Arrival Date">
          <a-date-picker
            v-decorator="[
              'pickupDateTime',
              {
                initialValue: entity.pickupDateTime,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Container Arrival Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
        <a-form-item
        label="Time"
        >
          <a-input
          v-decorator="[
            'time',{
              initialValue: entity.time,
              rules: [
                  {
                    required: true,
                    message: 'Please select time',
                  },
                ],
            }

          ]"
          type="time"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Lab Delivery Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryDate',
              {
                initialValue: entity.deliveryDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Delivery Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
            style="width: 100%"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Production Start Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'manufacturerTreatmentStartDate',
              {
                initialValue: entity.manufacturerTreatmentStartDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Start Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>

      <a-col :span="8" class="plr-10">
        <a-form-item :label="translation.ComplDate_3_734" class="pb-0">
          <a-date-picker
            v-decorator="[
              'completionDate',
              {
                initialValue: entity.completionDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Completion Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
            size="large"
          >
          </a-date-picker> </a-form-item
      ></a-col>
      
    </a-row>
    <a-row>
      <a-col :span="8" class="plr-10">
        <a-form-item label="Treatment Arrival Date" class="pb-0">
          <a-date-picker
            v-decorator="[
              'deliveryArrivalDate',
              {
                initialValue: entity.deliveryArrivalDate,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Treatment Arrival Date',
                  },
                ],
              },
            ]"
            :format="dateFormat"
            :disabled-date="disabledDate"
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
                    message: 'Please enter duration',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
            placeholder="Duration"
            class="duration_field"
            :disabled="true"
          ></a-input-number> </a-form-item
      ></a-col>
      <a-col :md="8" class="plr-10">
        <a-form-item :label="translation.Notes_1_350" class="pb-0">
          <a-textarea
            v-decorator="[
              'notes',
              {
                initialValue: entity.notes,
                rules: [
                  {
                    message: 'Please enter notes',
                  },
                ], 
              },
            ]"
            style="width: 100%; padding-top: 15px"
            class="note-area"
            size="large"
            placeholder="Enter Notes"
          ></a-textarea> </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>
<script>
import LogisticLookup from '~/components/lookups/LogisticLookup'
import { _disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
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
      dateFormat: STANDARD_UK_DATE_FORMAT,
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    onSubmit(e) {},
  },
}
</script>
<style scoped>
.duration_field {
  border: 0 !important;
}
.duration_field:focus {
  border-color: none !important;
  box-shadow: none !important;
}
.ant-form-item{
  margin-bottom: 1px;
}
.ant-input[disabled] {
    /* color: rgba(0, 0, 0, 0.25); */
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 1;
    color:black
}
.ant-input[disabled] ::placeholder{
  color: black
}
</style>
