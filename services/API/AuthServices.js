import { BASE_URL, BASE_API } from '../Constant'
import request, { getAuthEvent } from '~/services/request'
const baseUrl = `${BASE_URL}`
const baseApi = `${BASE_API}/auth`

function login(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function getBusEvent() {
  return getAuthEvent()
}

function logout(data = {}) {
  return request({
    url: `${baseUrl}logout`,
    data,
    method: 'POST',
  })
}

function registerSms(data) {
  return request({
    url: `${baseApi}register-sms`,
    data,
    method: 'POST',
  })
}

function forgetpassword(data) {
  return request({
    url: `${baseApi}password/create`,
    data,
    method: 'POST',
  })
}

function resetPassword(data) {
  return request({
    url: `${baseApi}password/reset`,
    data,
    method: 'POST',
  })
}
const AuthService = {
  login,
  logout,
  registerSms,
  forgetpassword,
  resetPassword,
  getBusEvent,
}

export default AuthService
