import { useAuth } from '../context/AuthContext.jsx';

// Función para extraer el nombre completo
const getUserFullName = () => {
    const { user } = useAuth();

    if (!user) {
        return "Invitado"; // Valor por defecto en caso de que no haya usuario autenticado
    }

    return `${user.first_name} ${user.last_name}`;
};

export default getUserFullName;