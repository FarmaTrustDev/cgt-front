import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Scheduling`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function getCDMOQP(params = {}) {
  return request({
    url: `${baseApi}/getCDMOQP`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getCDMOQPAll(params = {}) {
  return request({
    url: `${baseApi}/getCDMOQPAll`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}


function getCMCQPAll(params = {}) {
  return request({
    url: `${baseApi}/getCMCQPAll`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getCDMOQPApp(params = {}) {
  return request({
    url: `${baseApi}/getCDMOQPApp`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}


function getCMCQPApp(params = {}) {
  return request({
    url: `${baseApi}/getCMCQPApp`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}


function getCDMOQPRej(params = {}) {
  return request({
    url: `${baseApi}/getCDMOQPRej`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}


function getCMCQPRej(params = {}) {
  return request({
    url: `${baseApi}/getCMCQPRej`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getCMCQP(params = {}) {
  return request({
    url: `${baseApi}/getCMCQP`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getImmatics(params = {}) {
  return request({
    url: `${baseApi}/immatics`,
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
function getDetailById(id) {
  return request({
    url: `${baseApi}/detail/${id}`,
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

function markScheduleRequest(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Patch',
    data,
  })
}
function markCDMOApproval(id, data) {
  return request({
    url: `${baseApi}/cDMOApproval/${id}`,
    method: 'PUT',
    data,
  })
}

function getEstimation(treatmentAvailabilityId) {
  return request({
    url: `${baseApi}/treatment-availability/${treatmentAvailabilityId}`,
  })
}

function getByTreatment(id, params = {}) {
  return request({
    url: `${baseApi}/treatment/${id}`,
    params,
  })
}
function sBytreatment(id) {
  return request({
    url: `${baseApi}/sBytreatment/${id}`,
  })
}

function getDetailByTreatment(id, params = {}) {
  return request({
    url: `${baseApi}/detail/treatment/${id}`,
    params,
  })
}

function getDetailByTreatmentOut(id, params = {}) {
  return request({
    url: `${baseApi}/detail/treatment-out/${id}`,
    params,
  })
}

function createForManufacturer(data) {
  return request({
    url: `${baseApi}/create-for-manufacturer`,
    data,
    method: 'POST',
  })
}

const SchedulingServices = {
  get,
  getImmatics,
  create,
  getById,
  update,
  getEstimation,
  getByTreatment,
  markScheduleRequest,
  getDetailById,
  getDetailByTreatment,
  getDetailByTreatmentOut,
  createForManufacturer,
  sBytreatment,
  markCDMOApproval,
  getCDMOQP,
  getCMCQP,
  getCDMOQPAll,
  getCMCQPAll,
  getCDMOQPApp,
  getCMCQPApp,
  getCDMOQPRej,
  getCMCQPRej
}

export default SchedulingServices
