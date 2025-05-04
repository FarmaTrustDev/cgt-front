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

function updateConcent(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'Put',
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Put',
    data,
  })
}

function updateTreatmentQPStatus(id, data) {
  return request({
    url: `${baseApi}/updateTQPStatus/${id}`,
    method: 'Put',
    data,
  })
}


function updateCMCQPStatus(id, data) {
  return request({
    url: `${baseApi}/updateCMCQPStatus/${id}`,
    method: 'Put',
    data,
  })
}

function detail(id) {
  return request({
    url: `${baseApi}/detail/${id}`,
  })
}
function schedule(id, directionId) {
  return request({
    url: `${baseApi}/schedule/${id}/${directionId}`,
  })
}

function markCompleteCollection(id) {
  return request({
    url: `${baseApi}/mark-complete-collection/${id}`,
    method: 'Put',
    data:{}
  })
}

function submitCDMOQPApproval(id){
  return request({
    url: `${baseApi}/submitCDMOQPApproval/${id}`,
    method: 'Post',
  })
}

function markManufacturerCollection(id) {
  return request({
    url: `${baseApi}/mark-manufacturer-collection/${id}`,
    method: 'Put',
  })
}

function markTreatmentCollection(id) {
  return request({
    url: `${baseApi}/mark-treatment-collection/${id}`,
    method: 'Put',
    data:{}
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

function getCustody(treatmentId, bagId, typeId) {
  return request({
    url: `${baseApi}/chain-of-custody/${treatmentId}/${bagId}/${typeId}`,
    method: 'Get',
  })
}

function markDead(id, status) {
  return request({
    url: `${baseApi}/mark-patient-dead/${id}/${status}`,
    method: 'PATCH',
  })
}
function getCDMOStatus(treatmentId, patientId) {
  return request({
    url: `${baseApi}/getCDMOStatus/${treatmentId}/${patientId}`,
  })
}
function getCMCStatus(treatmentId, patientId) {
  return request({
    url: `${baseApi}/getCMCStatus/${treatmentId}/${patientId}`,
  })
}

function getTreatmentQP(treatmentId){
  return request({
    url: `${baseApi}/getTreatmentQP/${treatmentId}`,
  })
}

function getBags(id) {
  return request({
    url: `${baseApi}/get-patient-bags/${id}`,
  })
}

function getHospitalCount() {
  return request({
    url: `${baseApi}/get-hospital-count`,
  })
}

function hold(id, status, data = {}) {
  return request({
    url: `${baseApi}/hold/${id}/${status}`,
    method: 'PATCH',
    data,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}


function getInboundScheduling(treatmentId, params = {}) {
  return request({
    url: `${baseApi}/getInboundScheduling/${treatmentId}`,
    params,
  })
}

function cancel(id, status, data = {}) {
  return request({
    url: `${baseApi}/cancel/${id}/${status}`,
    method: 'PATCH',
    data,
  })
}

const TreatmentServices = {
  get,
  create,
  updateConcent,
  getById,
  update,
  detail,
  schedule,
  manufacturing,
  markCompleteCollection,
  markManufacturerCollection,
  markTreatmentCollection,
  getCustody,
  markDead,
  getBags,
  getHospitalCount,
  hold,
  destroy,
  getInboundScheduling,
  cancel,
  getCDMOStatus,
  updateTreatmentQPStatus,
  updateCMCQPStatus,
  getCMCStatus,
  submitCDMOQPApproval,
  getTreatmentQP
}

export default TreatmentServices
