import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ScannerPage from './pages/scannerpage.jsx';
import { ScannerFormPage } from './pages/ScannerFormPage.jsx';
import SalesPage from './pages/salespage.jsx';
import { SalesFormPage } from './pages/salesformpage.jsx';
import { Navigation } from './components/Navigation.jsx';
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import HuGeneratedPage from './pages/HuGeneratedPage.jsx';
import { HuGeneratedForm } from './pages/HuGeneratedForm.jsx';
import Navbar from './components/Navbar';
import Logo from './components/Footer.jsx';
import FileUploadPage from './pages/FileUploadPage.jsx'; // Importa el nuevo componente
import { getHuInternals } from './api/FileUpload.api.js'; // Asegúrate de que la ruta sea correcta
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const [huInternalsState, setHuInternalsState] = useState([]);

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
  }, []);

  const containsId = (pathname) => {
    const idPattern = /\/\d+$/; // Patrón para detectar un ID al final de la ruta
    return idPattern.test(pathname);
  };

  return (
    <div className="flex h-screen">
      {location.pathname !== '/login' && !containsId(location.pathname) && <Navigation />}
      <div className="flex flex-col flex-1">
        {isAuthenticated && location.pathname !== '/login' && <Navbar />}
        <div className={`flex-1 overflow-auto ${isAuthenticated && location.pathname !== '/login' ? 'pt-12' : ''}`}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Navigate to='/ScannerPage' />} />
            <Route
              path='/ScannerPage'
              element={
                <ProtectedRoute>
                  <ScannerPage huInternalsState={huInternalsState} setHuInternalsState={setHuInternalsState} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/Search-Hu'
              element={
                <ProtectedRoute>
                  <ScannerFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/Search-Hu/:id'
              element={
                <ProtectedRoute>
                  <ScannerPage huInternalsState={huInternalsState} setHuInternalsState={setHuInternalsState} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/SalesPage'
              element={
                <ProtectedRoute>
                  <SalesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/Sales-list'
              element={
                <ProtectedRoute>
                  <SalesFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/Sales-list/:id'
              element={
                <ProtectedRoute>
                  <SalesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/HuGenerated'
              element={
                <ProtectedRoute>
                  <HuGeneratedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/HuGenerated/:id'
              element={
                <ProtectedRoute>
                  <HuGeneratedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/HuGenerated-form'
              element={
                <ProtectedRoute>
                  <HuGeneratedForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/FileUploadPage'
              element={
                <ProtectedRoute>
                  <FileUploadPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Logo />
      </div>
      <Toaster />
    </div>
  );
}

export default App;