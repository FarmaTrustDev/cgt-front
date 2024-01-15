<template>
  <div>
    <a-form-item :label="translation.ProceStep_2_486">
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: translation.ProceStep_2_486 }],
            initialValue: collection.name,
          },
        ]"
        size="large"
        :placeholder="translation.EnterProce_3_1149"
      />

      <a-input
        v-decorator="[
          'treatmentTypeId',
          {
            rules: [
              {
                required: true,
                message: translation.EnterProce_3_1149,
              },
            ],
            initialValue: treatmentType.id,
          },
        ]"
        type="hidden"
      />
     
      <a-input
        v-decorator="[
          'type',
          {
            rules: [
              {
                required: true,
                message: 'Please input your treatmentTypeId!',
              },
            ],
            initialValue: collectionType,
          },
        ]"
        type="hidden"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  props: {
    treatmentType: {
      type: Object,
      default: () => {
        return {}
      },
    },
    collection: {
      type: Object,
      default: () => {
        return {}
      },
    },
    collectionType: {
      type: Number,
      require: true,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
