import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/label`

function hospital(data) {
  return request({
    url: `${baseApi}/hospital`,
    data,
  })
}
function scheduling(id) {
  return request({
    url: `${baseApi}/scheduling/${id}`,
  })
}
const LabelServices = {
  hospital,
  scheduling,
}

export default LabelServices
