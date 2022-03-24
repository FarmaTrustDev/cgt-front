import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/patient`
const baseApiMap = `${BASE_API}/Map/get-location-by-postal-code`
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
function getMapInfo(id) {
  return request({
    url: `${baseApiMap}/${id}`,
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

const PatientServices = {
  create,
  update,
  getById,
  get,
  getMapInfo,
  destroy,
  
}

export default PatientServices
