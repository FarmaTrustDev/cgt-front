import { isEmpty } from '~/services/Helpers'

const placement = 'bottomLeft'
export default {
  methods: {
    success(description, message = 'Success') {
      return this.$notification.open({
        message,
        description,
        placement,
        // icon: (
        //   <a-icon
        //     type="check-circle"
        //     theme="twoTone"
        //     two-tone-color="#52c41a"
        //   />
        // ),
      })
    },
    error(err) {
      const genericError = err.response.data.errors

      let description = ''
      if (!isEmpty(genericError)) {
        for (const key in genericError) {
          description += `${genericError[key][0]},`
        }
      }
      const genericException = err.response.data
      if (!isEmpty(genericException)) {
        description = genericException.message
      }

      this.$notification.open({
        message: `Error`,
        description,
        placement,
        class: 'error-notification',
        // icon: (
        //   <a-icon
        //     type="close-circle"
        //     theme="twoTone"
        //     two-tone-color="#f5222d"
        //   />
        // ),
      })
    },
  },
}
