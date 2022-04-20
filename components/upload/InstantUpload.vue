<template>
  <a-upload
    name="file"
    :multiple="true"
    :action="action"
    :headers="headers"
    :remove="remove"
    :preview="preview"
    :default-file-list="savedList"
    @change="handleChange"
  >
    <a-button> <a-icon type="upload" /> Click to Upload </a-button>
  </a-upload>
</template>
<script>
import { isEmpty } from '~/services/Utilities'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    action: {
      type: String,
      required: true,
    },
    savedList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultList: [],
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  },
  updated(a, b) {
    console.log(a, b)
    // console.log('asd', this.savedList)
    // this.uploadedFiles(this.savedList)
  },
  mounted() {
    this.uploadedFiles(this.savedList)
  },
  methods: {
    uploadedFiles(files) {
      if (!isEmpty(files)) {
        const uploadedFiles = files.map((file) => {
          file.url = this.getImageUrl(file.url)
          return file
        })
        console.log(uploadedFiles)
        this.defaultList = uploadedFiles
      }
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    remove(data) {
      console.log(data)
    },
    preview(data) {
      console.log(data)
    },
  },
}
</script>
