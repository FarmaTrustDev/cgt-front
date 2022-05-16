<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="First Name"
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
                    message: 'Please input your First Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your First Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Last Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Please input your Last Name"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Email"
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
                    message: 'Please input your Email',
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            placeholder="Please input your Email"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="User Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Please input your UserName"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="Office Address"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Office Address',
                  },
                ],
              },
            ]"
            placeholder="Please input your Office Address"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Role"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Select Role"
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
                initialValue: entity.userRoleId== undefined ? 0 : entity.userRoleId ,
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
          label="Contact Number"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Please input your Contact Number"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="What3Words"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'What3Words',
              {
                initialValue: entity.What3Words,
                rules: [
                  {
                    required: true,
                    message: 'Please input your What3Words',
                  },
                ],
              },
            ]"
            placeholder="Please input your What3Words"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Department"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Please input your Department"
          />
        </a-form-item>
      </a-col>
            <a-col :span="12">
        <a-form-item
          label="Image"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
      <Upload
        :default-file-list="entity.profileImageUrl"
        :extensions="allowedExtensions"
        @handleChange="handleChange"
      />
      <span v-if="entity.profileImageUrl && !newSelected"><img :src="entity.profileImageUrl['name']" width="60px" height="60px"/>{{entity.profileImageUrl['name']}}</span>
      </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Post Code"
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
                    message: 'Please input your Postcode',
                  },
                ],
              },
            ]"
            placeholder="Please input your Postcode"
          />
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item
          label="Location"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'location',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Location',
                  },
                ],
              },
            ]"
            placeholder="Please input your Location"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Postal Address"
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
                    message: 'Please input your Postal Address',
                  },
                ],
              },
            ]"
            placeholder="Please input your Postal Address"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="County"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
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
            placeholder="Please input your County"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Country"
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
import UserServices from '~/services/API/UserServices'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import withCrud from '~/mixins/with-crud'
import { filterOption } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import RoleServices from '~/services/API/RoleServices'
import Upload from '~/components/upload'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
  mixins: [withCrud],
  
  data() {
    return {
      entity:{},
      entityId: null,
      userRoleId:0,
      loading: false,
      countries: [],
      roles: [],
      // isCreated:true,
      fetchCountry: true,
      fetchRole: true,
      formLayout: 'vertical',
      apiService: UserServices,
      allowedExtensions: DOCUMENT_EXTENSIONS,
      newSelected:false,
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
  methods: {
    handleChange(info) {
      this.newSelected=true
      this.fileList = info
      this.$emit('handleChange',this.fileList)
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
