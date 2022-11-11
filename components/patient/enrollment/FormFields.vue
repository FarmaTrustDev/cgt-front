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
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid name',
                  },
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
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid name',
                  },
                ],
              },
            ]"
            :placeholder="translation.LastName_2_422"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item
          :label="translation.EmailAddre_2_140 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-model="email"
            v-decorator="[
              'Email',
              {
                initialValue: patient.email,
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            type="email"
            :placeholder="translation.EmailAddre_2_140"
          />{{ msg }}
        </a-form-item></a-col
      >
      <a-col :span="8">
        <a-form-item
          :label="translation.Phone_1_63 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          min="0"
          class="patient-phone-field"
        >
          <!-- <a-input
            v-decorator="[
              'Phone',
              {
                initialValue: patient.phone,
                rules: [
                  {
                    required:true,
                    message:'Requried'
                  },
                ],
              },
            ]"
            @change="onChange"
          /> -->
          <a-input-group compact>
            <a-select
              v-decorator="[
                'countryCode',
                {
                  initialValue: countryIso,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              style="width: 50%"
              :show-search="true"
              @search="searchCountryCode"
              @change="handleChange"
            >
              <a-select-option
                v-for="country in countries"
                :key="country.iso" :value="country.iso + country.countryCode"
              >
                {{ country.iso }}{{ country.countryCode }}
              </a-select-option>
            </a-select>
            <a-input
              v-decorator="[
                'phone',
                {
                  initialValue: patient.phone !== null ? getPhoneNumber(patient.phone) : '',
                  rules: [
                    {
                      required: true,
                      message: 'Requried',
                    },
                  ],
                },
              ]"
              style="width: 50%"
              placeholder="123456789"
            />
          </a-input-group>
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
      </a-row>
      <a-row>
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
    </a-row>
    <a-row>
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
    </a-row> 
    <a-row>
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
    </a-row>
    <a-row>
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
    </a-row>
    <a-row>
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
    </a-row>
    <a-row>
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
            placeholder="Postal Code "
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
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid city name',
                  },
                ],
              },
            ]"
            :placeholder="translation.City_1_446"
          /> </a-form-item
      ></a-col>
    </a-row>
    <a-row>
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
            placeholder="Postal Code Address"
          /> </a-form-item
      ></a-col>
    </a-row>
    <a-row>
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
            placeholder="Steet Number"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
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
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid county name',
                  },
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
    countryIso: {
      type: String,
      default: null
    }
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
      email: '',
      msg: '',
      countryCode: [],
      countryCodeList: {},
      patientPhone: '',
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
  watch: {
    msg(newMsg, oldMsg) {
      if (newMsg !== oldMsg) {
        this.msg = newMsg
      }
    },
  },
  mounted() {
    this.fetchCountries()
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
      CountryServices.get(params).then((response)=>{
        this.countries = response.data.data
      if (!isEmpty(params)) {
        this.form.setFieldsValue({ countryId: this.countries[0].id })
      }
      })
    },
    selectCountries(params) {
      CountryServices.get(params).then((response) => {
        this.countries = response.data.data
      })
    },
    getPhoneNumber(e)
    {
      if(!isEmpty(e))
      {
        const index = e.indexOf(")");  
        return e.substr(index + 1);
      }
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
    searchCountryCode(params) {
      const param = { countryCode: params, iso : params }
      this.selectCountries(param)
      if (!isEmpty(params)) {
        this.form.setFieldsValue({ countryCode: this.countries[0].iso })
      }
    },
    fetchCountryByPostCode(e) {
      MapServices.fetchCountryByPostCode(e.target.value).then((response) => {
        let name = ''
        this.form.setFieldsValue({
          City: response.result.cityName,
          County: response.result.countyName,
          address: response.result.location
        })
        name= response.result.countryName
        this.searchCountries(name,'b')
      })
    },
    handleChange(e) {
      // console.log(e)
      this.$emit('getPhoneNumber', '(' + e + ')')
      // console.log(e);
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
<style scoped>
.ant-form-item {
  margin-bottom: 1px;
}
.ant-form-vertical .ant-form-item {
  padding-bottom: 1px;
}
</style>
