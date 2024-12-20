import { useEffect, useState } from 'react';
import { getAllScans } from '../api/Scan.api.js';
import { ScanCard } from './ScanCard.jsx';
import { ScanChart } from "./ScanChart.jsx";
import * as XLSX from 'xlsx';
import EditableTable from '../components/EditableTable.jsx';
import ReactPaginate from 'react-paginate';

export function ScanList() {
  const [scan, setScan] = useState([]);
  const [huSearch, setHuSearch] = useState(''); // Estado para HU
  const [startDate, setStartDate] = useState(''); // Estado para la fecha/hora de inicio
  const [endDate, setEndDate] = useState(''); // Estado para la fecha/hora de fin
  const [filteredScan, setFilteredScan] = useState([]); // Estado para los escaneos filtrados
  const [showChart, setShowChart] = useState(false);
  const [showDefectosEmpaque, setShowDefectosEmpaque] = useState(false); // Estado para mostrar la mini tabla
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
  const [itemsPerPage] = useState(10); // Número de elementos por página

  /**
   * Exports filtered data to an Excel file by creating a worksheet and adding it to a workbook.
   * The resulting file is saved to the specified name.
   *
   * @param {Array<Object>} filteredData - Array of objects representing the filtered data. Each object corresponds to a row, and its keys correspond to column names.
   * @return {void} This method does not return a value as it directly writes the Excel file to the filesystem.
   */
  const handleExportExcel = (filteredData) => {
    // Crear una hoja de cálculo a partir de los datos filtrados
    /**
     * Represents a worksheet generated from a JSON array.
     *
     * The `worksheet` variable stores tabular data converted into a worksheet format,
     * utilizing the `json_to_sheet` function provided by the XLSX library. This worksheet
     * can be further utilized for generating Excel files or other spreadsheet formats.
     *
     * The `filteredData` parameter passed to `json_to_sheet` is typically an array of
     * objects where each object represents a row in the sheet, and its properties
     * represent the columns.
     *
     * @type {Object}
     */
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Crear un libro de trabajo
    /**
     * Represents a new workbook instance created using the XLSX library.
     * Provides an object to define sheets, manipulate data, and export files in spreadsheet formats.
     */
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Filtrados');

    // Exportar el archivo Excel
    XLSX.writeFile(workbook, 'resultado_filtro.xlsx');
  };

  useEffect(() => {
    async function LoadScan() {
      const res = await getAllScans();
      const sortedData = res.data.sort((a, b) => new Date(b.date_hour) - new Date(a.date_hour));
      setScan(sortedData);
      setFilteredScan(sortedData);

      // Establecer la página actual al mes más reciente
      /**
       * A string representing the most recent month and year in a human-readable format.
       * It is derived from the first entry of a sorted dataset containing date and time information.
       * The value is formatted to display the month name in full and the year in numeric form.
       */
      const mostRecentMonthYear = new Date(sortedData[0].date_hour).toLocaleString('default', { month: 'long', year: 'numeric' });
      const monthYears = Object.keys(scansByMonthYear(sortedData));
      setCurrentPage(monthYears.indexOf(mostRecentMonthYear));
    }
    LoadScan();
  }, []);

  // Función para buscar por HU
  const handleSearchByHu = () => {
    const filteredByHu = scan.filter((scanItem) => {
      const hu = scanItem.hu.toLowerCase();
      const search = huSearch.toLowerCase();
      return hu.includes(search) || hu.endsWith(search);
    });
    setFilteredScan(filteredByHu);
  };

  // Función para buscar por rango de fechas y horas
  const handleSearchByDate = () => {
    if (!startDate && !endDate) {
      setFilteredScan(scan); // Si no hay fechas seleccionadas, mostrar todos los elementos
      return;
    }

    const filteredByDate = scan.filter((scanItem) => {
      const scanDate = new Date(scanItem.date_hour); // Convertir la fecha del scan a objeto Date
      return (
        (!startDate || scanDate >= new Date(startDate)) &&
        (!endDate || scanDate <= new Date(endDate))
      );
    });

    setFilteredScan(filteredByDate);
  };

  // Función para alternar la visibilidad de la gráfica
  const handleShowChart = () => {
    setShowChart(prevShowChart => !prevShowChart); // Alternar el estado de showChart
  };

  // Función para alternar la visibilidad de la mini tabla de defectos de empaque
  const handleShowDefectosEmpaque = () => {
    setShowDefectosEmpaque(prevShowDefectosEmpaque => !prevShowDefectosEmpaque);
  };

  // Función para agrupar los escaneos por mes y año
  const scansByMonthYear = (scans) => {
    return scans.reduce((acc, scanItem) => {
      const monthYear = new Date(scanItem.date_hour).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(scanItem);
      return acc;
    }, {});
  };

  const monthYears = Object.keys(scansByMonthYear(filteredScan));
  const currentScans = filteredScan.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Filtrar los HU con motivo "Defecto de Empaque"
  const defectosEmpaque = scan.filter(scanItem => scanItem.motivo === 'Defecto de Empaque');

  // Manejar el cambio de página
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="bg-white min-h-screen w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex mb-4 w-full mx-auto">
        {/* Input para buscar por HU */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar por HU"
            value={huSearch}
            onChange={(e) => setHuSearch(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearchByHu}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
          >
            🔍
          </button>
        </div>

        {/* Inputs para buscar por rango de fechas y horas */}
        <div className="flex items-center ml-4">
          <input
            type="datetime-local"
            placeholder="Fecha inicio"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="datetime-local"
            placeholder="Fecha fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearchByDate}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out flex items-center"
          >
            <span className="mr-2">🗓️</span>
          </button>
        </div>

        <div className="flex items-center ml-4">
          <button
            onClick={() => handleExportExcel(filteredScan)}
            className="bg-green-700 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out flex items-center"
          >
            <span className="mr-2">📊</span>
            <span className="text-sm">Exportar a Excel</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-4 w-full">
        <button
          onClick={handleShowChart}
          className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          {showChart ? 'Ocultar Gráfica' : 'Mostrar Gráfica'}
        </button>
      </div>

      <div className="flex justify-end mb-4 w-full">
        <button
          onClick={handleShowDefectosEmpaque}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          {showDefectosEmpaque ? 'Ocultar Defectos de Empaque' : 'Mostrar Defectos de Empaque'}
        </button>
      </div>

      {/* Mostrar la mini tabla de defectos de empaque si showDefectosEmpaque es true */}
      {showDefectosEmpaque && <EditableTable defectosEmpaque={defectosEmpaque} />}

      {/* Mostrar la gráfica si showChart es true */}
      {showChart && <ScanChart filteredData={filteredScan} />}

      {/* Mostrar los resultados filtrados */}
      <div className="min-w-full divide-y divide-gray-200 rounded-lg shadow-lg w-full">
        {currentScans.length > 0 ? (
          currentScans.map((scanItem) => (
            <ScanCard key={scanItem.id} scanItem={scanItem} />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>

      {/* Barra de navegación por meses y años */}
      <div className="flex justify-center mt-4">
       {monthYears.map((monthYear, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`px-4 py-2 mx-1 rounded ${index === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {monthYear}
          </button>
        ))}
      </div>

      {/* Paginación */}
      <ReactPaginate
        previousLabel={'← Anterior'}
        nextLabel={'Siguiente →'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(filteredScan.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center space-x-2 mt-4'}
        activeClassName={'active bg-blue-500 text-white'}
        pageClassName={'px-3 py-1 border rounded'}
        previousClassName={'px-3 py-1 border rounded'}
        nextClassName={'px-3 py-1 border rounded'}
        breakClassName={'px-3 py-1 border rounded'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
}