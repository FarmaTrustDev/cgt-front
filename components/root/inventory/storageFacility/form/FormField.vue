<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.EquipType_2_552"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
          :placeholder="translation.EquipType_2_552"
          style="width: 100%"
          size="large"
          class="default-select"
          >
            <a-select-option value="Cellfuse">Cellfuse</a-select-option>
            <a-select-option value="Cellfuse US">Cellfuse US</a-select-option>
            <a-select-option value="Cellfuse US">Cellfuse US</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Lab_1_566"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
          :placeholder="translation.SelecLab_2_564"
          style="width: 100%"
          size="large"
          class="default-select"
          >
            <a-select-option value="Cellfuse">Cellfuse</a-select-option>
            <a-select-option value="Cellfuse US">Cellfuse US</a-select-option>
            <a-select-option value="Cellfuse US">Cellfuse US</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>      
      <a-col :span="12">
        <a-form-item
          :label="translation.EquipName_2_553+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: entity.email,
                rules: [
                  {
                    required: true,
                    message: translation.EquipName_2_553,
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation.EquipName_2_553"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.LabZone_2_554"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'contact',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: true,
                    message: translation.LabZone_2_554,
                  },
                ],
              },
            ]"
            :placeholder="translation.LabZone_2_554"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Numbeof_3_555"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: true,
                    message: translation.Numbeof_3_555,
                  },
                ],
              },
            ]"
            :placeholder="translation.Numbeof_3_555"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Numbeof_3_556"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: true,
                    message: translation.Numbeof_3_556,
                  },
                ],
              },
            ]"
            :placeholder="translation.Numbeof_3_556"
          />
        </a-form-item>
      </a-col>   
      <a-col :span="12">
        <a-form-item
          label="Suite:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input /> </a-form-item
      ></a-col>
      <a-col :span="12">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 21 }"
        style="padding-top:30px"    
      >
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :custom-text="translation['Save&_3_453']"
        />
      </a-form-item>
      </a-col>      
    </a-row>
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import withCrud from '~/mixins/with-crud'
import { filterOption } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import RoleServices from '~/services/API/RoleServices'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  mixins: [withCrud],

  data() {
    return {
      entity: {},
      entityId: null,
      userRoleId: 0,
      loading: false,
      countries: [],
      roles: [],
      // isCreated:true,
      fetchCountry: true,
      fetchRole: true,
      formLayout: 'vertical',
      apiService: UserServices,
      allowedExtensions: DOCUMENT_EXTENSIONS,
      newSelected: false,
      defaultImage: true,
    }
  },
  mounted() {
    this.getCountries()
    this.getRoles()
  },
  updated() {
    if (this.isCreated && this.fetchCountry) {
      this.fetchCountry = false
      this.getCountries()
    }
    if (this.isCreated && this.fetchRole) {
      this.fetchRole = false
      this.getRoles()
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    handleChange(info) {
      this.newSelected = true
      this.defaultImage = false
      this.fileList = info
      this.$emit('handleChange', this.fileList)
    },
    filterOption,
    disabledDate: _disabledFutureDate,
    fetchCountries(params = {}) {
      CountryServices.get(params).then((response) => {
        this.countries = response.data.data
      })
    },
    fetchRoles(params = {}) {
      RoleServices.get(params).then((response) => {
        this.roles = response.data
      })
    },
    getCountries() {
      if (this.isCreated) {
        this.fetchCountries({ Ids: [this.entity.coutryId] })
      } else {
        this.fetchCountries()
      }
    },
    getRoles() {
      if (this.isCreated) {
        // alert(this.entity.userRoleId)
        // this.userRoleId=this.entity.userRoleId
        this.fetchRoles({ Ids: [this.entity.roleId] })
      } else {
        this.fetchRoles()
      }
    },
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
    searchRoles(name, b) {
      this.fetchRoles({ name })
    },
  },
}
</script>
