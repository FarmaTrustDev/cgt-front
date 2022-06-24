<template>
  <div>
    <div class="mb-15 ml-10">
      <h2 class="color-black">
        {{ data.countryName }}
        <img height="25" width="40" :src="getImageUrl(data.flag)" />
      </h2>
    </div>
    <a-row :gutter="16">
      <a-col :span="11" class="icon-col"
        ><a-icon type="pushpin" theme="filled" /> {{ data.address }}</a-col
      >
      <a-col :span="11" class="icon-col">
        <a-icon type="phone" theme="filled" /> {{ data.phone }}
      </a-col>
      <a-col :span="11" class="color-black icon-col"
        ><a-icon type="global" />{{ data.global }}
      </a-col>
      <a-col class="color-black icon-col" :span="11"
        ><strong>@</strong> {{ data.email }}</a-col
      >
    </a-row>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    data: {
      type: Object,
      default: () => ({
        countryName: 'Germany - Cellfuse',
        address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
        flag: 'web/flags/de.svg',
        global: ' Head of Lab- Stephen Jones',
        phone: '49 6781 9855-0',
        email: 'info-imfs@cellfuse.de',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-col {
  padding: 15px;
  .anticon {
    padding-right: 5px;
  }
}
</style>
