import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
export default {
  mixins: [routeHelpers, nullHelper, notifications],
  props: {
    // loading: {
    //   type: Boolean,
    //   default: false,
    // },
    // service: { type: Object, default: () => {}, required: true },
  },
  data() {
    return {
      entityId: null,
      isCreated: false,
      entity: {},
      loading: false,
      btnLoading: false,
      formLayout: 'vertical',
      fetchIdFromParams: true,
      // afterUpdate: null,
      // afterCreate: null,
    }
  },
  mounted() {
    if (this.fetchIdFromParams) {
      this.checkCreated()
    }
  },
  methods: {
    checkCreated() {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        this.fetch(entityId)
      }
    },
    upsert(values) {
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    fetch(id) {
      this.loading = true
      this.apiService
        .getById(id)
        .then((response) => {
          this.entity = response.data
        })
        .finally(() => (this.loading = false))
    },
    create(values) {
      this.apiService.create(values).then((response) => {
        this.success(response.message)
        if (!this.isEmpty(this.gotoLink)) {
          this.goto(`${this.gotoLink}/${response.data.globalId}`)
        }
        if (this.isFunction(this.afterCreate)) {
          this.afterCreate(response)
        }
      })
    },
    update(values) {
      this.btnLoading = true
      this.apiService
        .update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          if (this.isFunction(this.afterUpdate)) {
            this.afterUpdate(response)
          }
        })
        .catch(this.error)
        .finally(() => (this.btnLoading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.upsert(values)
        } else {
          this.loading = false
        }
      })
    },
    onDelete(e) {
      console.log('Delete', e)
    },
  },
}
