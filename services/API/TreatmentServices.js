import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatment`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
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
    method: 'Put',
    data,
  })
}

function detail(id) {
  return request({
    url: `${baseApi}/detail/${id}`,
  })
}

const TreatmentServices = {
  get,
  create,
  getById,
  update,
  detail,
}

export default TreatmentServices
