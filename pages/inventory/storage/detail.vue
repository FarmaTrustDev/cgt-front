<template>
  <div class="mt-15">
    <div class="mb-15 mt-15">
      <h2 class="color-black">
        {{ data.countryName }}
        <img height="25" width="40" :src="getImageUrl(data.flag)" />
      </h2>
    </div>
    <a-row :gutter="16">
      <a-col :span="12" class="icon-col"
        ><a-icon type="pushpin" theme="filled" /> {{ data.address }}</a-col
      >
      <a-col :span="12" class="icon-col">
        <a-icon type="phone" theme="filled" /> {{ data.phone }}
        </a-col>
      <a-col :span="12" class="color-black mt-15 icon-col"
        ><a-icon type="global" />{{ data.global }}
      </a-col>
      <a-col :span="12" class="color-black mt-15 icon-col"
        ><strong>@</strong> {{ data.email }}</a-col
      >
    </a-row>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  /*  props: {        // This has been changed for localization purpose because the data was not being passed by the calling component
    data: {
      type: Object,
      default: () => ({
        countryName: 'Germany - Cellfuse',
        address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
        flag: 'web/flags/de.svg',
        global: 'Head of Lab - Stephen Jones',
        phone: '49 6781 9855-0',
        email: 'info-imfs@cellfuse.de',
      }),
    },
  }, */
  data() {
    return {
      data: {
        countryName: 'Germany - Cellfuse',
        address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
        flag: 'web/flags/de.svg',
        global: '',
        phone: '49 6781 9855-0',
        email: 'info-imfs@cellfuse.de',
      }
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },    
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.data.global=newValues.Headof_3_549 + '- Stephen Jones'
      }
    }
  },   
  mounted() {
    this.getTranslationData()
  },
  methods: {
    getTranslationData(){
      this.data.global=this.translation.Headof_3_549 + '- Stephen Jones'
    }
  },    
}
</script>
<style lang="scss" scoped>
.icon-col {
  .anticon {
    padding-right: 5px;
  }
}
</style>
