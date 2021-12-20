import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/patient`

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PATCH',
    data,
  })
}

function get(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

const PatientServices = {
  create,
  update,
  get,
}

export default PatientServices
