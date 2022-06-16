export const baseStorage = [
    {
        id: 1,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',
    },
    {
        id: 2,
        color: '#1943AE',
        title: 'Freezer Atara 002',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
    },
    {
        id: 3,
        color: '#FA6363',
        title: 'Freezer Atara 003',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
    },
    {
        id: 4,
        color: '#1943AE',
        title: 'Freezer Atara 004',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
    },
    {
        id: 5,
        color: '#FA6363',
        title: 'Freezer Atara 005',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 1,
        zoneId: 2,
        temperature: '-20',
        zone: 'Zone B',
    },
    {
        id: 6,
        color: '#1943AE',
        title: 'Freezer Atara 006',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
    },
    {
        id: 7,
        color: '#FA6363',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 3,
        zoneId: 2,
        temperature: 'LN2',
        zone: 'Zone B',
    },
    {
        id: 8,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 14,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
    },
    {
        id: 9,
        color: '#FA6363',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 11,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
    },
    {
        id: 10,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 18,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
    },
    {
        id: 11,
        color: '#FA6363',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 8,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',
    },
    {
        id: 12,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 16,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
    },
    {
        id: 13,
        color: '#FA6363',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 18,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
    },
    {
        id: 14,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 14,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
    },
    {
        id: 15,
        color: '#FA6363',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 14,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
    },
    {
        id: 16,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 14,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
    },
]


export const baseStorageQuarantine = [
    {
        id: 1,
        color: '#1943AE',
        title: 'Quarantine 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',
    },
    {
        id: 2,
        color: '#1943AE',
        title: 'Quarantine 002',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
    },
    {
        id: 3,
        color: '#FA6363',
        title: 'Quarantine 003',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
    },
]


// ==================== inventory data ============
const tube = {
    id: 2,
    active: true,
    name: '5A',
    steps: [
        {
            title: 'Jack Black',
            date: '9:00',
            by: 'Inbound Date',
            detail: '21 Feb 2022',
        },
        {
            title: ' Simon Smith',
            date: '9:30',
            by: 'Inbound Process',
            detail: '21 Feb 2022',
        },
        {
            title: 'Ahmed Salaam',
            date: '10:00',
            by: 'Storage',
            detail: '21 Feb 2022',
        },
        {
            title: 'Claire Jones',
            date: '14:00',
            by: 'Visual Check',
            detail: '28 Feb 2022',
        },
        {
            title: 'Dwayne Morgan',
            date: '15:00',
            by: 'Packaging Depot',
            detail: '19 April 2022',
        },
        {
            title: 'RT456',
            date: '16:00',
            by: 'Courier Pick Up',
            detail: '19 April 2022',
        },
    ],
}
const tube2 = {
    id: 3,
    active: false,
    name: '5A',
    steps: [
        {
            title: 'Jack Black',
            date: '9:00',
            by: 'Inbound Date',
            detail: '21 Feb 2022',
        },
        {
            title: ' Simon Smith',
            date: '9:30',
            by: 'Inbound Process',
            detail: '21 Feb 2022',
        },
        {
            title: 'Ahmed Salaam',
            date: '10:00',
            by: 'Storage',
            detail: '21 Feb 2022',
        },
        {
            title: 'Claire Jones',
            date: '14:00',
            by: 'Visual Check',
            detail: '28 Feb 2022',
        },
        {
            title: 'Dwayne Morgan',
            date: '15:00',
            by: 'Packaging Depot',
            detail: '19 April 2022',
        },
        {
            title: 'RT456',
            date: '16:00',
            by: 'Courier Pick Up',
            detail: '19 April 2022',
        },
    ],
}
const tube3 = {
    id: 3,
    active: false,
    name: '5A',
    steps: [
        {
            title: 'Jack Black',
            date: '9:00',
            by: 'Inbound Date',
            detail: '21 Feb 2022',
        },
        {
            title: ' Simon Smith',
            date: '9:30',
            by: 'Inbound Process',
            detail: '21 Feb 2022',
        },
        {
            title: 'Ahmed Salaam',
            date: '10:00',
            by: 'Storage',
            detail: '21 Feb 2022',
        },
        {
            title: 'Claire Jones',
            date: '14:00',
            by: 'Visual Check',
            detail: '28 Feb 2022',
        },
        {
            title: 'Dwayne Morgan',
            date: '15:00',
            by: 'Packaging Depot',
            detail: '19 April 2022',
        },
        {
            title: 'RT456',
            date: '16:00',
            by: 'Courier Pick Up',
            detail: '19 April 2022',
        },
    ],
}
const portion = {
    id: 1,
    color: 'red',
    active: true,
    trays: [
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
    ],
}
const portion2 = {
    id: 2,
    color: 'red',
    active: false,
    trays: [
        {
            tubes: [tube2, tube3, tube, tube2, tube, tube],
        },
        {
            tubes: [tube, tube2, tube, tube, tube, tube],
        },
        {
            tubes: [tube, tube, tube, tube, tube, tube],
        },
        {
            tubes: [tube, tube, tube, tube, tube, tube],
        },
        {
            tubes: [tube, tube, tube, tube, tube, tube],
        },
    ],
}
const portion3 = {
    id: 2,
    color: 'red',
    active: false,
    trays: [
        {
            tubes: [tube2, tube3, tube2, tube2, tube2, tube],
        },
        {
            tubes: [tube2, tube, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
        },
        {
            tubes: [tube2, tube2, tube2, tube2, tube, tube],
        },
    ],
}
const rack = {
    id: 1,
    portions: [portion, portion2, portion3],
}
const rack2 = {
    id: 1,
    portions: [portion, portion2, portion, portion2],
}
const rack3 = {
    id: 1,
    portions: [portion, portion2, portion3, portion2],
}

export const fridgeData = {
    name: 'Fridge Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    racks: [rack, rack2, rack3, rack2, rack],
}


export const fridges = [fridgeData]

const colors = {
    blue: '#2359e8',
    red: '#ff0909',
    yellow: '#ffbf00',
}
export const consumables = [
    {
        threshold: 46,
        heading: '5ml EDTA blood collection tube (minimum order 500)',
        color: colors.red,
    },
    {
        threshold: 50,
        heading: ' 10ml SST blood collection tubes (minimum order 500)',
        color: colors.red,
    },
    {
        threshold: 90,
        heading: ' Vacutainer holder (minimum order 500) ',
        color: colors.blue,
    },
    {
        threshold: 46,
        heading: ' 21g Eclipse blood collection needle (minimum order 500)',
        color: '#2359e8',
    },
    {
        threshold: 46,
        heading: ' alcohol skin swabs',
        color: '#ff0909',
    },
    {
        threshold: 50,
        heading: 'cotton wool balls',
        color: '#ff0909',
    },
    {
        threshold: 90,
        heading: 'disposable tourniquet',
        color: '#2359e8',
    },
    {
        threshold: 46,
        heading: 'small Band-Aid plasters',
        color: '#2359e8',
    },

    {
        threshold: 46,
        heading: ' leakproof tamper-proof sample bag (approx. 6” x 10”) ',
        color: '#ff0909',
    },
    {
        threshold: 50,
        heading: 'absorbent pad',
        color: '#ff0909',
    },
    {
        threshold: 90,
        heading: ' Consumables 123 ',
        color: '#2359e8',
    },
    {
        threshold: 46,
        heading: 'Consumables 648',
        color: '#2359e8',
    },
    {
        threshold: 46,
        heading: 'Consumables 648 ',
        color: '#2359e8',
    },
];