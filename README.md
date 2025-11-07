# 💻 Trabajo Final Integrador | Programación III 2025 - 2do cuatrimestre
# 👨‍💻 Grupo-AL: Andres Labra, Demian Diak, Ezequiel Sanchez, Micaela Ortiz #

Diseñamos y desarrollamos una API REST para la gestión de reservas de salones de cumpleaños. Utilizamos **Node.js** + **Express**. La aplicación está estructurada con una arquitectura en capas y contempla las buenas prácticas vistas en clase.
Incluye:
- Autenticación con JWT + Passport y autorización por roles
- Validación de datos haciendo uso de middleware express-validator
- Documentación Swagger. 
- Funcionalidad extra: dashboard de Informes Estadísticos en HTML, CSS y JavaScript.

---

# 🔒 **Ejemplo de archivo .env**
```
PORT=3000

DB_HOST=localhost
DB_USER=administradorTFIPROG3
DB_PASSWORD=passadministradorTFIPROG3!
DB_NAME=reservas

EMAIL_USER=programacion3ejemplo@gmail.com
EMAIL_PASS=clavedeaplicacion

JWT_SECRET=claveJWTGrupoAL
```
---

## 📋 Configuración e instalación de la app

### 1. Configuración de base de datos

Crear un usuario administrador con todos los privilegios en MySQL para la tabla reservas:
```sql
CREATE USER 'administradorTFIPROG3'@'localhost' IDENTIFIED BY 'passadministradorTFIPROG3!';
```
```sql
GRANT ALL PRIVILEGES ON reservas.* TO 'administradorTFIPROG3'@'localhost';
```
```sql
FLUSH PRIVILEGES;
```

### 2. Importar procedimientos almacenados en MySQL

Importar el archivo `estadisticasProcedAlma.sql` ubicado en la carpeta `database/` del proyecto.

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto. En el punto anterior se muestra el ejemplo de variables de entorno.

### 4. Instalar dependencias
```bash
npm install
```

### 5. Iniciar el servidor
```bash
npm run dev
```

El servidor estará disponible en 👉 `http://localhost:3000`

### 6. Documentación Swagger UI

La documentación de la API estará disponible en 👉 `http://localhost:3000/api-docs`

### 7. Funcionalidad extra - Dashboard de Informes Estadísticos

El dashboard se encuentra disponible sin autenticación, con fines prácticos de demostración.

Se puede visualizar en 👉 `http://localhost:3000/api/v1/estadisticas/dashboard`

---

## 🎨 Funcionalidad Extra: Dashboard de Informes Estadísticos

El dashboard está desarrollado en HTML, CSS y JavaScript. Visualiza las estadísticas en tiempo real sobre los salones, servicios y turnos más solicitados del sistema de reservas. Los datos se actualización automáticamente al cargar la página.

 ** 💡 Importante: **
El dashboard se encuentra disponible sin autenticación con fines prácticos de demostración.
Se puede visualizar, una vez iniciado el servidor e importado los procedimientos almacenados, en 👉 http://localhost:3000/api/v1/estadisticas/dashboard

### Características

- Los datos son generados mediante procedimientos almacenados ubicados en `src/scripts/estadisticasProcedAlma.sql`:

    - **`sp_salones_mas_reservados()`**: Devuelve salones ordenados por cantidad de reservas e ingresos
    - **`sp_servicios_mas_solicitados()`**: Devuelve servicios ordenados por veces solicitado e ingresos
    - **`sp_turnos_mas_reservados()`**: Devuelve turnos ordenados por cantidad de reservas

- Arquitectura en capas (Router → Controlador → Servicio → Capa de datos)
- Frontend con Fetch API para comunicación asíncrona
- Diseño responsive con CSS Grid

### Endpoints del dashboard de Informes Estadísticos

#### Rutas públicas (sin autenticación)
```
GET /api/v1/estadisticas/dashboard           # Vista HTML del dashboard
GET /api/v1/estadisticas/dashboard/salones   # Datos de salones (JSON)
GET /api/v1/estadisticas/dashboard/servicios # Datos de servicios (JSON)
GET /api/v1/estadisticas/dashboard/turnos    # Datos de turnos (JSON)
```

#### Rutas protegidas (requieren autenticación de administrador)
```
GET /api/v1/estadisticas/salones-mas-reservados
GET /api/v1/estadisticas/servicios-mas-solicitados
GET /api/v1/estadisticas/turnos-mas-reservados
```

