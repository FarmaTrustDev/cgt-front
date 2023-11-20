<template>
  <div class="inventory-page">
    <a-row>
      <a-col :span="24">
        <a-tabs
          :animated="false"
          class="h-tabs no-border-bottom"
          style="margin-top: -30px;"
          :default-active-key="1"
          @change="callback"
        >
          <a-tab-pane v-for="d in data" :key="d.id">
            <template slot="tab">
              <span class="flag-title">
                <img width="40" :src="getImageUrl(d.flag)" />{{ d.title }}</span
              >
            </template>
            <kit :data="d" />
            <tab :data="d" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import tab from '~/components/root/inventory/tab'
import kit from '~/components/root/inventory/kit'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { tab, kit },
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
            address: 'Leberstraße 20 1110 Vienna Austria',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Marie DÖPFER',
            flag: 'web/flags/at.svg',
            phone: '+49 6781 9855-0',
            email: 'info-imfs@cellfuse.at',
          },
        },
        {
          id: 3,
          title: 'Gaithersburg USA - Cellfuse US ',
          flag: 'web/flags/us.svg',

          description: {
            countryName: 'Gaithersburg USA - Cellfuse US ',
            address: 'Gaithersburg 930 Clopper Rd Gaithersburg, MD 20878 USA',
            flag: 'web/flags/us.svg',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Bob MacLean',
            phone: '(617) 337-4701',
            email: 'info-imfs@cellfuse.us',
          },
        },
        {
          id: 4,
          title: 'Cambridge USA - Cellfuse US',
          flag: 'web/flags/us.svg',
          description: {
            countryName: 'Cambridge USA - Cellfuse US',
            address: 'San Diego 40 Erie Street, Suite 110 Cambridge, MA 02139 USA',
            global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Laura Shilling',
            flag: 'web/flags/us.svg',
            phone: '(617) 337-4701',
            email: 'info-imfs@cellfuse.us',
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
