<template>
  <div class="clearfix">
    <a-upload
      :before-upload="beforeUpload"
      listType="picture-card"
      :fileList="isChanged ? fileList : defaultFileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="isChanged || fileList.length==0">
        <a-icon type="camera" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
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
      previewVisible: false,
      previewImage: '',
      fileList:[{status: 'done',uid: 'https://cgt-dev-ft.microsysx.com/uploads/Chat-Group/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg', name: 'https://cgt-dev-ft.microsysx.com/uploads/Chat-Group/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg', url:'https://cgt-dev-ft.microsysx.com/uploads/Chat-Group/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg'}],
      isChanged:false,
    }
  },
  mounted(){
    this.fileList=this.defaultFileList
  },
  methods: {
    beforeUpload(file) {
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Extension not allow')
        this.fileList=[]
        return true
      }
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.isChanged=true
      this.fileList = fileList
    },
  },
}
</script>
