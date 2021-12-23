import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/screeningCategory`

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

function getByTreatment(treatmentId) {
  return request({
    url: `${baseApi}/treatment-type/${treatmentId}`,
  })
}

const ScreeningCategoryServices = {
  get,
  create,
  getById,
  update,
  getByTreatment,
}

export default ScreeningCategoryServices