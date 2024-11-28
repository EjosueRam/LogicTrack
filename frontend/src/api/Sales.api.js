import axios from 'axios';

const salesApi = axios.create({
    baseURL: 'http://localhost:8000/sales/api/v1/sales/',
});

// Función para obtener todas las ventas
export const getAllSales = () => salesApi.get('/');

// Función para obtener una venta por ID
export const getSales = (id) => salesApi.get(`/${id}/`);

// Función para eliminar una venta por ID
export const deleteSales = (id) => salesApi.delete(`/${id}`);

// Función para crear una nueva venta
export const makeSales = (salesData) => salesApi.post('/', salesData);

// Función para actualizar una venta por ID
export const updateSales = (id, salesData) => salesApi.put(`/${id}/`, salesData);