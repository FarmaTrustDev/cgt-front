import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/country`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
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
function getCountryCodeList()
{
  return request({
    url: `${baseApi}/GetCountryCodeList`,
    method: 'GET'
  })
}
const CountryServices = {
  get,
  create,
  destroy,
  update,
  getById,
  getCountryCodeList,
}

export default CountryServices
