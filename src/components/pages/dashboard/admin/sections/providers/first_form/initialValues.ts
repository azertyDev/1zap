export const providerValues = {
    legalAddress: '',
    phone: '',
    fullName: '',
    email: '',
    companyName: '',
    inn: '',
    coin: '',
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
                    isActive: false,
                },
                {
                    method: 'card',
                    isActive: false,
                },
                {
                    method: 'transfer',
                    isActive: false,
                },
            ],
            delivery: [
                {
                    method: 'pickup',
                    isActive: false,
                },
                {
                    method: 'courier',
                    isActive: false,
                },
            ],
            service: [
                {
                    name: 'tireFitting',
                    isActive: false,
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
                    isActive: false,
                },
            ],
            images: [
                {
                    url: '',
                },
            ],
        },
    ],
};
