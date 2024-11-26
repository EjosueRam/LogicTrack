import axios from 'axios';

const fileUploadApi = axios.create({
    baseURL: 'http://localhost:8000/fileupload/hu-internals/',
});

// Función para guardar los datos extraídos
export const saveHuInternals = (huInternals) => {
    const formattedData = huInternals.map(hu => ({ hu_internal: hu }));
    return fileUploadApi.post('/', { huInternals: formattedData });
};

// Función para obtener los datos guardados
export const getHuInternals = () => {
    return fileUploadApi.get('/');
};

// Función para actualizar el estado de los HUInternals
export const updateHuInternalsStatus = (huInternals) => {
    return fileUploadApi.put('/', { huInternals });
};