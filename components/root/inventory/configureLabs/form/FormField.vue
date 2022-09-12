<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.Lab_1_566+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'firstName',
              {
                initialValue: entity.firstName,
                rules: [
                  {
                    required: true,
                    message: translation.Lab_1_566,
                  },
                ],
              },
            ]"
            :placeholder="translation.Lab_1_566"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation['EmailAddre_2_140']+'*:'"
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
                    message: translation['EmailAddre_2_140'],
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation['EmailAddre_2_140']"
          /> </a-form-item
      ></a-col>
      
      <a-col :span="12">
        <a-form-item
          :label="translation.Postc_1_444"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'postcode',
              {
                initialValue: entity.postCode,
                rules: [
                  {
                    required: true,
                    message: translation.Postc_1_444,
                  },
                ],
              },
            ]"
            :placeholder="translation.Postc_1_444"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.ContaNumbe_2_404"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'contact',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: true,
                    message: translation.ContaNumbe_2_404,
                  },
                ],
              },
            ]"
            :placeholder="translation.ContaNumbe_2_404"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.PostaAddre_2_450"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              },
            ]"
            placeholder=""
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.City_1_446"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: true,
                    message: translation.City_1_446,
                  },
                ],
              },
            ]"
            :placeholder="translation.City_1_446"
          />
        </a-form-item>
      </a-col>   
      <a-col :span="12">
        <a-form-item
          :label="translation.Locat_1_448+':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'location',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: true,
                    message: translation.Locat_1_448,
                  },
                ],
              },
            ]"

            :placeholder="translation.Locat_1_448"
          /> </a-form-item
      ></a-col>         
      <a-col :span="12">
        <a-form-item
          :label="translation.Count_1_657"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'countryId',
              {
                initialValue: entity.countryId,
                rules: [
                  {
                    required: true,
                    message: translation.Count_1_657,
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Count_1_657"
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
      <a-col :span="24">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 22 }"      
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
