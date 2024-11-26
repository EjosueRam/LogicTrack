import axios from 'axios';

const scanApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
});

export const getAllScans = () => scanApi.get('/');
export const getScan = (id) => scanApi.get(`/${id}/`);
export const deleteScan = (id) => scanApi.delete(`/${id}`);
export const makeScan = (scanData) => scanApi.post('/', scanData);
export const updateScan = (id, scanData) => scanApi.put(`/${id}/`, scanData);