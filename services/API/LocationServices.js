import requestBlyott from '../requestBlyott'
import request from '../request'
import { BASE_API } from '../Constant'

const baseBlyottApi = `https://api.blyott.com`
const baseApi = `${BASE_API}/location`

function getAllLocations(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/locationsAurora`,
    data,
    method: 'POST',
  })
}

function fetchLocationsFromCGTBlyott() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function update(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'PUT',
  })
}

function createBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/location`,
    data,
    method: 'POST',
  })
}

function updateBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/location`,
    data,
    method: 'PUT',
  })
}

function fetchBlyottLocationByCode(code){
  return requestBlyott({
    url: `${baseBlyottApi}/location/${code}`,
    method: 'GET',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'GET',
  })
}
/*
function update(data) {
  return request({
    url: `${baseApi}`,
    method: 'Put',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getNotification(ticket) {
  return request({
    url: `${baseApi}/get-notification-by-ticket/${ticket}`,
  })
}

function getByGUId(id) {
  return request({
    url: `${baseApi}/get-by-guid/${id}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function postNotification(data) {
  return request({
    url: `${baseApi}/add-notification`,
    data,
    method: 'POST',
  })
} */

const LocationServices = {
    getAllLocations,
    create,
    createBlyott,
    fetchLocationsFromCGTBlyott,
    getById,
    fetchBlyottLocationByCode,
    updateBlyott,
    update
  /* update,
  getById,
  get,
  destroy,
  getByGUId,
  getNotification,
  postNotification */
}

export default LocationServices
