import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/Organization`

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
const OrganizationServices = {
  get,
  post,
  destroy,
  put
}

export default OrganizationServices
