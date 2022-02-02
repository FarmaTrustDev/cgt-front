import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/country`

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

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Put',
    data,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}
const CountryServices = {
  get,
  create,
  destroy,
  update,
  getById,
}

export default CountryServices
