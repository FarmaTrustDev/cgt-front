import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/user`

function detail(data) {
  return request({
    url: `${baseApi}/details`,
    data,
  })
}
function adminMenu(data) {
  return request({
    url: `${baseApi}/adminMenu`,
    data,
  })
}
function users() {
  return request({
    url: `${baseApi}/users`,
  })
}
function hospitals() {
  return request({
    url: `${baseApi}/hospitals`,
  })
}

function adminSubMenus() {
  return request({
    url: `${baseApi}/admin-menus`,
  })
}

function profile() {
  return request({
    url: `${baseApi}/profile`,
  })
}
function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}
function getUser() {
  return request({
    url: `${baseApi}/organizationSpecificUsers`,
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
    data,
    method: 'PATCH',
  })
}
function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function test(params = {}) {
  return request({
    url: `${baseApi}/test`,
    params,
  })
}
const UserServices = {
  detail,
  adminMenu,
  adminSubMenus,
  users,
  hospitals,
  profile,
  create,
  getById,
  update,
  destroy,
  get,
  getUser,
  test
}

export default UserServices
