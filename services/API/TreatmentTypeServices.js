import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/TreatmentType`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getRemaining(params = {}) {
  return request({
    url: `${baseApi}/remaining`,
    params,
  })
}

function getActive(params = {}) {
  return request({
    url: `${baseApi}/active`,
    params,
  })
}

function getWithScreening(params = {}) {
  return request({
    url: `${baseApi}/withScreening`,
    params,
  })
}
function getActiveWithOutScreening(params = {}) {
  return request({
    url: `${baseApi}/activeWithOutScreening`,
    params,
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getByIntId(param) {
  return request({
    url: `${baseApi}/getById/${param}`,
  })
}

const TreatmentTypeServices = {
  get,
  getById,
  getRemaining,
  getActive,
  getWithScreening,
  getByIntId,
  getActiveWithOutScreening,
}

export default TreatmentTypeServices
