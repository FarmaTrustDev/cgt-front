<template>
  <a-row :gutter="18" class="mt-15">
    <a-col>
      <a-card :bordered="false" class="default-card">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="Hospital"
            ><Timeline
              :bag="bag"
              :treatment="treatment"
              :step-type-id="1"
              step="Timeline"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Logistics"> </a-tab-pane>
          <a-tab-pane key="3" tab="Manufacturer"> </a-tab-pane>
          <a-tab-pane key="4" tab="Logistics"> </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import Timeline from '~/components/treatment/view/Timeline'
export default {
  components: { Timeline },
  props: {
    treatment: { required: true, type: Object },
    bag: { required: true, type: Object },
  },
  mounted() {},
  methods: {
    fetchSteps() {},
  },
}
</script>
