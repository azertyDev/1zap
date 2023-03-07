export interface IProviderForm {
    legalAddress: string;
    phone: string;
    fullName: string;
    email: string;
    password: string;
    inn: string;
    coin: number;
    providerBranch: ProviderBranch[];
}

export interface ProviderBranch {
    branchName: string;
    phisicalAddress: string;
    phone: string;
    managerName: string;
    landmark: string;
    location: string;
    branchType: string;
    city: string;
    workingSchedule: string;
    weekendSchedule: string;
    weekend: string;
    breakTime: string;
    payment: Payment[];
    delivery: Delivery[];
    service: Service[];
    clientType: ClientType[];
    images: Image[];
}

export interface Payment {
    method: string;
    isActive: boolean;
}

export interface Delivery {
    method: string;
    isActive: boolean;
}

export interface Service {
    name: string;
    isActive: boolean;
}

export interface ClientType {
    type: string;
    isActive: boolean;
}

export interface Image {
    id?: number;
    url: string;
}
