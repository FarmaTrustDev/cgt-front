<template>
  <div class="clearfix">
    <a-upload
      :before-upload="beforeUpload"
      :default-file-list="defaultFileList"
      list-type="picture"
      name="file"
      :action="handleChange"
      :disabled="disabled"
    >
      <div v-if="stateFileList.length < 3">
        <a-icon type="camera" theme="filled" style="font-size: 3.75rem" />
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" />
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    extensions: {
      default: () => [],
      type: Array,
    },
    defaultFileList: {
      default: () => [],
      type: Array,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      stateFileList: [],
      previewVisible: false,
    }
  },
  methods: {
    beforeUpload(file) {
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
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
    handleCancel() {
      this.previewVisible = false
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
