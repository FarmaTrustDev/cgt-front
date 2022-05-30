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
    <a-row v-for="org in organizationKeys" :key="org.id">
      <a-col :span="11">
        <a-form-item
          label="Organizations Type:"
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
            placeholder="Organizations Type"
          /> </a-form-item
      ></a-col>
      <a-col :span="11">
        <a-form-item
          label="Organizations:"
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
            placeholder="Organizations"
          /> </a-form-item
      ></a-col>
      <a-col :span="2">
        <a-button type="danger" @click="removeRow(org.id)"
          >-</a-button
        ></a-col
      >
    </a-row>
  </div>
</template>

<script>
import Upload from '~/components/upload/profile'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
  data() {
    return {
      allowedExtensions: DOCUMENT_EXTENSIONS,
      currentId: 0,
      organizationKeys: [],
    }
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
      console.log(this.organizationKeys)
    },
    removeRow(id) {
      const org = this.organizationKeys
      this.organizationKeys = org.filter((o) => o.id !== id)
    },
  },
}
</script>
