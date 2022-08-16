<template>
  <a-upload-dragger
    :before-upload="beforeUpload"
    :default-file-list="defaultFileList"
     list-type="picture-card"
    name="file"
    @action="handleChange"
    :disabled="disabled"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="camera" theme="filled" />
    </p>
    <p class="ant-upload-text">{{translation.Clickor_9_466}}</p>
    <p class="ant-upload-hint">
      {{translation.Suppofor_17_467}}
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
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
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
