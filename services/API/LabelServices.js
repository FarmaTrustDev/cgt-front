import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/label`

function hospital(params = {}) {
  return request({
    url: `${baseApi}/hospital`,
    params,
  })
}
function scheduling(id) {
  return request({
    url: `${baseApi}/scheduling/${id}`,
  })
}
function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function getAllLabels() {
  return request({
    url: `${baseApi}/getLabels`,
  })
}
function update(status, id) {
  return request({
    url: `${baseApi}/${id}/${status}`,
    method: 'Put',
  })
}
const LabelServices = {
  hospital,
  scheduling,
  getAllLabels,
  create,
  update
}

export default LabelServices
