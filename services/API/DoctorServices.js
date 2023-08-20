import requestSch from '../requestSch'
const schBaseApi = `http://localhost:49299/api/doctor`

function get() {
  return requestSch({
    url: `${schBaseApi}`,
  })
}

function getWithDays(dayId, startTime) {
  return requestSch({
    url: `${schBaseApi}/${dayId}/${startTime}`,
  })
}
function getDoctorWithDays() {
  return requestSch({
    url: `${schBaseApi}/getDoctorWithDays`,
  })
}

const DoctorServices = {
  get,
  getWithDays,
  getDoctorWithDays
}

export default DoctorServices
