<template>
  <div class="clearfix">
    <a-upload
      :before-upload="beforeUpload"
      listType="picture-card"
      :fileList="isChanged ? fileList : defaultFileList"
      name="file"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="isChanged ? fileList.length<1 : defaultFileList.length<1">
        <a-icon type="camera" />
        <div class="ant-upload-text">{{translation.Uploa_1_984}}</div>
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
      fileList:[],
      isChanged:false,
      extensionAllowed:true
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted(){
    this.fileList=this.defaultFileList
  },
  methods: {
    beforeUpload(file) {
      console.log('BeforeUpload')
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Extension not allow')
        this.fileList=[]
      }
      this.extensionAllowed=isAllowedExtension
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },

    /* handleChange(file) {
      // console.log(file)
      this.isChanged=true
      // this.fileList=file
      // @todo removing work in under construction
      this.fileList = file
      this.$emit('handleChange', file)
    }, */ 
    handleChange ({ fileList }) {
      if(this.extensionAllowed===true){
        this.isChanged=true
        this.fileList = fileList
        this.$emit('handleChange', this.fileList)
      }
    },
  },
}
</script>
