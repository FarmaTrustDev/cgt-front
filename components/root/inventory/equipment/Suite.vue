<template>
  <div>
    <a-card :bordered="null" class="default-border-radius shadow">
      <a-tabs>
        <a-tab-pane key="1" :tab="translation.ClassB_3_572">
          <ImageHeading
            v-for="(c, index) in classB"
            :key="index"
            :detail="c"
            :img-properties="{ width: '50px', height: '50px' }"
          />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="translation.ClassC_3_570">
          <ImageHeading class="mt-15" :detail="{ img: '', heading: '' }"
        /></a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
export default {
  components: { ImageHeading },
  data() {
    return {
      classB: [
        {
          img: 'web/inventory/Group-1000002120.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