### Características de diseño

- Utilizamos el mismo sistema de diseño que el proyecto realizado en la materia Introduccción a la Programación, con el fin de alcanzar la coherencia estética y reutilizar el UI Kit ya creado
- Grid responsive adaptable a móviles, tablets y desktop
- Estados de carga y manejo de errores

---

## 📁 Estructura del Proyecto

```bash
TFI-GrupoAl/
│
├── 📂 src/
│   ├── 🧠 servidor.js                 # Configuración de Express () --- Inicia y configura el servidor---
│   ├── 🚀 reservas.js                 # Punto de entrada de la app -- Configura la aplicación Express---
│   ├── 📘 swagger.js                  # Configuración de Swagger  --- Genera y muestra la documentación Swagger de la API. --
│   │
│   ├── 📂 database/                   # Conexión y consultas SQL
│   │   ├── conexion.js
│   │   ├── estadisticas.js
│   │   ├── reservas.js
│   │   ├── reservas_servicios.js
│   │   ├── salones.js
│   │   ├── servicios.js
│   │   ├── turnos.js
│   │   └── usuarios.js
│   │
│   ├── 📂 controllers/                # Gestionan la lógica entre rutas y servicios
│   │   ├── usuariosControlador.js
│   │   ├── reservasControlador.js
│   │   ├── salonesControlador.js
│   │   ├── serviciosControlador.js
│   │   ├── turnosControlador.js
│   │   └── estadisticasControlador.js
│   │
│   ├── 📂 services/                   # Capa intermedia: lógica de negocio y consultas SQL
│   │   ├── estadisticasServicio.js
│   │   ├── informeServicio.js 
│   │   ├── notificacionesServicio.js
│   │   ├── usuariosServicio.js 
│   │   ├── reservasServicio.js
│   │   ├── salonesServicio.js
│   │   ├── serviciosServicio.js
│   │   └── turnosServicio.js
│   │
│   ├── ⚙️ middlewares/                
│   │   ├── autenticacion.js      # Autenticación JWT con Passport
│   │   ├── autorizar.js          # Autorización según rol de usuario
│   │   ├── passport.js           # Configuración de estrategia Passport JWT
│   │   ├── validarCampos.js      
│   │   ├── validarReservas.js    
│   │   ├── validarSalones.js     
│   │   ├── validarUsuarios.js    
│   │   ├── validarTurnos.js      
│   │   └── validarServices.js    
│   │
│   ├── 📜 scripts/
│   │   └── estadisticasProcedAlma.sql   # Procedimientos almacenados para estadísticas
│   │
│   ├── 🌐 v1/
│   │   └── routes/                     
│   │       ├── estadisticasRouter.js
│   │       ├── usuariosRouter.js
│   │       ├── reservasRouter.js
│   │       ├── salonesRouter.js
│   │       ├── serviciosRouter.js
│   │       └── turnosRouter.js
│   │
│   ├── 💬 views/                       # Plantillas Handlebars
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   └── pages/
│   │       ├── informePDF.handlebars
│   │       └── reservaCreada.handlebars
│   │
│   └── 🧰 utils/
│       ├── JWT.js                      # Generación/verificación de tokens JWT
│       └── reservas.csv
│ 
├── 🎨 public/                          # Recursos estáticos del frontend
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── dashboard.js                # Lógica del dashboard
│   ├── img/
│   ├── uploads/
│   └── dashboard.html
│
├── ⚙️ .env                             # Variables de entorno
├── 🚫 .gitignore
├── 📦 package.json
└── 📦 package-lock.json
```
---

### 📓 Gestión de roles y permisos

#### Clientes
- Autenticación mediante JWT
- Crear y listar reservas
- Consultar salones, servicios y turnos disponibles
- Recibir notificaciones automáticas por email al confirmar reservas

#### Empleados
- Autenticación mediante JWT
- Visualizar listado de reservas y clientes
- BREAD completo para:
  - salones
  - servicios
  - turnos

#### Administradores
- Autenticación mediante JWT
- BREAD completo de todas las entidades:
  - reservas
  - salones
  - servicios
  - turnos
  - usuarios
- Generación de informes estadísticos mediante procedimientos almacenados
- Exportación de reportes en PDF y CSV
- Recepción de notificaciones automáticas cuando se realiza una reserva

