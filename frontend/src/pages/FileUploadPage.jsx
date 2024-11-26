import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { extractAndCompareFile, saveHuInternals, getHuInternals, updateHuInternalsStatus } from '../api/FileUpload.api.js';
import DataTable from 'datatables.net';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import $ from 'jquery'

DataTable.use(DT);

const FileUploadPage = ({ scannedHuInternals = [] }) => {
    const [file, setFile] = useState(null);
    const [huInternalsState, setHuInternalsState] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Extraer y comparar datos del archivo
            const response = await extractAndCompareFile(file);
            if (response.status === 200) {
                toast.success('Archivo procesado con éxito');
                const huInternals = response.data.huInternals || [];
                // Guardar los datos extraídos
                await saveHuInternals(huInternals);
                setHuInternalsState(huInternals);
            } else {
                toast.error(response.data.error || 'Error al procesar el archivo');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al procesar el archivo');
        }
    };

    useEffect(() => {
        // Cargar datos desde el backend cuando el componente se monta
        const fetchHuInternals = async () => {
            try {
                const response = await getHuInternals();
                setHuInternalsState(response.data.huInternals || []);
            } catch (error) {
                console.error('Error fetching HU internals:', error);
            }
        };

        fetchHuInternals();
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Subir Archivo Excel</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Subir Archivo
                </button>
            </form>
            <DataTable
                data={huInternalsState}
                columns={[
                    { title: 'HUInternal', data: 'hu_internal' },
                    {
                        title: 'Estado',
                        data: 'estado',
                        render: (data) => data === 'Ingreso a 2a revisión'
                            ? '<i class="fas fa-check text-green-500"></i>'
                            : '<i class="fas fa-times text-red-500"></i>'
                    }
                ]}
                className="display"
            />
        </div>
    );
};

export default FileUploadPage;