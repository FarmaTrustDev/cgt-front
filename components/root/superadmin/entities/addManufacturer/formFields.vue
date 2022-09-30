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
            label="Manufacturer Name*"
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
                      message: 'Please input Name',
                    },
                  ],
                },
              ]"
              placeholder="Manufacturer Name"
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
                      message: 'Please Input Contact Number',
                    },
                  ],
                },
              ]"
              type="number"
              placeholder="Contact Number"
            />
          </a-form-item>
        </a-col>

        <!-- @focusout="validateEmail" -->
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
                initialValue: entity.email,
                rules: [
                  {
                    required: true,
                    message: 'Please input Email',
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
          label="Manufacturer Address*"
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
                    message: 'Please input your Address',
                  },
                ],
              },
            ]"
            placeholder="Manufacturer Address"
          /> </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>
<script>
import Upload from '~/components/upload/profile'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
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
  methods: {
    handleChange(info) {
      this.fileList = info
      this.$emit('handleChange', this.fileList)
    },
  },
}
</script>
