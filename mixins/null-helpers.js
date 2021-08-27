import { isEmpty } from '~/services/Helpers'
export default {
  methods: {
    created(values) {
      return !isEmpty(values)
    },
    isEmpty,
  },
}
