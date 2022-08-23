<template>
  <div class="inventory-page">
    <a-row>
      <a-col :span="24">
        <a-tabs
          :animated="false"
          class="h-tabs no-border-bottom"
          :default-active-key="1"
          @change="callback"
        >
          <a-tab-pane v-for="d in data" :key="d.id">
            <template slot="tab">
              <span class="flag-title">
                <img width="40" :src="getImageUrl(d.flag)" />{{ d.title }}</span
              >
            </template>
            <tab :data="d" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import tab from '~/components/root/inventory/tab'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { tab },
  mixins: [imagesHelper],
  data() {
    return {
      data: [
        {
          id: 1,
          title: 'Germany - Cellfuse',
          flag: 'web/flags/de.svg',
          description: {
            countryName: 'Germany - Cellfuse',
            address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
            flag: 'web/flags/de.svg',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Stephen Jones',
            phone: '49 6781 9855-0',
            email: 'info-imfs@cellfuse.de',
          },
        },
        {
          id: 2,
          title: 'Vienna - Cellfuse R&D ',
          flag: 'web/flags/at.svg',
          description: {
            countryName: 'Vienna - Cellfuse R&D ',
            address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Stephen Jones',
            flag: 'web/flags/at.svg',
            phone: '49 6781 9855-0',
            email: 'info-imfs@cellfuse.de',
          },
        },
        {
          id: 3,
          title: 'Gaithersburg USA - Cellfuse US ',
          flag: 'web/flags/us.svg',

          description: {
            countryName: 'Gaithersburg USA - Cellfuse US ',
            address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
            flag: 'web/flags/us.svg',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Stephen Jones',
            phone: '49 6781 9855-0',
            email: 'info-imfs@cellfuse.de',
          },
        },
        {
          id: 4,
          title: 'Cambridge USA - Cellfuse US',
          flag: 'web/flags/us.svg',
          description: {
            countryName: 'Cambridge USA - Cellfuse US',
            address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Stephen Jones',
            flag: 'web/flags/us.svg',
            phone: '49 6781 9855-0',
            email: 'info-imfs@cellfuse.de',
          },
        },
      ],
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
        this.data[0].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
        this.data[1].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
        this.data[2].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
        this.data[3].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
      }
    }
  },     
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
