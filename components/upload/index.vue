<template>
  <a-upload-dragger
    :before-upload="beforeUpload"
    list-type="picture"
    name="file"
    :action="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </a-upload-dragger>
</template>
<script>
export default {
  props: {
    extensions: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      stateFileList: [],
    }
  },
  methods: {
    beforeUpload(file) {
      const isAllowedExtension = this.extensions.includes(file.type)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Extension not allow')
        return true
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('Extension')
      // }
    },
    async handleChange(file, fileList) {   
      // @todo removing work in under construction
      if (file.status === 'remove') {
        await this.removeFromFileList(file)
      } else {
        await this.addToFileList(file)
      }

      this.$emit('handleChange', this.stateFileList)
    },

    async addToFileList(file) {
      const files = this.stateFileList
      //    files = JSON.stringify(files);
      //    files = JSON.parse(files);

      return await Promise.resolve((this.stateFileList = [...files, file]))
    },
    async removeFromFileList() {},
  },
}
</script>
