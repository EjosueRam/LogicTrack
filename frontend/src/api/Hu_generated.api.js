import axios from 'axios';


const huGeneratedApi = axios.create({
    baseURL: 'http://localhost:8000/hu-generated/api/v1/hu-generated/',
});

// Función para obtener todos los HU generados
export const getAllHuGenerated = () => huGeneratedApi.get('/');

// Función para obtener un HU generado por ID
export const getHuGenerated = (id) => huGeneratedApi.get(`/${id}/`);

// Función para eliminar un HU generado por ID
export const deleteHuGenerated = (id) => huGeneratedApi.delete(`/${id}`);

// Función para crear un nuevo HU generado
export const makeHuGenerated = (huGeneratedData) => huGeneratedApi.post('/', huGeneratedData);

// Función para actualizar un HU generado por ID
export const updateHuGenerated = (id, huGeneratedData) => huGeneratedApi.put(`/${id}/`, huGeneratedData);