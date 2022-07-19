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
                initialValue: entity.firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your First Name',
                  },
                ],
              },
            ]"
            :placeholder="translation.FirstName_2_420"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.LastName_2_422+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'lastName',
              {
                initialValue: entity.lastName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your last Name',
                  },
                ],
              },
            ]"
            :placeholder="translation.LastName_2_422"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.EmailAddre_2_140+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: entity.email,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Email',
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation.EmailAddre_2_140"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Usern_1_400+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                initialValue: entity.userName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your UserName',
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation.Usern_1_400"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.OfficAddre_2_428"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: false,
                    message: 'Please input your Office Address',
                  },
                ],
              },
            ]"
            :placeholder="translation.OfficAddre_2_428"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.ContaNumbe_2_430"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: entity.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Contact Number',
                  },
                ],
              },
            ]"
            :placeholder="translation.ContaNumbe_2_430"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.What3_1_432+':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'what3Words',
              {
                initialValue: entity.what3Words,
                rules: [
                  {
                    required: false,
                    message: 'Please input your What3Words',
                  },
                ],
              },
            ]"
            :placeholder="translation.What3_1_432"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Apply*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'department',
              {
                initialValue: entity.department,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Department',
                  },
                ],
              },
            ]"
            placeholder="Department"
          />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item
          label="Image:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <Upload
        :default-file-list="entity.profileImageUrl"
        :extensions="allowedExtensions"
        @handleChange="handleChange"
          />
        </a-form-item>
           </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.Roles_1_442+'*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-select
            v-decorator="[
              'roleId',
              {
                initialValue: entity.roleId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your role!',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Roles_1_442"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="role in roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-decorator="[
              'userRoleId',
              {
                initialValue:
                  entity.userRoleId == undefined ? 0 : entity.userRoleId,
                rules: [
                  {
                    required: false,
                    message: 'Please input your First Name',
                  },
                ],
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col>      
      <a-col :span="12">
        <a-form-item
          :label="translation.Postc_1_444+':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'postcode',
              {
                initialValue: entity.postCode,
                rules: [
                  {
                    required: false,
                    message: 'Please input your Postcode',
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
          label="City*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'city',
              {
                initialValue: entity.city,
                rules: [
                  {
                    required: true,
                    message: 'Please input your City',
                  },
                ],
              },
            ]"
            placeholder="City"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.Locat_1_448+':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'location',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: false,
                    message: 'Please input your Location',
                  },
                ],
              },
            ]"
            :placeholder="translation.Locat_1_448"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.PostaAddre_2_450+':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: false,
                    message: 'Please input your Postal Address',
                  },
                ],
              },
            ]"
            :placeholder="translation.PostaAddre_2_450"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="County*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'County',
              {
                initialValue: entity.county,
                rules: [
                  {
                    required: true,
                    message: 'Please input your County',
                  },
                ],
              },
            ]"
            :placeholder="translation.Count_1_452"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Country*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'countryId',
              {
                initialValue: entity.country,
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
            :placeholder="translation.Count_1_49"
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
import UserServices from '~/services/API/UserServices'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import withCrud from '~/mixins/with-crud'
import { filterOption } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import RoleServices from '~/services/API/RoleServices'
import Upload from '~/components/upload/userUpload'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
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
      // defaultFIleList:{uid:null, name:'https://cgt-dev-ft.microsysx.com/uploads/Chat-Group/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg', status:null, response: null, url: 'https://cgt-dev-ft.microsysx.com/uploads/Chat-Group/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg'},
    }
  },
  mounted() {
    this.updated()
    // this.getRoles()
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
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
    handleChange(info) {
      console.log(info)
      this.fileList = info
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
