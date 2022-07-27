import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/ScreeningTemplate`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getHospitalScreening(params = {}) {
  return request({
    url: `${baseApi}/getHospitalScreeningTemplate`,
    params,
  })
}

function getHospitalTempStatus(templateId, treatmentTypeId, manufacturerId) {
  return request({
    url: `${baseApi}/${templateId}/${treatmentTypeId}/${manufacturerId}`,
    method:'GET',
  })
}

function markAcceptance(templateId, treatmentTypeId, manufacturerId) {
  return request({
    url: `${baseApi}/markAcceptance/${templateId}/${treatmentTypeId}/${manufacturerId}`,
    method:'GET',
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


const ScreeningTemplateServices = {
  get,
  getHospitalScreening,
  getHospitalTempStatus,
  markAcceptance,
  create,
  getById,
  update
}

export default ScreeningTemplateServices
