import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/project`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}
function search(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}

function addNew(data){
  return request({
    url: `${baseApi}/create`,
    data,
    method: 'POST'
  })
}

function getDetail(){
  return request({
    url: `${baseApi}/get`,
    method: 'GET',
  })
}
function getAllInvestigatorProject(){
  return request({
    url: `${baseApi}/getAllInvestigatorProject`,
    method: 'GET',
  })
}
function getAllPartnerProject(){
  return request({
    url: `${baseApi}/getAllPartnerProject`,
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

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PUT',
    data,
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

const ProjectServices = {
  create,
  update,
  getById,
  get,
  destroy,
  search,
  addNew,
  getDetail,
  getAllInvestigatorProject,
  getAllPartnerProject
}

export default ProjectServices
