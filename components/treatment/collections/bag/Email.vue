<template>
  <div>
    <a-form :form="form" @submit="onSubmit">
      <a-form-item :label="translation['Users_1_504']">
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
          :placeholder="translation.SelecEmail_2_478"
        >
          <a-select-option v-for="user in users" :key="user.email">
            {{ user.email }}
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
        <a-input
          v-decorator="[
            `subject`,
            {
              initialValue: camelCaseConversion(user.organizationTypeAlias) + ' Screening Results',
            },
          ]"
          type="hidden"
        />
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
import UserServices from '~/services/API/UserServices'
export default {
  components: {},
  mixins: [notifications],
  props: {
    content: { type: Object, default: () => ({}) },
    bagId: { type: String, default: '' },
  },
  data() {
    return {
      emails: [],
      loading: false,
      form: this.$form.createForm(this, {
        name: 'collectionEmail',
      }),
      users: [],
      organizationType: '',
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },    
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    camelCaseConversion(str) {
    return str.charAt(0).toUpperCase() +
               str.slice(1).toLowerCase();
      },
    fetchUser() {
      UserServices.getByBagId(this.bagId).then((response) => {
        this.users = response.data
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.loading = true

      this.form.validateFieldsAndScroll((err, values) => {
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
