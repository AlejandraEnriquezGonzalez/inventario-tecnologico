## Sistema de Inventario de Equipamiento Tecnológico

**Estudiante:** Alejandra Enríquez González

## 1. Descripción del proyecto

Aplicación web para gestionar el inventario de equipamiento tecnológico. Permite registrar, consultar, buscar, filtrar, editar y eliminar equipos, manteniendo la información almacenada de forma persistente en una base de datos MySQL.

## 2. Tecnologías utilizadas

- **Frontend:** Vue.js y Vite.
- **Backend:** Node.js y NestJS.
- **API:** API REST desarrollada con NestJS.
- **ORM:** TypeORM.
- **Base de datos:** MySQL.
- **Validaciones:** class-validator.
- **Control de versiones:** Git y GitHub.

## 3. Funcionalidades

- Registrar equipos tecnológicos.
- Consultar el listado de equipos.
- Buscar y filtrar equipos.
- Visualizar el detalle de cada equipo.
- Editar la información de los equipos.
- Eliminar equipos mediante confirmación.
- Validar los datos enviados a la API.
- Almacenar la información de forma persistente en MySQL.
- Mostrar los resultados de las operaciones realizadas.

## 4. Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- MySQL, que puede ejecutarse mediante XAMPP.
- Visual Studio Code u otro editor de código.
- Git.

## 5. Configuración de la base de datos

La base de datos utilizada se llama `inventario_tecnologico` y se administra mediante MySQL.

Para configurarla:

1. Iniciar MySQL desde XAMPP.
2. Abrir phpMyAdmin en el navegador.
3. Crear la base de datos ejecutando la siguiente instrucción SQL:

   ```sql
   CREATE DATABASE inventario_tecnologico;
   ```
4. Configurar las variables de conexión en el archivo `backend/.env`.
5. Iniciar el backend para que TypeORM genere la tabla `equipos`, de acuerdo con la configuración del proyecto.

La base de datos debe estar disponible antes de iniciar el backend. Para ejecutar el proyecto en otro equipo, se debe crear la base de datos y configurar las credenciales correspondientes al entorno local.

## 6. Configuración y ejecución del backend

Desde una terminal ubicada en la carpeta raíz del proyecto, ejecutar:

```bash
cd backend
npm install
```

Crear un archivo llamado `.env` dentro de la carpeta `backend`, tomando como referencia el archivo `.env.example`.

Configurar las siguientes variables según el entorno local:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=inventario_tecnologico
```

Los valores deben ajustarse a la configuración de MySQL. Si el usuario de la base de datos tiene contraseña, se debe indicar en `DB_PASSWORD`.

**Importante:** el archivo `.env` contiene la configuración local y no debe publicarse en GitHub. Para compartir la configuración de referencia se utiliza `.env.example`, sin contraseñas reales.

Instalar las dependencias e iniciar el servidor:

```bash
npm run start:dev
```

La API estará disponible en:

`http://localhost:3000`

## 7. Configuración y ejecución del frontend

Abrir una segunda terminal desde la carpeta raíz del proyecto y ejecutar:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador. Por defecto, es:

`http://localhost:5173`

El backend y el frontend deben estar ejecutándose para utilizar la aplicación correctamente.

## 8. Endpoints de la API


| Método HTTP | Endpoint       | Descripción                       |
| -------------- | ---------------- | ------------------------------------ |
| GET          | `/equipos`     | Obtener el listado de equipos.     |
| GET          | `/equipos/:id` | Consultar el detalle de un equipo. |
| POST         | `/equipos`     | Registrar un nuevo equipo.         |
| PATCH        | `/equipos/:id` | Actualizar los datos de un equipo. |
| DELETE       | `/equipos/:id` | Eliminar un equipo.                |

## 9. Estructura general del proyecto

```text
inventario-tecnologico/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── equipos/
│       │   ├── dto/
│       │   ├── entities/
│       │   ├── equipos.controller.ts
│       │   ├── equipos.service.ts
│       │   └── equipos.module.ts
│       ├── app.module.ts
│       └── main.ts
├── frontend/
│   ├── package.json
│   └── src/
│       ├── services/
│       ├── App.vue
│       └── style.css
├── .gitignore
└── README.md
```

## 10. Datos de prueba

La base de datos del entorno de desarrollo contiene al menos cinco registros de equipamiento tecnológico, utilizados para comprobar las funcionalidades de consulta, búsqueda, edición y eliminación.

## 11. Pruebas realizadas

- Registro y consulta de equipos.
- Edición de información.
- Eliminación con confirmación.
- Búsqueda y filtrado de equipos.
- Validación de campos obligatorios.
- Rechazo de nombres con menos de tres caracteres.
- Rechazo de fechas de adquisición futuras.
- Verificación de la persistencia de los datos en MySQL.

## 12. Uso de herramientas de inteligencia artificial

Durante el desarrollo del proyecto se utilizó **ChatGPT, de OpenAI**, como herramienta de apoyo.

**Tareas en las que se utilizó:**

- Comprensión de conceptos relacionados con el desarrollo de una API REST con NestJS y la conexión con MySQL mediante TypeORM.
- Apoyo en la implementación y revisión de las operaciones de registro, consulta, edición y eliminación de equipos.
- Depuración de errores y mejora de las validaciones de los datos.
- Orientación para desarrollar la interfaz con Vue.js y documentar el proyecto en el archivo README.md con todos los requisitos pedidos.

**Tipo de apoyo recibido:** explicación de conceptos, generación y revisión de fragmentos de código, depuración de errores, orientación técnica y revisión de documentación.

**Revisión realizada por la estudiante:** las propuestas obtenidas se revisaron y adaptaron a la estructura del proyecto. Se realizaron pruebas de las funcionalidades, se verificó la persistencia de los registros en MySQL y se comprobaron las validaciones implementadas. Los cambios se incorporaron progresivamente según los resultados de las pruebas.

La herramienta de inteligencia artificial se utilizó como apoyo durante el proceso de desarrollo. Sus resultados fueron revisados antes de incorporarlos al proyecto.
