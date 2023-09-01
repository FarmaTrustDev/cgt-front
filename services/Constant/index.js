export const BASE_URL = process.env.baseUrl
export const BASE_API = process.env.api

export const STATUSES = [
  {
    id: 1,
    name: 'Booked',
    bg_color: '#e8f1ff',
  },
  {
    id: 2,
    name: 'Travelling',
    bg_color: '#80008061',
  },
  {
    id: 3,
    name: 'Arrived',
    bg_color: '#ffa50069',
  },
  {
    id: 4,
    name: 'Accepted',
    bg_color: '#f4fff1',
  },
  {
    id: 5,
    name: 'Entered',
    bg_color: '#f4fff1',
  },
  {
    id: 6,
    name: 'Completed',
    bg_color: '#f8f8f8',
  },
  {
    id: 7,
    name: 'Cancelled',
    bg_color: '#ffdbd0',
  },
]
export const TIME_SLOTS = [
  {
    id:1, 
    time_slot:'09:00', 
    display:'09:00-10:00'
  },
  {
    id:2, 
    time_slot:'10:00', 
    display:'10:00-11:00'
  },
  {
    id:3, 
    time_slot:'11:00', 
    display:'11:00-12:00'
  },
  {
    id:4, 
    time_slot:'12:00', 
    display:'12:00-13:00'
  },
  {
    id:5, 
    time_slot:'13:00', 
    display:'13:00-14:00'
  },
  {
    id:6, 
    time_slot:'14:00', 
    display:'14:00-15:00'
  },
  {
    id:7, 
    time_slot:'15:00', 
    display:'15:00-16:00'
  },
  {
    id:8, 
    time_slot:'16:00', 
    display:'16:00-17:00'
  },
  {
    id:9, 
    time_slot:'17:00', 
    display:'17:00-18:00'
  }, 
]
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export const GENDER = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
]

export const HOSPITAL_ALIAS = 'HOSPITAL'
export const LOGISTIC_ALIAS = 'LOGISTIC'
export const MANUFACTURER_ALIAS = 'MANUFACTURER'
export const SUPERADMIN_ALIAS =  'ADMIN'
export const SMARTLAB_ALIAS = 'SMARTLAB'

export const SCHEDULING_STATUSES = {
  new: { id: 1, name: 'New' },
  accepted: { id: 2, name: 'Accepted' },
  rejected: { id: 3, name: 'Rejected' },
  pending: { id: 4, name: 'Pending' },
  completed: { id: 5, name: 'Completed' },
  inProcess: { id: 6, name: 'InProcess' },
}

export const COLLECTION_TYPE = {
  hospital: { id: 1, name: 'Hospital' },
  manufacturer: { id: 2, name: 'Manufacturer' },
  treatment: { id: 3, name: 'Treatment' },
}

export const PICTURE_UPLOAD_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.bmp',
  '.gif',
  '.png',
]
export const DOCUMENT_UPLOAD_EXTENSIONS = ['.doc', '.docx', '.pdf']
export const DOCUMENT_EXTENSIONS = [
  ...PICTURE_UPLOAD_EXTENSIONS,
  ...DOCUMENT_UPLOAD_EXTENSIONS,
]

export const QUARANTINE_STORAGE = "QUARANTINE_STORAGE"