<template>
  <div class="grey-card enrollment-page schedule-create-tabs">
    <a-card :bordered="false" class="default-border-radius pt-0">
      <a-skeleton :loading="loading" class="green-on-update">
        <a-tabs
          tab-position="left"
          :active-key="activeTab"
          @change="tabChange"
        >
          <a-tab-pane :key="1" class="m-3" >
            <div slot="tab" class="tab-title main ant-tabs-tab-completed">
              {{ translation['Detai_1_346'] }}
            </div>
            <Form :treatment="treatment" @getEntity="getEntity" @getNextTab = getNextTab />
          </a-tab-pane>
          <a-tab-pane :key="2" :disabled="!isCreated" class="m-3">
            <div slot="tab" class="tab-title main ant-tabs-tab-completed">
              {{ translation['Avail_1_450'] }}
            </div>
            <Availability  :manufacturer-treatment="entity" />
          </a-tab-pane>
        </a-tabs>
      </a-skeleton>
    </a-card>
  </div>
</template>

<script>
import Form from '~/components/root/manufacturer/scheduling/Form'
// import Calendar from '~/components/root/manufacturer/scheduling/Calendar'
import Availability from '~/components/root/manufacturer/scheduling/Availability'
export default {
  components: {
    Form,
    Availability,
  },
  data() {
    return {
      activeTab: 1,
      treatment: {},
      entity: {},
      isCreated: false,
      loading: false,
    }
  },
  mounted() {
    // this.isTreatmentCreate()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    getEntity(entity) {
      // eneity yahen fetch kar k childs ko pass karni hai
      this.entity = entity
      this.isCreated = true
    },
    getNextTab(key)
    {
      this.tabChange(key)
    },
    tabChange(key) {
      this.activeTab = key
    },
  },
}
</script>
