export const providerValues: IProviderData = {
    legalAddress: '',
    phone: '',
    fullName: '',
    email: '',
    companyName: '',
    inn: '',
    coin: 100,
    providerBranch: [
        {
            branchName: '',
            phisicalAddress: '',
            phone: '',
            managerName: '',
            landmark: '',
            location: '',
            branchType: '',
            city: '',
            workingSchedule: '',
            weekendSchedule: '',
            weekend: '',
            breakTime: '',
            payment: [
                {
                    method: 'cash',
                    isActive: true,
                },
                {
                    method: 'card',
                    isActive: true,
                },
                {
                    method: 'transfer',
                    isActive: false,
                },
            ],
            delivery: [
                {
                    method: 'pickup',
                    isActive: true,
                },
                {
                    method: 'courier',
                    isActive: false,
                },
            ],
            service: [
                {
                    name: 'tireFitting',
                    isActive: true,
                },
                {
                    name: 'autoService',
                    isActive: false,
                },
                {
                    name: 'partSelection',
                    isActive: false,
                },
            ],
            clientType: [
                {
                    type: 'legal',
                    isActive: false,
                },
                {
                    type: 'individual',
                    isActive: true,
                },
            ],
            images: [
                {
                    id: null,
                    url: '',
                },
            ],
        },
    ],
};

export const providerValuesTest: IProviderData = {
    legalAddress: 'Test address',
    phone: '+998 90 1231212',
    fullName: 'Test testerov',
    email: 'testerov@mail.com',
    companyName: 'Euro Motors',
    inn: '123456789111',
    coin: 100,
    providerBranch: [
        {
            branchName: 'asdas asdasdas',
            phisicalAddress: 'asdasda sdasdas',
            phone: '+998 90 1231122',
            managerName: 'teeesssttt',
            landmark: 'zxczxzxc',
            location: '',
            branchType: 'shop',
            city: 'tashkent',
            workingSchedule: '',
            weekendSchedule: '',
            weekend: '2',
            breakTime: '',
            payment: [
                {
                    method: 'cash',
                    isActive: true,
                },
                {
                    method: 'card',
                    isActive: true,
                },
                {
                    method: 'transfer',
                    isActive: false,
                },
            ],
            delivery: [
                {
                    method: 'pickup',
                    isActive: true,
                },
                {
                    method: 'courier',
                    isActive: false,
                },
            ],
            service: [
                {
                    name: 'tireFitting',
                    isActive: true,
                },
                {
                    name: 'autoService',
                    isActive: false,
                },
                {
                    name: 'partSelection',
                    isActive: false,
                },
            ],
            clientType: [
                {
                    type: 'legal',
                    isActive: false,
                },
                {
                    type: 'individual',
                    isActive: true,
                },
            ],
            images: [
                {
                    id: null,
                    url: '',
                },
            ],
        },
    ],
};
