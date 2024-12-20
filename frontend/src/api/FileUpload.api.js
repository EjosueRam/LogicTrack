import axios from 'axios';

// Instancia para la extracción y comparación de datos en scanner
const scannerApi = axios.create({
  baseURL: 'http://localhost:8000/scanner/api/upload/',
});

// Instancia para el guardado y visualización de datos en FileUpload
/**
 * An Axios instance configured for file upload API interactions.
 *
 * The `fileUploadApi` instance is pre-configured with a `baseURL`
 * pointing to the file upload API endpoint for internal use.
 * It provides methods to send HTTP requests to the API.
 */
const fileUploadApi = axios.create({
  baseURL: 'http://localhost:8000/fileupload/api/hu-internals/',
});

// Función para subir el archivo y extraer datos
/**
 * Sends a file for scanning and comparison via an API call.
 *
 * @param {File} file - The file object to be sent for processing.
 * @returns {Promise} - A promise representing the API response.
 */
export const extractAndCompareFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return scannerApi.post('/', formData);
};

// Función para guardar los datos extraídos
/**
 * Processes and saves a list of HU (Handling Unit) internals to the server.
 *
 * The function formats the provided `huInternals` by mapping each HU internal to an object
 * containing the internal value and a default status set to 'Pendiente'. It then sends
 * the formatted data as a payload to the `fileUploadApi` endpoint for storage.
 *
 * @param {Array<string>} huInternals - An array of HU internal strings to be saved.
 * @returns {Promise} A promise that resolves with the response from the `fileUploadApi` when the POST request is successful.
 */
export const saveHuInternals = (huInternals) => {
  const formattedData = huInternals.map(hu => ({ hu_internal: hu, status: 'Pendiente' }));
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