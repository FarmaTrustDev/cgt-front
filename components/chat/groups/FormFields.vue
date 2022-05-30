<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-form-item
          label="Group Name:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'Name',
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            placeholder="Group Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          label="Group Image:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <Upload
            :default-file-list="[]"
            :extensions="allowedExtensions"
            @handleChange="getImage"
        /></a-form-item>
      </a-col>
    </a-row>
    <a-row class="mb-15">
      <a-col :span="24">
        <a-button type="primary" @click="addRow">+ Add Organizations</a-button>
      </a-col>
    </a-row>
    <a-row :gutter="16" v-for="org in organizationKeys" :key="org.id">
      <a-col :span="11">
        <a-form-item
          label="Organizations Type:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'organizationType',
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            class="w-100"
          >
            <a-select-option
              v-for="orgType in organizationTypes"
              :key="orgType.id"
              >{{ orgType.name }}</a-select-option
            >
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="11">
        <a-form-item
          label="Organizations:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'organization',
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            class="w-100"
          >
            <a-select-option
              v-for="orgType in organizationTypes"
              :key="orgType.id"
              >{{ orgType.name }}</a-select-option
            >
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="2">
        <a-button type="danger" @click="removeRow(org.id)">-</a-button></a-col
      >
    </a-row>
  </div>
</template>

<script>
import Upload from '~/components/upload/profile'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
export default {
  components: { Upload },
  data() {
    return {
      allowedExtensions: DOCUMENT_EXTENSIONS,
      currentId: 0,
      organizationKeys: [],
      organizationTypes: [],
    }
  },
  mounted() {
    this.fetchOrganization()
  },
  methods: {
    getImage(files) {
      console.log(files)
    },
    generateUuid() {
      this.currentId = this.currentId + 1

      return `uuid-${this.currentId}`
    },
    addRow() {
      this.organizationKeys = [
        ...this.organizationKeys,
        { id: this.generateUuid() },
      ]
    },
    removeRow(id) {
      const org = this.organizationKeys
      this.organizationKeys = org.filter((o) => o.id !== id)
    },
    fetchOrganization() {
      OrganizationTypeServices.get({ withOrganization: true }).then(
        (response) => {
          this.organizationTypes = response.data
        }
      )
    },
  },
}
</script>
