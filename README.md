LogicTrack
Esta aplicación web está enfocada en la lógica del seguimiento y manejo de las unidades de manipulación (Handling Units), permitiendo la creación de gráficos y herramientas de administración de datos mediante una interfaz sencilla de usar.
- Seguimiento de Handling Units
- Creación y visualización de gráficos
- Administración de datos
- Interfaz de usuario intuitiva
- Implementacion de una base de datos
  ## Instalación
Sigue estos pasos para instalar y configurar el proyecto:

### Backend
1. Clona el repositorio:
    ```bash
    git clone https://github.com/EjosueRam/LogicTrack.git
    ```

2. Crea y activa un entorno virtual:
    ```bash
    python -m venv env
    source env/bin/activate  # En Windows usa `env\Scripts\activate`
    ```

3. Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

4. Realiza las migraciones y ejecuta el servidor:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend
1. Navega al directorio del frontend:
    ```bash
    cd ../frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Inicia la aplicación:
    ```bash
    npm start
    ```

## Uso
Una vez que el servidor backend y la aplicación frontend estén en funcionamiento, puedes acceder a la aplicación en tu navegador en `http://localhost:5173`.

## Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`)
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
