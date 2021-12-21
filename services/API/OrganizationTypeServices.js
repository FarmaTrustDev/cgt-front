import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/OrganizationType`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}
function post(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
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
const OrganizationTypeServices = {
  get,
  post,
  create,
  destroy,
  put,
  getById
}

export default OrganizationTypeServices