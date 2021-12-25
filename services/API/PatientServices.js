import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/patient`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

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

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

const PatientServices = {
  create,
  update,
  getById,
  get,
}

export default PatientServices
