import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatmentBag`

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
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function put(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'put',
  })
}
function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function getByTreatmentId(id, params = {}) {
  return request({
    url: `${baseApi}/treatment/${id}`,
    params,
  })
}
const TreatmentBagServices = {
  get,
  create,
  destroy,
  put,
  getById,
  getByTreatmentId,
}

export default TreatmentBagServices
