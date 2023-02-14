import { isEmpty } from '~/services/Utilities'

export const getAccessToken = () => localStorage.getItem('access_token')

export const setAccessToken = (token) =>
  localStorage.setItem('access_token', token)

export const getRefreshToken = () => localStorage.getItem('refresh_token')

export const setRefreshToken = (token) =>
  localStorage.setItem('refresh_token', token)

export const getBlyottAccessToken = () => localStorage.getItem('blyott_access_token')

export const setBlyottAccessToken = (token) =>
  localStorage.setItem('blyott_access_token', token)

export const getBlyottRefreshToken = () => localStorage.getItem('blyott_refresh_token')  

export const setBlyottRefreshToken = (token) =>
  localStorage.setItem('blyott_refresh_token', token)

export const setUserDetails = (details) =>
  localStorage.setItem('user_details', JSON.stringify(details))

export const getUserDetails = () =>
  JSON.parse(localStorage.getItem('user_details'))

export const isLoggedin = () => {
  if (process.browser) {
    return !isEmpty(getUserDetails())
  }
  return false
}
