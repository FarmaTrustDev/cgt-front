import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/label`

function hospital(data) {
  return request({
    url: `${baseApi}/hospital`,
    data,
  })
}
const LabelServices = {
  hospital,
}

export default LabelServices
