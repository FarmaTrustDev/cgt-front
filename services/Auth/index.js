import { isEmpty } from '~/services/Utilities'

export const getAccessToken = () => localStorage.getItem('access_token')

export const setAccessToken = (token) =>
  localStorage.setItem('access_token', token)

export const getRefreshToken = () => localStorage.getItem('refresh_token')

export const setRefreshToken = (token) =>
  localStorage.setItem('refresh_token', token)

export const getSchAccessToken = () => localStorage.getItem('sch_access_token')

export const setSchAccessToken = (token) =>
    localStorage.setItem('sch_access_token', token)
  
export const getSchRefreshToken = () => localStorage.getItem('sch_refresh_token')
  
export const setSchRefreshToken = (token) =>
    localStorage.setItem('sch_refresh_token', token)  

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
