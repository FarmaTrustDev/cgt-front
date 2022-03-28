import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/support`

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

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

const SupportServices = {
  create,
  update,
  getById,
  get,
  destroy,
}

export default SupportServices
