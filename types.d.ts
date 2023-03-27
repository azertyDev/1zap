interface IUser {
    id?: number;
    fullName?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
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
    providerBranch: IBranchData[];
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
