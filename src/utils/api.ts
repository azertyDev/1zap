import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: {}) => axiosInstance.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

export const userApi = {
    login: (params: string): Promise<IUserData> => requests.post('/login', params),
};

export const applicationApi = {
    fetchApplications: (status: string): Promise<IApplicationData> => requests.get('/applications/all', { status }),
    addApplication: (body: IApplicationDataProvider): Promise<IApplicationDataProvider> =>
        requests.post('/app', { body }),
};

export const providerApi = {
    fetchProviders: (): Promise<any> => requests.get('/provider/all'),
    fetchProviderById: (id: number): Promise<any> => requests.get(`/providers/${id}`),

    fetchProviderBranches: (): Promise<any> => requests.get('/provider/branchs'),
    fetchBranchById: (id: number): Promise<any> => requests.get(`/provider/branch/${id}`),
};
