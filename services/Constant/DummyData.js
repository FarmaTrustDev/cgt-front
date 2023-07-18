import moment from 'moment'
import { _getFutureMomentStandardFormatted, _getPastMomentStandardFormatted } from '../Helpers/MomentHelpers'
export const baseStorage = [
    {
        id: 1,
        color: '#1943AE',
        title: 'Freezer Bayer 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        type: 1,
        quantity: 25,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',

    },
    {
        id: 2,
        color: '#1943AE',
        title: 'Freezer Atara 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        type: 2,
        quantity: 50,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',

    },
    {
        id: 3,
        color: '#1943AE',
        title: 'Freezer Atara 012',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        type: 3,
    },
    {
        id: 4,
        color: '#1943AE',
        title: 'Freezer Baystate 007',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        type: 1,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',

    },
    {
        id: 5,
        color: '#1943AE',
        title: 'Freezer Baystate 051',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        type: 2,
        temperatureId: 1,
        zoneId: 2,
        temperature: '-20',
        zone: 'Zone B',

    },
    {
        id: 6,
        color: '#1943AE',
        title: 'Freezer Royal 002',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
        type: 2,
    },
    {
        id: 7,
        color: '#1943AE',
        title: 'Freezer Kings 123',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        temperatureId: 3,
        zoneId: 2,
        temperature: 'LN2',
        zone: 'Zone B',
        type: 1,
    },
    {
        id: 8,
        color: '#1943AE',
        title: 'Freezer Atara 008',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        type: 3,
    },
    {
        id: 9,
        color: '#1943AE',
        title: 'Freezer Bayer 091',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,

        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
        type: 2,
    },
    {
        id: 10,
        color: '#1943AE',
        title: 'Freezer Baystate 088',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
        type: 3,
    },
    {
        id: 11,
        color: '#FA6363',
        title: 'Freezer kings 633',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',
        type: 1,
    },
    {
        id: 12,
        color: '#1943AE',
        title: 'Freezer Atara 035',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
        type: 2,
    },
    {
        id: 13,
        color: '#FA6363',
        title: 'Freezer Baystate 023',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
        type: 3,
    },
    {
        id: 14,
        color: '#1943AE',
        title: 'Freezer Royal 222',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
        type: 2,
    },
    {
        id: 15,
        color: '#FA6363',
        title: 'Freezer Kings 012',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        type: 2,
    },
    {
        id: 16,
        color: '#1943AE',
        title: 'Freezer Atara 009',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        type: 3,
    },
]



