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
            :disabled-date="disabledDate"
            format="DD/MM/YYYY"
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
                rules: [],
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
                rules: [],
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
              'medication',
              {
                initialValue: patient.problem,
                rules: [],
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
              'street',
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
          <a-select
            v-decorator="[
              'countryId',
              {
                initialValue: patient.countryId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your country!',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Select Country"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="country in countries" :key="country.id">
              {{ country.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { BLOOD_TYPES, GENDER } from '~/services/Constant'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { filterOption } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
// import { isEmpty } from '~/services/Utilities'
export default {
  props: {
    patient: {
      type: Object,
      default: () => ({}),
    },
    isCreated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Gender: GENDER,
      bloodType: BLOOD_TYPES,
      countries: [],
      fetchCountry: true,
    }
  },
  mounted() {
    this.getCountries()
  },
  updated() {
    if (this.isCreated && this.fetchCountry) {
      this.fetchCountry = false
      this.getCountries()
    }
  },
  methods: {
    filterOption,
    disabledDate: _disabledFutureDate,
    fetchCountries(params = {}) {
      CountryServices.get(params).then((response) => {
        this.countries = response.data.data
      })
    },
    getCountries() {
      if (this.isCreated) {
        this.fetchCountries({ Ids: [this.patient.countryId] })
      } else {
        this.fetchCountries()
      }
    },
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
  },
}
</script>
