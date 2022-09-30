<template>
  <div>
    <a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="Image:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
            class="pb-0"
          >
            <Upload
              :default-file-list="entity.profileImageUrl"
              :extensions="allowedExtensions"
              @handleChange="handleChange"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="Logistic Name*"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entity.name,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              placeholder="Logistic name"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            :label="translation.ContaNumbe_2_430"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
            class="pb-0"
          >
            <a-input
              v-decorator="[
                'phone',
                {
                  initialValue: entity.phone,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              type="number"
              placeholder="Contact Number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.EmailAddre_2_140 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue : entity.email,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            type="email"
            :placeholder="translation.EmailAddre_2_140"
            :disabled="isCreated"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Logistic Address*"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: false,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="Logistic address"
          /> </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>
<script>
import Upload from '~/components/upload/profile'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
import nullHelper from '~/mixins/null-helpers'
export default {
  components: { Upload },
  mixins:[nullHelper],
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      allowedExtensions: PICTURE_UPLOAD_EXTENSIONS,
    }
  },
  
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted(){
  },
    methods: {
    handleChange(info) {
      this.fileList = info
      this.$emit('handleChange', this.fileList)
    },
  },
}
</script>