// ==================== inventory data ============
const tube = {
    id: 2,
    active: true,
    sampleId:'DEC123',
    name: '5A',
    steps: [
        {
            title: 'Jack Black',
            date: moment(_getPastMomentStandardFormatted(2,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: ' Simon Smith',
            date: moment(_getPastMomentStandardFormatted(34,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Ahmed Salaam',
            date: moment(_getPastMomentStandardFormatted(56,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Claire Jones',
            date: moment(_getPastMomentStandardFormatted(23,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Dwayne Morgan',
            date: moment(_getPastMomentStandardFormatted(27,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'RT456',
            date: moment(_getPastMomentStandardFormatted(2,'month')).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube2 = {
    id: 3,
    active: false,
    sampleId:'DEC245',
    name: '5A',
    steps: [
        {
            title: 'James Smith',
            date: moment(_getFutureMomentStandardFormatted(12,'day')).format("D MMMM, YYYY") + ' 10:05',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Emma Johnson',
            date: moment(_getPastMomentStandardFormatted(2,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Louis Dupont',
            date: moment(_getPastMomentStandardFormatted(35,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Sophia Schmidt',
            date: moment(_getPastMomentStandardFormatted(40,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Ben Fischer',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Mia Weber',
            date: moment(_getPastMomentStandardFormatted(1,'day')).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube3 = {
    id: 4,
    active: false,
    sampleId:'DEC422',
    name: '5A',
    steps: [
        {
            title: 'Sophia Wilson',
            date: moment(_getPastMomentStandardFormatted(4,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Maximilian Müller',
            date: moment(_getPastMomentStandardFormatted(28,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'William Davis',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Claire Jones',
            date: moment(_getPastMomentStandardFormatted(112,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Olivia Thompson',
            date: moment(_getPastMomentStandardFormatted(29,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'RT456',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube4 = {
    id: 5,
    active: false,
    sampleId:'DEC225',
    name: '5A',
    steps: [
        {
            title: 'Hannah Becker',
            date: moment(_getPastMomentStandardFormatted(4,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Paul Hoffmann',
            date: moment(_getPastMomentStandardFormatted(28,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Emma Schäfer',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Claire Jones',
            date: moment(_getPastMomentStandardFormatted(112,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Liam Anderson',
            date: moment(_getPastMomentStandardFormatted(29,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Ava Garcia',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube5 = {
    id: 6,
    active: false,
    sampleId:'DEC732',
    name: '5A',
    steps: [
        {
            title: 'Paul Hoffmann',
            date: moment(_getPastMomentStandardFormatted(4,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Emma Schäfer',
            date: moment(_getPastMomentStandardFormatted(28,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Lukas Bauer',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Claire Jones',
            date: moment(_getPastMomentStandardFormatted(112,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Laura Schneider',
            date: moment(_getPastMomentStandardFormatted(29,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Ava Garcia',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube6 = {
    id: 7,
    active: false,
    sampleId:'DEC274',
    name: '5A',
    steps: [
        {
            title: 'Lena Meyer',
            date: moment(_getPastMomentStandardFormatted(4,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Ethan Lewis',
            date: moment(_getPastMomentStandardFormatted(28,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Charlotte Walker',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Felix Klein',
            date: moment(_getPastMomentStandardFormatted(112,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Laura Schneider',
            date: moment(_getPastMomentStandardFormatted(29,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Lena Meyer',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tube7 = {
    id: 8,
    active: false,
    sampleId:'DEC847',
    name: '5A',
    steps: [
        {
            title: 'Alexander Hall',
            date: moment(_getPastMomentStandardFormatted(4,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Amelia White',
            date: moment(_getPastMomentStandardFormatted(28,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Luis Schröder',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Felix Klein',
            date: moment(_getPastMomentStandardFormatted(112,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Marie Zimmermann',
            date: moment(_getPastMomentStandardFormatted(29,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Hannah Becker',
            date: moment(_getPastMomentStandardFormatted()).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const tubeActive = {
    id: 9,
    active: true,
    sampleId:'DEC759',
    name: '5A',
    isHover: true,
    steps: [
        {
            title: 'Gabriel Lambert',
            date: moment(_getPastMomentStandardFormatted(9,'day')).format("D MMMM, YYYY") + ' 9:00',
            by: 'Inbound Date',
            detail: 'Cellfuse',
        },
        {
            title: 'Léa Rousseau',
            date: moment(_getPastMomentStandardFormatted(20,'day')).format("D MMMM, YYYY") + ' 9:30',
            by: 'Inbound Process',
            detail: 'Cellfuse',
        },
        {
            title: 'Ben Fischer',
            date: moment(_getPastMomentStandardFormatted(2,'month')).format("D MMMM, YYYY") + ' 10:00',
            by: 'Storage',
            detail: 'Cellfuse',
        },
        {
            title: 'Noah Martinez',
            date: moment(_getPastMomentStandardFormatted(37,'day')).format("D MMMM, YYYY") + ' 14:00',
            by: 'Visual Check',
            detail: 'Cellfuse',
        },
        {
            title: 'Sophia Becker',
            date: moment(_getPastMomentStandardFormatted(12,'day')).format("D MMMM, YYYY") + ' 15:00',
            by: 'Packaging Depot',
            detail: 'Cellfuse',
        },
        {
            title: 'Elias Wagner',
            date: moment(_getPastMomentStandardFormatted(47,'day')).format("D MMMM, YYYY") + ' 16:00',
            by: 'Courier Pick Up',
            detail: 'Cellfuse',
        },
    ],
}
const portion = {
    id: 1,
    color: 'red',
    active: true,
    trays: [
        {
            tubes: [tube2, tube3, tubeActive, tube4, tube2, tube3],
        },
        {
            tubes: [tubeActive, tube4, tube3, tube2, tubeActive, tube3],
        },
        {
            tubes: [tube3, tube2, tubeActive, tube4, tube2, tube6],
        },
        {
            tubes: [tube2, tube4, tube3, tube2, tube5, tube7],
        },
        {
            tubes: [tube7, tube6, tube5, tube4, tubeActive, tube2],
        },
        {
            tubes: [tube2, tube3, tube4, tube5, tube6, tube7],
        },
    ],
}

const activePortion = {
    id: 1,
    color: 'red',
    active: true,
    trays: [
        {
            tubes: [tube2, tube3, tube4, tube5, tube6, tubeActive],
        },
        {
            tubes: [tube6, tube5, tube7, tube3, tube4, tube2],
        },
        {
            tubes: [tube2, tube3, tube4, tube5, tube6, tube7],
        },
        {
            tubes: [tube7, tube6, tube5, tube2, tube3, tube],
        },
        {
            tubes: [tube, tube2, tube3, tube4, tube5, tube6],
        },
        {
            tubes: [tube7, tube5, tube6, tube2, tube3, tube],
        },
    ],
}
const portion2 = {
    id: 2,
    color: 'red',
    active: false,
    trays: [
        {
            tubes: [tube2, tube3, tube4, tube5, tube6, tube7],
        },
        {
            tubes: [tube6, tube5, tube4, tube3, tube2, tube],
        },
        {
            tubes: [tube7, tube, tube6, tube5, tube4, tube3],
        },
        {
            tubes: [tube3, tube2, tube7, tube4, tube6, tube5],
        },
        {
            tubes: [tube6, tube7, tube5, tube3, tube2, tube],
        },
    ],
}
const portion3 = {
    id: 2,
    color: 'red',
    active: false,
    trays: [
        {
            tubes: [tube2, tube3, tube4, tube5, tube6, tube7],
        },
        {
            tubes: [tube5, tube6, tube7, tube3, tube2, tube],
        },
        {
            tubes: [tube, tube2, tube5, tube4, tube3, tube6],
        },
        {
            tubes: [tube4, tube3, tube2, tube, tube7, tube6],
        },
        {
            tubes: [tube, tube7, tube6, tube5, tube4, tube3],
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

const rackActive = {
    id: 1,
    portions: [activePortion, portion, portion2, portion3],
}

export const fridgeData = {
    name: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    racks: [rack, rack2, rack3, rack2, rack],
}

export const fridgeDataStatic = {
    name: 'Freezer Atara 002',
    location: 'Storage Suite 3, Germany - Cellfuse',
    racks: [rackActive, rack, rack2, rack2, rack],
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
        heading: '5ml EDTA blood collection tube ',
        color: colors.red,
    },
    {
        threshold: 50,
        heading: ' 10ml SST blood collection tubes ',
        color: colors.red,
    },
    {
        threshold: 90,
        heading: ' Vacutainer holder ',
        color: colors.blue,
    },
    {
        threshold: 46,
        heading: ' 21g Eclipse blood collection needle ',
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
    // {
    //     threshold: 46,
    //     heading: 'Consumables 648 ',
    //     color: '#2359e8',
    // },
];

export const baseStorageQuarantine = [
    {
        id: 1,
        type: 1,
        color: '#1943AE',
        title: 'Quarantine 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 1,
        zoneId: 1,
        temperature: '-20',
        zone: 'Zone A',
        racks: [rack, rack2, rack3, rack2, rack],
    },
    {
        id: 2,
        color: '#1943AE',
        type: 0,
        title: 'Quarantine 002',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 1,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
        racks: [rack2, rack2, rack3, rack2, rack,],
    },
    {
        id: 3,
        color: '#1943AE',
        title: 'Quarantine 003',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 20,
        temperatureId: 2,
        type: 1,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
]



export const baseStorageQuarantine2 = [
    {
        id: 1,
        type: 2,
        color: '#1943AE',
        title: 'Freezer 001',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 3,
        zoneId: 1,
        temperature: 'LN2',
        zone: 'Zone A',
        racks: [rack, rack2, rack3, rack2, rack],
    },
    {
        id: 2,
        color: '#1943AE',
        type: 3,
        title: 'Freezer 002',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        zoneId: 2,
        temperature: '-80',
        zone: 'Zone B',
        racks: [rack2, rack2, rack3, rack2, rack,],
    },
    {
        id: 3,
        color: '#1943AE',
        title: 'Freezer 003',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        temperatureId: 2,
        type: 1,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },

    {
        id: 4,
        color: '#1943AE',
        type: 2,
        title: 'Freezer 004',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
        racks: [rack2, rack2, rack3, rack2, rack,],
    },
    {
        id: 5,
        color: '#1943AE',
        title: 'Freezer 005',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        type: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },

    {
        id: 6,
        color: '#1943AE',
        type: 2,
        title: 'Freezer 006',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        zoneId: 3,
        temperature: '-80',
        zone: 'Zone C',
        racks: [rack2, rack2, rack3, rack2, rack,],
    },
    {
        id: 7,
        color: '#1943AE',
        title: 'Freezer 007',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        temperatureId: 2,
        type: 1,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
    {
        id: 8,
        color: '#1943AE',
        title: 'Freezer 008',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        type: 3,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
    {
        id: 9,
        color: '#1943AE',
        title: 'Freezer 009',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        type: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
    {
        id: 10,
        color: '#1943AE',
        title: 'Freezer 010',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 75,
        temperatureId: 2,
        type: 3,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
    {
        id: 11,
        color: '#1943AE',
        title: 'Freezer 011',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 25,
        temperatureId: 2,
        type: 1,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
    {
        id: 12,
        color: '#1943AE',
        title: 'Freezer 012',
        location: 'Storage Suite 3, Germany - Cellfuse',
        quantity: 50,
        temperatureId: 2,
        type: 2,
        zoneId: 1,
        temperature: '-80',
        zone: 'Zone A',
        racks: [rack, rack3, rack, rack2, rack3,],
    },
]