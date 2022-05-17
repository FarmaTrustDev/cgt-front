
export const TREATMENT_PHASES = []
const URL_TYPE = {
    patient: 1,
    treatment: 2
}
export const PATIENT_TREATMENT_PHASES = [
    {
        id: 1,
        name: 'Screening',
        alias: 'SCREENING',
        phaseId: 2,
        url_slug: '/hospital/patients/',
        url_type: URL_TYPE.patient,
        params: { view: 'Screening' }
    },
    {
        id: 2,
        name: 'Scheduling',
        alias: 'SCHEDULING',
        phaseId: 4,// requesting manufacturer reject
        url_slug: '/hospital/patients/',
        url_type: URL_TYPE.patient,
        params: { view: 'Scheduling' }
    },
    {
        id: 3,
        name: 'Collection',
        alias: 'COLLECTION',
        phaseId: 5,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'collection' }
    },
    {
        id: 4,
        name: 'Shipment',
        alias: 'SHIPMENT',
        phaseId: 13,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'shipment' }
    },
    {
        id: 5,
        name: 'Treatment',
        alias: 'TREATMENT_COLLECTION',
        phaseId: 14,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'treatment' }
    },
    {
        id: 6,
        name: 'After Care',
        alias: 'AFTER_CARE',
        phaseId: 15,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'after-care' }
    },
]



export const MANUFACTURER_TREATMENT_PENDING_PHASES = [
    {
        id: 1,
        name: 'Inbound Shipment',
        alias: 'INBOUND_SHIPMENT',
        phaseId: 8,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'INBOUND_SHIPMENT' }
    },
    {
        id: 2,
        name: 'Manufacturer',
        alias: 'MANUFACTURER',
        phaseId: 9,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'MANUFACTURER' }
    },
    {
        id: 3,
        name: 'Outbound Shipment',
        alias: 'OUTBOUND_SHIPMENT',
        phaseId: 10,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.treatment,
        params: { view: 'OUTBOUND_SHIPMENT' }
    },
]