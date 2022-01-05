import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/Organization`

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
const BagCollectionServices = {
  get,
  create,
  destroy,
  put,
  getById
}

export default BagCollectionServices
