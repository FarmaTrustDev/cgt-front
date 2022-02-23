import request from '../request'
import { BASE_API } from '../Constant'
// const Qs = require('qs')

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

function markCompleteCollection(id) {
  return request({
    url: `${baseApi}/mark-complete-collection/${id}`,
    method: 'Put',
  })
}

function manufacturing(params = {}) {
  return request({
    url: `${baseApi}/manufacturing`,
    params,
    // paramsSerializer: (params) => {
    //   return Qs.stringify(params, { arrayFormat: 'repeat' })
    // },
  })
}

const TreatmentServices = {
  get,
  create,
  getById,
  update,
  detail,
  manufacturing,
  markCompleteCollection,
}

export default TreatmentServices
