import React from "react";
import { useNavigate } from "react-router-dom";

const HuGeneratedCard = ({ huGenerated }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full bg-white p-4 hover:bg-indigo-50 transition duration-200 ease-in-out cursor-pointer flex items-center border-b last:border-none border-gray-200"
      onClick={() => navigate(`/HuGenerated/${huGenerated.id}`)}
    >
      <div className="w-full flex flex-wrap justify-between items-center text-sm">
        <CardItem label="Fecha y Hora" value={huGenerated.Date_time} />
        <CardItem label="Hu Generada" value={huGenerated.huGenerated} />
        <CardItem label="Hu" value={huGenerated.hu} />
        <CardItem label="Material" value={huGenerated.material} />
        <CardItem label="Persona" value={huGenerated.person} />
        <CardItem label="Motivo" value={huGenerated.reason} />
        <CardItem label="Solicitante" value={huGenerated.requester} />
        {huGenerated.huByGenerated && (
          <CardItem label="Hu por la que se generó" value={huGenerated.huByGenerated} />
        )}
      </div>
    </div>
  );
};

/**
 * Componente simple para representar un atributo del `HuGeneratedCard`
 * @param {*} param0
 * @returns
 */
const CardItem = ({ label, value }) => (
  <div className="flex-1 px-2 py-1">
    <p className="text-gray-500 font-semibold">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default HuGeneratedCard;