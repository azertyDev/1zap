import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import {
    IUserData,
    IApplicationData,
    IApplicationDataProvider,
    IProviderData,
    ICreateVinOrder,
    IStaticParams,
    IOrderDetail,
    ITopic,
    ISubTopic,
    ISubTopicCreate,
    IBranchData,
} from 'types';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: {}) => axiosInstance.get(url, { params }).then(responseBody),
    post: (url: string, body: {}, config?: {}) => axiosInstance.post(url, body, config).then(responseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
    patch: (url: string, body: any) => axiosInstance.patch(url, body).then(responseBody),
};

export const userApi = {
    login: (params: string): Promise<IUserData> => requests.post('/login', params),
    recover: (params: { email: string }) => requests.post('/recover', params),
};

export const applicationApi = {
    fetchApplications: (status: string): Promise<IApplicationData> => requests.get('/applications/all', { status }),
    addApplication: (body: IApplicationDataProvider): Promise<IApplicationDataProvider> =>
        requests.post('/app', { ...body }),
    delete: (id: number) => requests.delete(`/applications/remove/${id}`),
};

export const providerApi = {
    fetchProviders: (): Promise<any> => requests.get('/provider/all'),
    fetchProviderById: (id: number): Promise<any> => requests.get(`/providers/${id}`),
    addProvider: (body: IProviderData): Promise<any> => requests.post('/providers/new', body),
    fetchProviderBranches: (): Promise<any> => requests.get('/provider/branchs'),
    fetchBranchById: (id: number): Promise<any> => requests.get(`/provider/branch/${id}`),
};

export const branchApi = {
    getBranchById: (id: number) => requests.get(`/branch/${id}`),
    updateBranch: (id: number, body: IBranchData) => requests.put(`/branch/${id}`, { body }),
};

export const imageApi = {
    upload: (data: any, config: {}): Promise<any> => requests.post(`/images`, data, config),
    delete: (id: number): Promise<any> => requests.delete(`/images/${id}`),
};

export const productsApi = {
    upload: (data: any, config: {}): Promise<any> => requests.post('/products/new', data, config),
    getProductsNoGroup: (params: any) => requests.get(`/branchs?${params}`),
    getPieceProduct: (id: number) => requests.get(`/piece/${id}`),
    getProductsWithGroup: (type: string, params: any) => requests.get(`/group/${type}${params}`),
};

export const vinOrderApi = {
    createOrder: (data: ICreateVinOrder) => requests.post('/vin', data),
    fetchVinRequests: (status?: any): Promise<any> => requests.get('/vinOrder/all', { status }),
};

export const staticParamsApi = {
    getParams: (): Promise<IStaticParams> => requests.get('/static/params'),
    getFiles: (fileName: string): Promise<any> => requests.get(`/static/${fileName}`),
};

export const priceListApi = {
    fetchPriceList: (): Promise<any> => requests.get('/pricelist/all'),
    delete: (id: number): Promise<any> => requests.delete(`/pricelist/${id}`),
};

export const orderDetails = {
    order: (body: IOrderDetail) => requests.post('/orders', body),
};

export const promoApi = {
    branch: (body: any) => requests.post('/products/marketing/branch', body),
};

export const centerApi = {
    getAllTopics: () => requests.get('/topic/all'),
    addTopic: (body: ITopic) => requests.post('/topic/add', body),
    deleteTopic: (id: number) => requests.delete(`/topic/remove/${id}`),
    // getSubtopicsByTopic: (id: string) => requests.get(`/subtopic/all/${id}`),
    createSubTopic: (body: ISubTopicCreate) => requests.post('/subtopic/add', body),
    getSubtopicsByTopic: (id: string) => requests.get(`/article/${id}`),
    getSubTopic: (id: string) => requests.get(`/subtopic/${id}`),
    editSubTopic: (id: string, body: ISubTopicCreate) => requests.patch(`/subtopic/edit/${id}`, body),
    deleteSubtopic: (id: string) => requests.delete(`/subtopic/remove/${id}`),
};
