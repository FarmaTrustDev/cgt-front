<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="First Name*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'firstName',
              {
                initialValue: patient.firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your First Name!',
                  },
                ],
              },
            ]"
            placeholder="Please input your First Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Last Name*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'lastName',
              {
                initialValue: patient.lastName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Last Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your Last Name"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="Email address*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'Email',
              {
                initialValue: patient.email,
                rules: [
                  { required: true, message: 'Please input your Email!' },
                ],
              },
            ]"
            placeholder="Please input your Email"
          /> </a-form-item
      ></a-col>

      <a-col :span="8">
        <a-form-item
          label="Phone*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'Phone',
              {
                initialValue: patient.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Phone',
                  },
                ],
              },
            ]"
            type="number"
            placeholder="Please input your Phone"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="Date of Birth*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-date-picker
            format="DD/MM/YYYY"
            v-decorator="[
              'dOB',
              {
                initialValue: patient.dob,
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
          </a-date-picker>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Gender"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'gender',
              {
                initialValue: patient.gender,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Gender!',
                  },
                ],
              },
            ]"
            placeholder="Select gender"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="gender in Gender" :key="gender.id">
              {{ gender.name }}
            </a-select-option>
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="12">
        <a-form-item
          label="Blood Type"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'bloodType',
              {
                initialValue: patient.bloodType,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Gender!',
                  },
                ],
              },
            ]"
            placeholder="Select Blood Type"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="type in bloodType" :key="type">
              {{ type }}
            </a-select-option>
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="24">
        <a-form-item
          label="Allergies"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-textarea
            v-decorator="[
              'allergies',
              {
                initialValue: patient.allergies,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Allergies',
                  },
                ],
              },
            ]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="Please input your Allergies"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="Active Problems"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-textarea
            v-decorator="[
              'problem',
              {
                initialValue: patient.problem,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Problem',
                  },
                ],
              },
            ]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="Please input your Problem"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="Medication"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-textarea
            v-decorator="[
              'problem',
              {
                initialValue: patient.problem,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Problem',
                  },
                ],
              },
            ]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="Please input your Problem"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="Post Code:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'postCode',
              {
                initialValue: patient.postCode,
                rules: [
                  { required: true, message: 'Please input your Post Code!' },
                ],
              },
            ]"
            placeholder="Please input your Post Code"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="City*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'City',
              {
                initialValue: patient.city,
                rules: [{ required: true, message: 'Please input your City!' }],
              },
            ]"
            placeholder="Please input your City"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          label="Post Code Address:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'postCode',
              {
                initialValue: patient.postCode,
                rules: [
                  { required: true, message: 'Please input your Post Code!' },
                ],
              },
            ]"
            placeholder="Please input your Post Code Address"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          label="Street Number*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-textarea
            v-decorator="[
              'problem',
              {
                initialValue: patient.problem,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Problem',
                  },
                ],
              },
            ]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="Please input your Problem"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="County*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'County',
              {
                initialValue: patient.county,
                rules: [
                  {
                    required: true,
                    message: 'Please input your County',
                  },
                ],
              },
            ]"
            placeholder="Please input your County"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Country"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'Country',
              {
                initialValue: 'United Kingdom',

                rules: [
                  {
                    required: true,
                    message: 'Please input your Country',
                  },
                ],
              },
            ]"
            placeholder="Please input your Country"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { BLOOD_TYPES, GENDER } from '~/services/Constant'

export default {
  props: {
    patient: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      Gender: GENDER,
      bloodType: BLOOD_TYPES,
    }
  },
}
</script>
