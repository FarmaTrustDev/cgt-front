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
const OrganizationTypeServices = {
  get,
  post
}

export default OrganizationTypeServices