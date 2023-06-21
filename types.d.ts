import * as diagnostics_channel from 'diagnostics_channel';

interface IUser {
    id?: number;
    fullName?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
    phone?: string | null;
    companyName?: string | null;
}

interface IUserData {
    token: string;
    balance: number;
    user: IUser;
}

interface IApplicationData {
    data: IApplication[];
    page: number | null;
    lastPage: number | null;
    total: number | null;
}

interface IApplicationDataProvider {
    phone: string;
    service: string;
    city: string;
    providerName: string;
    providerSurname: string;
    providerPatronymic?: string;
    companyName?: string;
}

interface IApplication {
    id: number | null;
    providerName: string;
    providerSurname: string;
    providerPatronymic: string;
    phone: string;
    service: string;
    city: string;
    isActive: string;
    createdAt: string;
    updatedAt: string;
}

interface IProviders {
    data: IProvidersData[];
    page: number | null;
    lastPage: number | null;
    total: number | null;
}

interface IProvidersData {
    id: number | null;
    fullName: string;
    phone: string;
    companyName: string;
    email: string;
    createdAt: string;
}

interface IProviderData {
    legalAddress?: string;
    phone?: string;
    fullName?: string;
    email?: string;
    companyName?: string;
    // Remove in future
    password?: string;
    inn?: string;
    coin?: number | null;
    applicationId?: number;
    providerBranch?: IBranchData[];
}

interface IBranchData {
    id?: number;
    providerId?: number;
    branchName: string;
    phisicalAddress: string;
    phone: string;
    managerName: string;
    landmark: string;
    location: string;
    UserId?: number;
    branchType: string;
    city: string;
    workingSchedule: string;
    weekendSchedule: string;
    weekend: string;
    breakTime: string;
    payment: IMethod[];
    delivery: IMethod[];
    service: IMethod[];
    clientType: IMethod[];
    images: IImage[];
}

interface IProduct {
    id: number;
    pricelistId: number;
    providerId: number;
    uniqNumber: string;
    manufacturer: string;
    description: string;
    availability: number;
    average: number;
    sum: number;
    usd: number;
    currency: string;
    type: string;
    branchId: number;
    landmark: string;
    ltext: string;
    rtext: string;
    pltext: string;
    location: {
        availability: number;
        branchId: number;
        coordination: string;
        productId: number;
        providerId: number;
        sum: number;
        usd: number;
    };
}

interface IPieceProduct {
    id: number;
    manufacturer: string;
    uniqNumber: number;
    availability: number;
    sum: number;
    usd: number;
    currency: string;
    description?: string;
}

interface IProductGroup {
    id: number;
    manufacturer: string;
    uniqNumber: string;
    availability: number;
    currency: string;
    property: string;
    sum: {
        priceTo: 4234355;
        priceFrom: 4234355;
        average: 4234355;
    };
    usd: {
        priceTo: 373.38;
        priceFrom: 373.38;
        average: 373.38;
    };
}

interface IMethod {
    name?: string;
    type?: string;
    method?: string;
    isActive: boolean;
}

interface IImage {
    id?: number | null;
    url: string;
}

interface ICreateVinOrder {
    vinNumber: string;
    yearIssue: string;
    modification: string;
    description: string;
    brand: string;
    model: string;
    payment: string;
    image?: {
        id: number;
        url: string;
    };
    customer: {
        username: string;
        phone: string;
        city: string;
    };
}

type params = {
    label: string;
    value: string;
};

interface IStaticParams {
    branchType: params[];
    breakTime: params[];
    city: params[];
    client: params[];
    delivery: params[];
    payment: params[];
    service: params[];
    service2: params[];
    weekend: params[];
    weekendSchedule: params[];
    workingSchedule: params[];
    shipment: params[];
    updates: params[];
}

interface IOrderDetail {
    providerId: number;
    productId: number;
    name: string;
    phone: string;
}

interface ITopic {
    titleRu: string;
    titleUz: string;
    id: number;
    isProvider: boolean;
}

interface ISubTopic {
    id: number;
    titleRu: string;
    titleUz: string;
    isProvider: boolean;
    subTopic: {
        id: number;
        titleRu: string;
        titleUz: string;
        isProvider: boolean;
        textRu: string;
        textUz: string;
        isOften: boolean;
    }[];
}

interface ISubTopicCreate {
    topicId?: number;
    titleRu: string;
    titleUz: string;
    textRu: string;
    textUz: string;
    isOften: boolean;
}

interface IVinItem {
    id: number;
    vinNumber: string;
    yearIssue: string;
    description: string;
    brand: string;
    model: string;
    payment: string;
    status: string;
    city: string;
    rejectedDesc: string;
    rejectedReason: string;
    customer: {
        id: number;
        username: string;
        phone: string;
        city: string;
        createdAt: string;
    };
    createdAt: string;
}

interface IProviderStat {
    balance: { balance: number; date: string };
    image: null | string;
    name: string;
    phone: string;
    products: { total: number; date: string };
    providerId: number;
    requests: { total: number; info: number };
    transitions: { total: number; info: number };
}
