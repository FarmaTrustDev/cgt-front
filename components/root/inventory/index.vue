<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Germany - Cellfuse ">
        <div>
          Germany - Cellfuse

          <a-row>
            <a-col :span="12"
              >Volmersbachstr. 66 D-55743 Idar-Oberstein Germany</a-col
            >
            <a-col :span="12">+49 6781 9855-0</a-col>
            <a-col :span="12">Head of Lab- Stephen Jones</a-col>
            <a-col :span="12">info-imfs@cellfuse.de</a-col>
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
