# Prueba German Andrés Gamboa - Desarrollador


## Contenido
1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Características](#características)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Ejecución](#ejecución)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Pruebas](#pruebas)
9. [Despliegue](#despliegue)


## Descripción del proyecto
Este proyecto es una aplicación web de gestión de eventos. El backend utiliza **Node.js** y **Express**, el frontend está en construcción con **React**, y la base de datos está gestionada con **MySQL**. El proyecto está dockerizado para facilitar el despliegue en diferentes entornos. El objetivo principal de la aplicación es permitir a los usuarios crear, editar, eliminar y visualizar eventos, crear asistentes, así como a los interesados en asistir a eventos poderse registrar.


>[!NOTE]
>Probablemente el frontend no este terminado con estilos, pero implementa las funcionalidades del backend


## Características
- Crear, editar y eliminar eventos.
- Listar eventos.
- Registro de asistentes.
- Listar asistentes en general o asistentes de un evento.
- Ubicaciones cercanas a un evento (API Mapbox)
- Carga masiva (excel) de eventos y asistentes.
- Autenticación de usuarios.
- Protección de rutas mediante token JWT.
- Conexión segura con la base de datos MySQL.



## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/andresg0412/gestion-eventos-sept.git
   ```

>[!NOTE]
>Se clonará el proyecto completo el cual consta de una carpeta /backend, /frontend, .docker-compose.yml


2. Navega al directorio del backend e instala las dependencias:
   ```bash
   cd backend
   npm install
   ```


3. Navega al directorio del frontend e instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```


## Configuración
1. Crea un archivo `.env` en la carpeta del backend con las siguientes variables de entorno:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=eventos
   PORT=5001
   JWT_SECRET=supersecreto
   ```
   
>[!IMPORTANT]
>Para ejecutar el proyecto en entorno local necesitaras este archivo .env . 
> Pero para ejecutarlo en docker no, ya que se comunicará automáticamente a una base de datos de prueba en AWS


2. Configura las variables de entorno en el frontend creando un archivo `.env`:
   ```bash
   REACT_APP_API_URL=http://localhost:5001
   ```


## Ejecución

### Desarrollo
1. Iniciar el backend:
   ```bash
   cd backend
   npm start
   ```

2. Iniciar el frontend:
   ```bash
   cd frontend
   npm start
   ```


### Docker

>[!NOTE]
>Asegurate de tener docker instalado

1. Construir y levantar los servicios con Docker:
   ```bash
   docker-compose up --build
   ```

2. El frontend estará disponible en `http://localhost` y el backend en `http://localhost:5001`.



## Tecnologías Utilizadas

| Área              | Tecnologías                                      |
| ----------------- | ------------------------------------------------ |
| **Backend**       | Node.js, Express, JWT                            |
| **Frontend**      | React, Javascript, Axios, Redux                  |
| **Base de datos** | MySQL (AWS)                                      |
| **Contenedores**  | Doker, docker-compose                            |
| **Despliegue**    | AWS                                              |

## Pruebas
Este proyecto utiliza **Jest** y **Supertest** para las pruebas del backend.


### Ejecutar pruebas en el backend:
```bash
cd backend
npm test


## Despliegue
Para desplegar este proyecto en un servidor de producción, sigue estos pasos:


### Despliegue con Docker
1. Genera la imagen de Docker:
   ```bash
   docker build -t tu-imagen-backend .
   docker build -t tu-imagen-frontend .
   ```

2. Sube las imágenes a tu registro de Docker:
   ```bash
   docker push tu-imagen-backend
   docker push tu-imagen-frontend
   ```

3. En tu servidor, ejecuta el archivo `docker-compose.yml` para levantar los contenedores:
   ```bash
   docker-compose up -d
   ```

