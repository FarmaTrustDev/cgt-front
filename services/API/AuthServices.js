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
function resetPasswordEmail(data){
  return request({
    url: `${baseApi}/reset-password-email`,
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

function getActivationAuth(id) {
  return request({
    url: `${baseApi}/private-key-activation/${id}`,
    method: 'GET',
  })
}

function getKeyWithEmail(id) {
  return request({
    url: `${baseApi}/get-key-with-email/${id}`,
    method: 'GET',
  })
}
const AuthService = {
  login,
  logout,
  registerSms,
  forgetpassword,
  resetPassword,
  getBusEvent,
  getActivationAuth,
  resetPasswordEmail,
  getKeyWithEmail
}

export default AuthService
