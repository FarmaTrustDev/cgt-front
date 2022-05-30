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
          label="Group Name:"
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
  </div>
</template>

<script>
import Upload from '~/components/upload/profile'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
  data() {
    return { allowedExtensions: DOCUMENT_EXTENSIONS }
  },
  methods: {
    getImage(files) {
      console.log(files)
    },
  },
}
</script>
