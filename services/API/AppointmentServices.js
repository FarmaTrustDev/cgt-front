import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/appointment`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function update(data, id) {
  return request({
    url: `${baseApi}/${id}`,
    data,
    method: 'Put',
  })
}
function doctorData(data) {
  return request({
    url: `${baseApi}/doctorData`,
    data,
    method:'POST',
  })
}
const AppointmentServices = {
  get,
  create,
  doctorData,
  update
}

export default AppointmentServices

