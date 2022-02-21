import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Shipment`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function pickupCreate(id, data) {
  return request({
    url: `${baseApi}/pickup/${id}`,
    data,
    method: 'POST',
  })
}

function deliveryCreate(id, data) {
  return request({
    url: `${baseApi}/delivery/${id}`,
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

const ShipmentServices = {
  get,
  pickupCreate,
  update,
  getById,
  deliveryCreate,
}

export default ShipmentServices
