
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
        params: { view: 'screening' }
    },
    {
        id: 2,
        name: 'Scheduling',
        alias: 'SCHEDULING',
        phaseId: 3,
        url_slug: '/hospital/patients/',
        url_type: URL_TYPE.patient,
        params: { view: 'scheduling' }
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
        phaseId: 6,
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
        name: 'After cares',
        alias: 'AFTER_CARE',
        phaseId: 15,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'after-care' }
    },
]
