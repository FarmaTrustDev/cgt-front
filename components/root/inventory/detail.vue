<template>
  <div>
    <div class="mb-15">
      <h2 class="color-black">
        Germany - Cellfuse
        <img height="30" width="30" :src="getImageUrl('web/flags/de.svg')" />
      </h2>
    </div>
    <a-row :gutter="16">
      <a-col :span="12"
        ><a-icon type="pushpin" theme="filled" /> Volmersbachstr. 66 D-55743
        Idar-Oberstein Germany</a-col
      >
      <a-col :span="12"
        ><a-icon type="phone" theme="filled" /> +49 6781 9855-0</a-col
      >
      <a-col :span="12" class="color-black mt-15"
        ><a-icon type="global" /> Head of Lab- Stephen Jones</a-col
      >
      <a-col class="color-black mt-15" :span="12"
        ><strong>@</strong> info-imfs@cellfuse.de</a-col
      >
    </a-row>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
}
</script>
