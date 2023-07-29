import { IProviderData } from 'types';

export const providerValuesFirst: IProviderData = {
    legalAddress: '',
    phone: '',
    fullName: '',
    email: '',
    companyName: '',
    inn: '',
    coin: 0,
    dealNumber: '',
};

export const providerValuesSecond = {
    providerBranch: [
        {
            branchName: '',
            phisicalAddress: '',
            managerName: '',
            landmark: '',
            location: '',
            branchType: '',
            city: '',
            workingSchedule: '',
            weekendSchedule: '',
            weekend: '',
            breakTime: '',
            weekendDays: '',
            workingDays: '',
            phones: [
                {
                    number: '',
                },
            ],
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
                    id: null,
                    url: '',
                },
            ],
        },
    ],
};
