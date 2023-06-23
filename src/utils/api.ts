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
    patch: (url: string, body?: any) => axiosInstance.patch(url, body).then(responseBody),
};

export const userApi = {
    login: (params: string): Promise<IUserData> => requests.post('/login', params),
    recover: (params: { email: string }) => requests.post('/recover', params),
};

export const applicationApi = {
    fetchApplications: (status: string, page: string): Promise<IApplicationData> =>
        requests.get(`/applications/all?page=${page}`, { status }),
    addApplication: (body: IApplicationDataProvider): Promise<IApplicationDataProvider> =>
        requests.post('/app', { ...body }),
    delete: (id: number) => requests.delete(`/applications/remove/${id}`),
};

export const providerApi = {
    fetchProviders: (page: string): Promise<any> => requests.get(`/provider/all?page=${page}`),
    fetchProviderById: (id: number): Promise<any> => requests.get(`/providers/${id}`),
    addProvider: (body: IProviderData): Promise<any> => requests.post('/providers/new', body),
    fetchProviderBranches: (): Promise<any> => requests.get('/provider/branchs'),
    fetchBranchById: (id: number): Promise<any> => requests.get(`/provider/branch/${id}`),
    updateProviderPhone: (id: number, body: IProviderData) => requests.patch(`provider/phone/${id}`, body),
    getProviderStatistic: (): Promise<any> => requests.get('/provider/observer'),
    getBranchById: (id: string): Promise<any> => requests.get(`provider/branch/${id}`),
    getProviderRequisites: () => requests.get(`provider/info`),
    deleteBranch: (id: number) => requests.delete(`provider/branch/${id}`),
    activateOrdisactivateBranch: (id: number) => requests.patch(`provider/branch/activate/${id}`),
};

export const branchApi = {
    getBranchById: (id: number) => requests.get(`/branch/${id}`),
    getAllBranches: () => requests.get('provider/branchs'),
    updateBranch: (id: number, body: IBranchData) => requests.patch(`/provider/branch/${id}`, { ...body }),
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
    getBranchInfo: (id: number) => requests.get(`products/countBranch/${id}`),
    getListInfo: (id: number) => requests.get(`products/countPricelist/${id}`),
};

export const vinOrderApi = {
    createOrder: (data: ICreateVinOrder) => requests.post('/vin', data),
    getAllVinByProviderCommon: (page: string): Promise<any> =>
        requests.get(`/vinOrder/common?primary=1&repeated=1&page=${page}`),
    getAllVinByProvider: (page: string) => requests.get(`vinOrder/all?accepted=1&completed=1&page=${page}`),
    acceptVinByProvider: (id: number) => requests.patch(`/vinOrder/accept/${id}`),
    completeVinByProvider: (id: number) => requests.patch(`/vinOrder/completed/${id}`),
    rejectVinByProvider: (
        id: number,
        body: {
            description: string;
            reason: string;
        }
    ) => requests.patch(`/vinOrder/reject/${id}`, body),
    fetchVinActionAdmin: (status?: string): Promise<any> => requests.get(`/vinAction/all?${status}`),
    rejectOrRepeatVin: (id: number, status: string): Promise<any> => requests.patch(`/vinAction/${status}/${id}`),
    compensation: (id: number) => requests.patch(`/vinAction/compensation/${id}`),
};

export const staticParamsApi = {
    getParams: (): Promise<IStaticParams> => requests.get('/static/params'),
    getFiles: (fileName: string): Promise<any> => requests.get(`/static/${fileName}`),
};

export const priceListApi = {
    fetchPriceList: (page: number | string = 1, limit: number = 10): Promise<any> =>
        requests.get(`/pricelist/all?page=${page}&limit=${limit}`),
    delete: (id: number): Promise<any> => requests.delete(`/pricelist/${id}`),
    updatePriceList: (body: any): Promise<any> =>
        requests.post(`/products/add`, body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
};

export const orderDetails = {
    order: (body: IOrderDetail) => requests.post('/orders', body),
};

export const promoApi = {
    getBlockedPromoByProvider: () => requests.get('products/marketing/blocked'),
    getActivePromoByProvider: (page: string) =>
        requests.get(`products/marketing/all?active=1&pending=1&expired=1&page=${page}`),
    getPriceListByBranch: (id: number) => requests.get(`pricelist/branch/${id}`),
    getProductsByPriceList: (id: number | string, locale: string, page: string) =>
        requests.get(`products/common/byPricelistId?id=${id}&lang=${locale}&page=${page}`),
    addPromoByChosenProducts: (body: any) => requests.post('products/marketing', body),
    addPromoByBranch: (body: any) => requests.post('products/marketing/branch', body),
    addPromoByPriceList: (body: any) => requests.post('products/marketing/pricelist', body),
    deletePromoByProvider: (id: number) => requests.delete(`products/marketing/${id}`),
    getSinglePromoProvider: (id: string) => requests.get(`products/marketing/${id}`),
    editPromoByProvider: (id: string, body: any) => requests.patch(`products/marketing/edit/${id}`, body),
    getActivePromoByAdmin: (page: string) => requests.get(`promo/active?page=${page}`),
    getModerationPromoByAdmin: (page: string) => requests.get(`promo/moderation?page=${page}`),
    getSinglePromoAdmin: (id: number) => requests.get(`promo/${id}`),
    rejectPromoByAdmin: (id: number, body: any) => requests.patch(`promo/block/${id}`, body),
    acceptPromoByAdmin: (id: number) => requests.patch(`promo/activate/${id}`),
    deletePromoByAdmin: (id: number) => requests.delete(`promo/${id}`),
    editPromoByAdmin: (id: number, body: any) => requests.patch(`promo/${id}`, body),
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

export const walletApi = {
    getIncomingRequest: (page: string, date: string | null | Date) =>
        requests.get(`replenishment/incoming?page=${page}${date ? `&date=${date}` : ''}`),
    getApprovedRequest: (page: string, date: string | null | Date) =>
        requests.get(`replenishment/approved?page=${page}${date ? `&date=${date}` : ''}`),
    approveRequest: (body: any) =>
        requests.post('replenishment/approved', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    getHistoryAdmin: (page: string, date: string | null | Date) =>
        requests.get(`replenishment/usage?page=${page}${date ? `&date=${date}` : ''}`),
    getHistoryProvider: (page: string, date: string | null | Date) =>
        requests.get(`wallets/usage?page=${page}${date ? `&date=${date}` : ''}`),
    addCoins: (body: any) => requests.post('wallets/up', body),
};
