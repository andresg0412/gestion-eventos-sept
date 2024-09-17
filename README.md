# Prueba German Andrés Gamboa - Desarrollador


## Contenido
1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Características](#características)
4. [Instalación](#instalación)
5. [Creación Base de datos](#base-de-datos)
6. [Configuración](#configuración)
7. [Ejecución](#ejecución)
8. [Desarrollo en Host Público](#desarrollo-en-host-público)
9. [Tecnologías Utilizadas](#tecnologías-utilizadas)
10. [Backend](#backend)
11. [Bases de datos](#bases-de-datos)
12. [DevOps](#devops)
13. [Pruebas](#pruebas)
14. [Despliegue](#despliegue)
15. Diagrama Arquitectonico
16. [Video de explicación](#video-de-explicación)


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

## Creación base de datos

En tu entorno local crea una base de datos MySQL, y luego con el archivo que encontraras en /backend/create_tables.sql copia ese codigo y ejecutalo en la consola de la base de datos, esto creara las tablas de bases de datos con sus respectivos indices y relaciones.

## Configuración
1. Crea un archivo `.env` en la carpeta del backend con las siguientes variables de entorno (tener en cuenta las credenciales de bases de datos que acabas de crear en el punto anterior):
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


## Desarrollo en Host Público

Para la prueba, he desplegado el proyecto usando Docker y GitHub en un servidor AWS, la base de datos también es de AWS, se puede ver en:

>[!NOTE]
>http://3.87.46.194:5001/


## Tecnologías Utilizadas

| Área              | Tecnologías                                      |
| ----------------- | ------------------------------------------------ |
| **Backend**       | Node.js, Express, JWT                            |
| **Frontend**      | React, Javascript, Axios, Redux                  |
| **Base de datos** | MySQL (AWS)                                      |
| **Contenedores**  | Doker, docker-compose                            |
| **Despliegue**    | AWS                                              |


## Bases de datos

En la siguiente imagen represento graficamente las tablas y sus relaciones de la base de datos, la cual consta de 3 tablas: Users, Events y Attendees, teniendo una relación entre Users y Events de 1 a muchos, ya que un usuario puede crear muchos eventos y un evento puede ser creado por un usuario. Y la relación entre Events y Attendees de muchos a muchos.

![Untitled](https://github.com/user-attachments/assets/e10bf526-f981-4ac8-9e7e-674968fcff86)

### Scripts DDL

Los scripts DDL los puedes encontrar en:
https://github.com/andresg0412/gestion-eventos-sept/blob/main/backend/create_tables.sql

### Scripts DML

Estos Scripts son manejados solamente por los archivos repository como UserRepository, que son los encargados de hacer las consultas a las bases de datos, acontinuación referencio algunos de los usados:
- SELECT * FROM attendees
- SELECT * FROM attendees WHERE id = ?
- INSERT INTO attendees (event_id, user_id) VALUES (?, ?)
- DELETE FROM attendees WHERE id = ?
- SELECT * FROM attendees WHERE event_id = ?
- SELECT * FROM attendees WHERE user_id = ?
- SELECT * FROM attendees WHERE email = ? AND event_id = ?
- INSERT INTO attendees (name, email, event_id, user_id) VALUES (?, ?, ?, ?)
- SELECT * FROM users WHERE id = ?
- SELECT * FROM events WHERE id = ?
- INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)
- UPDATE users SET username = ?, email = ? WHERE id = ?


## Backend

En el backend desarrollado con Nodejs y Express, consta de una arquitectura en el que la intención es separar por capas para procesar las peticiones, teniendo cada capa y cada clase una función especifica, las capas de Application, Domain e Infrastructure componen el proyecto, en la siguiente ilustración se puede ser la ruta que recorre una petición cuando llega al backend, y cada una tiene una función especifica, igualmente en el video doy una explicación más detallada.

![Untitled (1)](https://github.com/user-attachments/assets/44a9090b-e2a6-4933-85fb-ffa2441a7b26)


## DevOps

En cuanto a herramientas DevOps, el proyecto esta dockerizado y funcionando sin ningun problema con solo levantar el contenedor, con este contenedor fue desplegado en servidor AWS.

### CI/CD

Para implementar un flujo de integración y despliegue continuo (CI/CD) usaría GitHub Actions. Primero, crearía un archivo de configuración .yml dentro de la carpeta .github/workflows/, donde definiría los pasos necesarios para ejecutar las pruebas, construir la aplicación y realizar el despliegue (en el repositorio ya esta este archivo creado y con la configuración inicial que usaría). En cada push o pull request, GitHub Actions desencadenaría automáticamente el flujo.
Definiría jobs para construir la app, ejecutar los tests unitarios y, si todo pasa correctamente, hacer el despliegue en un entorno de producción o staging, utilizando un proveedor como AWS o Heroku. Configuraría secretos en GitHub para almacenar las credenciales de acceso seguro a los servidores. También agregaría notificaciones de éxito o fallo en el flujo, para asegurarme de que el equipo esté informado.
Esto permitiría tener un flujo automatizado, fiable y sin intervención manual, asegurando que cada cambio pase por los pasos necesarios antes de llegar a producción.

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

## Video de explicación

Dejo el enlace de explicación del reto:

<a href="https://drive.google.com/file/d/1APnuO4XfZwTilCjD9CWlG7DrWqEkGZ6n/view?usp=drive_link" style="background-color:#4CAF50;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;">Ver video</a>
