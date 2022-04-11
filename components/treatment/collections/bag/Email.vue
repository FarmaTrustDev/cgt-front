<template>
  <div>
    <a-form :form="form" @submit="onSubmit">
      <a-form-item label="Users">
        <a-select
          v-decorator="[
            'emails',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your last Name',
                },
                {
                  validator: (rule, value, cb) =>
                    validateEmails(rule, value, cb),
                },
              ],
            },
          ]"
          mode="tags"
          style="width: 100%"
          placeholder="Select Email"
        >
          <a-select-option v-for="email in emails" :key="email" value="email">
            {{ email }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Content">
        <a-textarea
          v-decorator="[
            'content',
            {
              initialValue: content.body,
              rules: [
                {
                  required: true,
                  message: 'Please input your content',
                },
              ],
            },
          ]"
        ></a-textarea>
      </a-form-item>
      <a-form-item>
        <FormActionButton :loading="loading" text="Send" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { validateEmail } from '~/services/Helpers/'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import notifications from '~/mixins/notifications'
export default {
  components: {},
  mixins: [notifications],
  props: {
    content: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      emails: [],
      loading: false,
      form: this.$form.createForm(this, {
        name: 'collectionEmail',
      }),
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.loading = true

      this.form.validateFields((err, values) => {
        if (!err) {
          TreatmentBagServices.sendMail('asd', values).then((response) => {
            this.$emit('closeModal', false)
            this.success(response.message)
          })
        } else {
          this.loading = false
        }
      })
    },
    validateEmails(rule, value, callback) {
      try {
        let hasInvalidEmail = false
        value.forEach((element) => {
          if (!validateEmail(element)) {
            hasInvalidEmail = true
          }
        })
        if (hasInvalidEmail) {
          return callback(new Error('Please input the proper email'))
        }
        return callback()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
