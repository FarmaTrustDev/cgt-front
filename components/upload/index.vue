<template>
  <a-upload-dragger list-type="picture" name="file" :action="handleChange">
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
  data() {
    return {
      stateFileList: [],
    }
  },
  methods: {
    async handleChange(file, fileList) {
      console.log(file)
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
