<template>
  <div>
    <a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            :label="translation.Image_1_438"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
            class="pb-0"
          >
            <Upload
              v-decorator="[
                'profileImageUrl',
                {
                  initialValue: entity.profileImageUrl,
                  rules: [
                    {
                      required: imgRequired,
                    },
                  ],
                },
              ]"
              :default-file-list="entity.profileImageUrl"
              :extensions="allowedExtensions"
              @handleChange="handleChange"
            />
            {{translation.requi_1_336}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            :label='organizationName + " " + translation.Name_1_138'
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
                      message: translation.requi_1_336,
                    },
                  ],
                },
              ]"
              :placeholder='organizationName  + " " + translation.Name_1_138'
            /> </a-form-item
        ></a-col>
        <!-- <a-col :span="12">
          <a-form-item
            :label='organizationName + " Alias*"'
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'alias',
                {
                  initialValue: entity.alias,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              :placeholder='organizationName  +" Alias"'
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            :label='organizationName + " User Name*"'
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'userName',
                {
                  initialValue: entity.userName,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              :placeholder='organizationName  +" User Name"'
              :disabled="isCreated"
            /> </a-form-item
        ></a-col> -->
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
                      message: translation.requi_1_336,
                    },
                  ],
                },
              ]"
              :placeholder="translation.ContaNumbe_2_430"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.EmailAddre_2_140"
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
                    message: translation.requi_1_336,
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
          :label='organizationName + " "+ translation.Addre_1_559 '
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
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            :placeholder='organizationName + translation.Addre_1_559'
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label='organizationName + " PUID Prefix"'
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'prefix',
              {
                initialValue: entity.prefix,
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            :placeholder='organizationName + " PUID Prefix"'
            @change="(e)=>getPrefix(e.target.value)"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label='organizationName + " PUID Length*"'
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'length',
              {
                initialValue: entity.length,
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            type="number"
            max="10"
            :placeholder='organizationName + " PUID Length"'
            @change="(e)=>getLength(e.target.value)"
          /> </a-form-item
      ></a-col>
      <a-col  :span="24">
         <a-form-item
         v-if="organizationName === 'Manufacturer'"
         :label="translation.TreatType_2_67"
         >
        <a-select
        v-decorator="[
            'treatmentTypesId',
            {
              initialValue: entity.treatmentTypesId,
              rules: [
                {
                  required: false,
                  message: 'Please select your Hospital!',
                },
              ],
            },
          ]"
          mode="multiple"
          placeholder="Insert treatment type"
          style="width: 100%"
        >
          <!-- :v-model="value" -->

          <!-- @change="handleChange" -->
        <a-select-option v-for="item in treatmentTypes" :key="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
      </a-form-item>
      </a-col>
      <a-col v-if="isCreated" :span="24">
        <a-form-item
          :label='organizationName + " Exisitng Pattern"'
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-input
            v-decorator="[
              'displayPattern',
              {
                initialValue: entity.pattern,
                rules: [
                  {
                    required: false,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            :disabled="true"
          /> 
        </a-form-item>
          <a-form-item>
          <a-input
          v-decorator="[
            `pattern`,
            {
              initialValue: entity.pattern,
            },
          ]"
          type="hidden"
        />
          </a-form-item
      >
      </a-col>
      <a-col :span="1">
        <a-form-item>
          <a-checkbox v-decorator="[`custom`, {initialValue:false}]" @change="getCustom($event)" />
        </a-form-item>
      </a-col>
      <a-col :span="22">
        Choose custom pattern for remaining length (check 'N' for numeric and 'C' for alphabet OR enter custom character in the box. For 12A-2 select NNC-N)
      </a-col>
      <a-col v-for="x in lent-prefix.length>0 ? parseInt(lent) - (!isEmpty(prefix) ? prefix.length : 0) : 0" class="ml-5" style="text-align:center" :key="x" :span="3">
        <a-form-item
          v-if="showCustom"
        >
          <a-switch
            v-decorator="[
              `pattern`+x,
              {
                valuePropName: 'checked',
              },
            ]"
            size="large"
            class="toggle_record"
            checked-children="N"
            un-checked-children="C"
          />
          <a-input v-decorator="[`input`+x]" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Upload from '~/components/upload/profile'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
import nullHelper from '~/mixins/null-helpers'
import OrganizationServices from '~/services/API/OrganizationServices'
import { isEmpty } from '~/services/Utilities'
import TreatmentTypeService from '~/services/API/TreatmentTypeServices'
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
    organizationName:{
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      loading: false,
      allowedExtensions: PICTURE_UPLOAD_EXTENSIONS,
      imgRequired:true,
      reqMessage : 'Required',
      data:'',
      selectedItems: [],
      apiService: OrganizationServices,
      lent:0,
      prefix:'',
      showCustom:false,
      pattern:'',
      treatmentTypes: []
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted(){
    this.fetchTreamentTypes()
    this.isEdit()
    },
    methods: {
      isEdit()
      { 
        const entityId = this.$route.params.id
        if (this.isGuid(entityId))
        {
          this.fetch(entityId)
        }
      },
      fetch(id)
    {
      this.loading = true
      this.apiService.getByGuid(id)
      .then((response)=>{
          this.data = response.data
          this.prefix=this.data.prefix
          this.lent=this.data.length
          this.pattern=this.data.pattern
          if(!isEmpty(response.data.profileImageUrl))
          {
            this.handleChange(response.data.profileImageUrl)
            this.reqMessage = ''
          }
      }).finally(this.loading = false)
    },
    getLength(e){
      this.lent=e
    },
    getPrefix(e){
      this.prefix=e
    },
    getCustom(e){
      if(e.target.checked){
        this.showCustom=true
      }else{
        this.showCustom=false
      }
    },
    handleChange(info) {
      this.fileList = info
      this.imgRequired = false
      this.reqMessage = ''
      this.$emit('handleChange', this.fileList)
    },
    fetchTreamentTypes() {
      TreatmentTypeService.getActive().then((response) => {
        this.treatmentTypes = response.data
      }).finally()
    },
  },
}
</script>
