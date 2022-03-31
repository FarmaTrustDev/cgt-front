<template>
  <div>
    <a-row>
      <a-col :span="24" class="plr-10">
        <a-form-item label="Notes" class="pb-0">
          <a-textarea
            v-decorator="[
              'notes',
              {
                initialValue: entity.notes,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          ></a-textarea> 
          <a-input
            v-decorator="[
              'treatmentId',
              {
                initialValue: treatment.id,
                rules: [
                  {
                    required: false,
                    message: 'Please input your First Name',
                  },
                ],
              },
            ]"
            type="hidden"
          />
          </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      manufacturerName: null,
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'AfterCareNotes',
      }),
    }
  },
  methods: { 
    onSubmit(e) {} 
    },
}
</script>
