import React, { useState, useEffect } from 'react';

const HuSearchTable = ({ onHuChange }) => {
  const [hu1, setHu1] = useState('');
  const [hu2, setHu2] = useState('');
  const [hu3, setHu3] = useState('');
  const [hu4, setHu4] = useState('');

  useEffect(() => {
    // Cargar HU desde localStorage al montar el componente
    const savedHu1 = localStorage.getItem('hu1');
    const savedHu2 = localStorage.getItem('hu2');
    const savedHu3 = localStorage.getItem('hu3');
    const savedHu4 = localStorage.getItem('hu4');
    if (savedHu1) setHu1(savedHu1);
    if (savedHu2) setHu2(savedHu2);
    if (savedHu3) setHu3(savedHu3);
    if (savedHu4) setHu4(savedHu4);
  }, []);

  useEffect(() => {
    // Guardar HU en localStorage cada vez que cambien
    localStorage.setItem('hu1', hu1);
    localStorage.setItem('hu2', hu2);
    localStorage.setItem('hu3', hu3);
    localStorage.setItem('hu4', hu4);
    onHuChange([hu1, hu2, hu3, hu4]);
  }, [hu1, hu2, hu3, hu4, onHuChange]);

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold mb-4">Buscar HU Específicos</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={hu1}
          onChange={(e) => setHu1(e.target.value)}
          placeholder="HU 1"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={hu2}
          onChange={(e) => setHu2(e.target.value)}
          placeholder="HU 2"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={hu3}
          onChange={(e) => setHu3(e.target.value)}
          placeholder="HU 3"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={hu4}
          onChange={(e) => setHu4(e.target.value)}
          placeholder="HU 4"
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

export default HuSearchTable;