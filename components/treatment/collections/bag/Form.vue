<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <FormFields :treatment="treatment" />
        <a-form-item>
          <FormActionButton />
          <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>
<script>
import FormFields from '~/components/treatment/collections/bag/FormField'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import withCrud from '~/mixins/with-crud'
export default {
  components: { FormFields },
  mixins: [withCrud],
  props: { treatment: { required: true, type: Object } },
  data() {
    return {
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCreate',
      }),
      apiService: TreatmentBagServices,
      fetchIdFromParams: false,
    }
  },
  mounted() {},
  methods: {},
}
</script>