---

### 📚 Aspectos técnicos:

- Los delete no son borrados físicos, utilizamos soft delete.
- Solo los administradores pueden modificar reservas.
- Los informes estadísticos se generan mediante procedimientos almacenados.
- Los informes PDF contienen: datos de reserva, servicios, salón, turno y cliente


---

## 📌 Endpoints de la API

### Autenticación
```
POST   /api/v1/usuarios/login          # Iniciar sesión
```

### Usuarios
```
GET    /api/v1/usuarios                # Listar usuarios (Admin, Empleado)
GET    /api/v1/usuarios/:id            # Obtener usuario por ID (Admin, Empleado)
POST   /api/v1/usuarios                # Crear usuario (público)
PUT    /api/v1/usuarios/:id            # Actualizar usuario (Admin)
DELETE /api/v1/usuarios/:id            # Desactivar usuario - soft delete (Admin)
PATCH  /api/v1/usuarios/:id            # Activar usuario (Admin)
```

### Reservas
```
GET    /api/v1/reservas                # Listar reservas (Admin, Empleado, Cliente)
GET    /api/v1/reservas/:id            # Obtener reserva por ID (Admin, Empleado)
POST   /api/v1/reservas                # Crear reserva (Admin, Cliente)
PUT    /api/v1/reservas/:id            # Actualizar reserva (Admin)
DELETE /api/v1/reservas/:id            # Desactivar reserva - soft delete (Admin)
```
### Informes
```
GET    /api/v1/reservas/informe?formato=pdf   # Generar informe en PDF (Admin)
GET    /api/v1/reservas/informe?formato=csv   # Generar informe en CSV (Admin)
```

### Salones
```
GET    /api/v1/salones                 # Listar salones (Admin, Empleado, Cliente)
GET    /api/v1/salones/:id             # Obtener salón por ID (Admin, Empleado)
POST   /api/v1/salones                 # Crear salón (Admin, Empleado)
PUT    /api/v1/salones/:id             # Actualizar salón (Admin, Empleado)
DELETE /api/v1/salones/:id             # Desactivar salón - soft delete (Admin, Empleado)
```

### Servicios
```
GET    /api/v1/servicios               # Listar servicios (Admin, Empleado, Cliente)
GET    /api/v1/servicios/:id           # Obtener servicio por ID (Admin, Empleado)
POST   /api/v1/servicios               # Crear servicio (Admin, Empleado)
PUT    /api/v1/servicios/:id           # Actualizar servicio (Admin, Empleado)
DELETE /api/v1/servicios/:id           # Desactivar servicio - soft delete (Admin, Empleado)
PATCH  /api/v1/servicios/:id/activar   # Activar servicio (Admin, Empleado)
```

### Turnos
```
GET    /api/v1/turnos                  # Listar turnos (Admin, Empleado, Cliente)
GET    /api/v1/turnos/:id              # Obtener turno por ID (Admin, Empleado)
POST   /api/v1/turnos                  # Crear turno (Admin, Empleado)
PUT    /api/v1/turnos/:id              # Actualizar turno (Admin, Empleado)
DELETE /api/v1/turnos/:id/desactivar   # Desactivar turno - soft delete (Admin, Empleado)
```

### Informes estadísticos
#### Rutas con autenticación requerida (Admin)
```
GET    /api/v1/estadisticas/salones-mas-reservados      # Estadísticas de salones
GET    /api/v1/estadisticas/servicios-mas-solicitados   # Estadísticas de servicios
GET    /api/v1/estadisticas/turnos-mas-reservados       # Estadísticas de turnos
```

#### Rutas públicas (Dashboard)
```
GET    /api/v1/estadisticas/dashboard           # Vista HTML
GET    /api/v1/estadisticas/dashboard/salones   # Datos de salones (JSON)
GET    /api/v1/estadisticas/dashboard/servicios # Datos de servicios (JSON)
GET    /api/v1/estadisticas/dashboard/turnos    # Datos de turnos (JSON)
```
---

## 📝 Licencia

Este proyecto fue desarrollado con fines académicos como Trabajo Final Integrador de la materia Programación III (2do cuatrimestre 2025) - Tecnicatura Universitaria en Desarrollo Web - Facultad de Ciencias de la Administración - Universidad Nacional de Entre Ríos (UNER).

---
