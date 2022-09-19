<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.FirstName_2_420 + '*:'"
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
                    message: 'Required',
                  },
                  {
                    pattern: /^[a-z]+$/,
                    message: 'Please enter a valid name'
                  }
                ],
              },
            ]"
            :placeholder="translation.FirstName_2_420"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.LastName_2_422 + '*:'"
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
                    message: 'Required',
                  },
                  {
                    pattern: /^[a-z]+$/,
                    message: 'Please enter a valid name'
                  }
                ],
              },
            ]"
            :placeholder="translation.LastName_2_422"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="translation.EmailAddre_2_140 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
          
            v-decorator="[
              'Email',
              {
                initialValue: patient.email,
                rules: [
                {
                type: 'email',
                message: 'The input is not valid E-mail!',
                },
                { required: true, message: 'Required' }],
              },
            ]"
            :placeholder="translation.EmailAddre_2_140"
          /> </a-form-item
      ></a-col>

      <a-col :span="8">
        <a-form-item
          :label="translation.Phone_1_63 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          min="0"
        >
          <a-input
            v-decorator="[
              'Phone',
              {
                initialValue: patient.phone,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            type="number"
            placeholder="12345678"
            min="0"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="translation.DateOf_3_633"
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
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
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
          :label="translation.Gende_1_637"
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
                    required: '',
                    message: 'Required',
                  },
                ],
              },
            ]"
            :placeholder="translation.Gende_1_637"
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
          :label="translation.BloodType_2_635"
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
                    message: '',
                  },
                ],
              },
            ]"
            :placeholder="translation.BloodType_2_635"
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
      <a-col :span="12">
        <a-form-item
          :label="translation['Heigh(cm)*_2_641'] + '*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'height',
              {
                initialValue: patient.height,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            type="number"
            min="0"
            :placeholder="translation['Heigh(cm)*_2_641']"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation['Weigh(kg)*_2_639'] + '*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'weight',
              {
                initialValue: patient.weight,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            type="number"
            min="0"
            :placeholder="translation['Weigh(kg)*_2_639']"
          />
        </a-form-item>
      </a-col>
      <!-- <a-col :span="12">
        <a-form-item
          :label="translation.What3_1_432 + '*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'what3Words',
              {
                initialValue: patient.what3Words,
                rules: [
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ],
              },
            ]"
            :placeholder="translation.What3_1_432"
          />
        </a-form-item>
      </a-col> -->
      <a-col :span="12"></a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.Aller_1_643"
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
            :placeholder="translation.Aller_1_643"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.ActivProbl_2_645"
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
            :placeholder="translation.ActivProbl_2_645"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.Medic_1_647"
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
            :placeholder="translation.Medic_1_647"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          :label="translation['PostaCode:_2_649']"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'postCode',
              {
                initialValue: patient.postCode || '',
                rules: [{ message: '' }],
              },
            ]"
            name="postCode"
            :placeholder="translation['PostaCode:_2_649']"
            @blur="fetchCountryByPostCode"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.City_1_446 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'City',
              {
                initialValue: patient.city,
                rules: [
                { required: true, message: 'Required' },
                {
                    pattern: /^[a-z]+$/,
                    message: 'Please enter a valid city name'
                }
                ],
              },
              
            ]"
            :placeholder="translation.City_1_446"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.PostaCode_3_651"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: patient.address,
                rules: [{ message: '' }],
              },
            ]"
            :placeholder="translation.PostaCode_3_651"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.StreeNumbe_2_653"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-textarea
            v-decorator="[
              'street',
              {
                initialValue: patient.street,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :placeholder="translation.StreeNumbe_2_653"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Count_1_657 + ':*'"
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
                    message: 'Required',
                  },
                  {
                    pattern: /^[a-z]+$/,
                    message: 'Please enter a valid county name'
                  }
                ],
              },
            ]"
            :placeholder="translation.Count_1_657"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Count_1_49 + ':*'"
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
                    message: 'Required',
                  },
                ],
              },
            ]"
            not-found-content="Enter Country Name"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Searccount_2_576"
            style="width: 100%"
            size="large"
            class="default-select pt-2"
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
import MapServices from '~/services/API/MapServices'
// import PatientServices from '~/services/API/PatientServices'
import { isEmpty } from '~/services/Utilities'
export default {
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    patient: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },       
  },
  data() {
    return {
      Gender: GENDER,
      bloodType: BLOOD_TYPES,
      countries: [],
      fetchCountry: true,
      postCode: '',
      cityName: '',
      countryName: '',
      /* form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }), */
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    // this.getCountries()
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
        if(!isEmpty(params)){
          this.form.setFieldsValue({countryId:this.countries[0].id})
        }
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
    fetchCountryByPostCode(e) {
      MapServices.fetchCountryByPostCode(e.target.value).then((response) => {
        this.form.setFieldsValue({City: response.result.address_components[1].long_name})
        this.form.setFieldsValue({address: response.result.location})
        this.form.setFieldsValue({County: response.result.address_components[1].long_name})
        let name=''
        if(response.result.address_components[3].short_name==='GB'){
          name=response.result.address_components[3].long_name  
        }else{
          name=response.result.address_components[4].long_name
        }
        // const name=response.result.address_components[4].long_name
        this.searchCountries(name,'b')
      })
    },    
    /* postCodeChange(data) {
      PatientServices.getMapInfo(data.target.value).then((response) => {
        // alert(response.result.address_components[1].long_name)
        if(response.result.address_components[1].long_name){
          this.form.setFieldsValue(
            {
              // aler()
              // City:response.result.address_components[1].long_name
            }
          )
        }
      })
    }, */
  },
}
</script>
