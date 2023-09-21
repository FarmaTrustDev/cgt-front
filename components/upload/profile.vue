<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      :showPreviewIcon="true"
      :action="handleChange"
      @change="handleChange"
      >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Helpers'
export default {
  props: {
    extensions: { type: Array, default: () => [] },
    defaultFileList: { type: Array, default: () => [] },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      previewImage: '',
      fileList: [],
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.fileList = val
        }
      },
    },
  },
  mounted() {
    this.fileList = this.defaultFileList
  },
  methods: {
    isEmpty,
    // handleCancel() {
    //   this.previewVisible = false
    // },
    beforeUpload(file) {
      if (this.isExtensionAllow(file)) {
        this.$emit('handleChange', [file])
        this.fileList = [file]
      }
    },
    handleChange(file, fileList) {
      // this.$emit('handleChange', [file])
      // this.fileList = [fileList]
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('handleChange', this.fileList)
    },
    isExtensionAllow(file) {
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Extension not allow')
        this.fileList = []
        return true
      }
      this.extensionAllowed = isAllowedExtension
      return isAllowedExtension
    },
  },
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 2rem;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
