import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API GRUPO AL- PROGIII ",
    version: "1.0.0",
    description: `Gestión de reservas de Casas de Cumpleaños para la empresa PROGIII. 
    Incluye endpoints para Usuarios, Reservas, Salones, Servicios y Turnos`,
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Servidor local"
    },
  ],
  tags: [
    { name: "Usuarios", description: "Administración y autenticación de usuarios (1- Administrador / 2- Empleado / 3- Cliente)" },
    { name: "Reservas", description: "Gestión de reservas y generación de informes" },
    { name: "Salones", description: "Gestión de salones" },
    { name: "Servicios", description: "Administración de servicios adicionales" },
    { name: "Turnos", description: "Gestión de turnos" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
  paths: {
    // ---------- USUARIOS ----------

    // LOGIN USUARIO
    "/usuarios/login": {
      post: {
        tags: ["Usuarios"],
        summary: "Login de usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                nombre_usuario: "ezequielsanchez@gmail.com",
                contrasenia: "123456"
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login exitoso",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Inicio de sesión exitoso",
                  usuarios: {
                    usuario_id: 10,
                    nombre_usuario: "ezequielsanchez@gmail.com",
                    tipo_usuario: 1,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }
                },
              },
            },
          },
          400: {
            description: "Faltan usuario y contraseña",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Debe ingresar nombre de usuario y contraseña"
                },
              },
            },
          },
        },
      },
    },
    "/usuarios": {
      // CREAR USUARIO
      post: {
        tags: ["Usuarios"],
        summary: "Crear un nuevo usuario",
        requestBody: {
          content: {
            "application/json": {
              example: {
                nombre: "Ezequiel",
                apellido: "Sanchez",
                nombre_usuario: "ezequielsanchez@gmail.com",
                contrasenia: "123456",
                tipo_usuario: 1
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuario creado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Usuario creado correctamente",
                  data: {
                    usuario_id: 22,
                    nombre: "Ezequiel",
                    apellido: "Sanchez",
                    nombre_usuario: "ezequielsanchez@gmail.com",
                    contrasenia: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
                    tipo_usuario: 1,
                    celular: null,
                    foto: null,
                    activo: 1,
                    creado: "2025-11-04T02:32:35.000Z",
                    modificado: "2025-11-04T02:32:35.000Z"
                  },
                },
              },
            },
          },
          400: {
            description: "Faltan datos requeridos",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: {
                    apellido: {
                      "type": "field",
                      "value": "",
                      "msg": "El apellido es obligatorio",
                      "path": "apellido",
                      "location": "body"
                    }
                  },
                },
              },
            },
          },
        },
      },

      // LISTAR TODOS LOS USUARIOS
      get: {
        tags: ["Usuarios"],
        summary: "Listar todos los usuarios",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de usuarios",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  usuarios: [
                    {
                      usuario_id: 1,
                      nombre: "Alberto",
                      apellido: "López",
                      nombre_usuario: "alblop@correo.com",
                      contrasenia: "cf584badd07d42dcb8506f8bae32aa96",
                      tipo_usuario: 3,
                      celular: null,
                      foto: null,
                      activo: 1,
                      creado: "2025-08-19T21:37:51.000Z",
                      modificado: "2025-08-19T21:37:51.000Z"
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },

    // LISTAR USUARIOS POR ID
    "/usuarios/{id}": {
      get: {
        tags: ["Usuarios"],
        summary: "Obtener usuario por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID numérico del usuario a consultar",
            required: true,
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Usuario encontrado",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  usuarios: [
                    {
                      usuario_id: 1,
                      nombre: "Alberto",
                      apellido: "López",
                      nombre_usuario: "alblop@correo.com",
                      contrasenia: "cf584badd07d42dcb8506f8bae32aa96",
                      tipo_usuario: 3,
                      celular: null,
                      foto: null,
                      activo: 1,
                      creado: "2025-08-19T21:37:51.000Z",
                      modificado: "2025-08-19T21:37:51.000Z"
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Usuario no encontrado"
                },
              },
            },
          },
        },
      },

      // ACTUALIZAR USUARIO
      put: {
        tags: ["Usuarios"],
        summary: "Actualizar usuario existente",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID numérico del usuario a consultar",
            required: true,
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              example:
              {
                nombre: "Ezequiel",
                apellido: "Lopez",
                tipo_usuario: 3
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuario actualizado correctamente",
            content: {
              "application/json": {
                example: {
                  mensaje: "Usuario actualizado correctamente.",
                  usuario: {
                    "usuario_id": 1,
                    "nombre": "Ezequiel",
                    "apellido": "Lopez",
                    "nombre_usuario": "alblop@correo.com",
                    "contrasenia": "cf584badd07d42dcb8506f8bae32aa96",
                    "tipo_usuario": 3,
                    "celular": null,
                    "foto": null,
                    "activo": 1,
                    "creado": "2025-08-19T21:37:51.000Z",
                    "modificado": "2025-11-04T02:50:27.000Z"
                  },
                },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                example: {
                  "mensaje": "Usuario no encontrado o sin cambios"
                },
              },
            },
          },
        },
      },

      // ELIMINAR USUARIO
      delete: {
        tags: ["Usuarios"],
        summary: "Desactivar usuario",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID numérico del usuario a consultar",
            required: true,
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Usuario desactivado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Usuario desactivado correctamente"
                },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Usuario no encontrado o ya está desactivado"
                },
              },
            },
          },
        },
      },

      // ACTIVAR USUARIOS POR ID
      patch: {
        tags: ["Usuarios"],
        summary: "Activar usuario desactivado",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID numérico del usuario a consultar",
            required: true,
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Usuario activado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Usuario activado correctamente"
                },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Usuario no encontrado o ya está activado"
                },
              },
            },
          },
        },
      },
    },


    // ---------- RESERVAS ----------
    // LISTAR RESERVAS
    "/reservas": {
      get: {
        tags: ["Reservas"],
        summary: "Listar reservas",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de reservas obtenida correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: [
                    {
                      reserva_id: 1,
                      fecha_reserva: "2025-12-01",
                      salon_id: 3,
                      usuario_id: 4,
                      turno_id: 2,
                      foto_cumpleaniero: "foto.jpg",
                      tematica: "Cumpleaños infantil",
                      importe_salon: 25000,
                      importe_total: 31000,
                      activo: 1,
                      servicios: [
                        { nombre_servicio: "Catering completo", importe: 5000 },
                        { nombre_servicio: "Decoración temática", importe: 1000 }
                      ]
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: "No hay reservas registradas",
            content: {
              "application/json": {
                example: { 
                  estado: false, 
                  mensaje: "No hay reservas registradas :(" },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: { 
                  estado: false,
                  mensaje: "Error interno del servidor" },
              },
            },
          },
        },
      },
      // CREAR UNA RESERVA
      post: {
        tags: ["Reservas"],
        summary: "Crear una nueva reserva",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                fecha_reserva: "2025-12-10",
                salon_id: 1,
                usuario_id: 2,
                turno_id: 3,
                foto_cumpleaniero: "imagen.jpg",
                tematica: "Fiesta de disfraces",
                importe_salon: 30000,
                importe_total: 35000,
                servicios: [1, 2, 3]
              },
            },
          },
        },
        responses: {
          201: {
            description: "Reserva creada correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Reserva creada correctamente",
                  data: {
                    reservaCreada: {
                      reserva_id: 10,
                      fecha_reserva: "2025-12-10",
                      salon_id: 1,
                      usuario_id: 2,
                      turno_id: 3,
                      tematica: "Fiesta de disfraces",
                      importe_salon: 30000,
                      importe_total: 35000,
                      activo: 1
                    },
                    servicios: [
                      { nombre_servicio: "Catering completo", importe: 5000 },
                      { nombre_servicio: "Fotografía profesional", importe: 2000 }
                    ]
                  }
                },
              },
            },
          },
          400: {
            description: "Faltan datos requeridos o servicios inválidos",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Faltan datos requeridos para crear la reserva (fecha de reserva, salón_id, turno_id)"
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: { estado: false, mensaje: "Error interno del servidor" },
              },
            },
          },
        },
      },
    },
    // BUSCAR RESERVA POR ID
    "/reservas/{id}": {
      get: {
        tags: ["Reservas"],
        summary: "Obtener una reserva por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la reserva a consultar",
            schema: { type: "integer", example: 2 },
          },
        ],
        responses: {
          200: {
            description: "Reserva encontrada",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: {
                    reserva_id: 2,
                    fecha_reserva: "2025-12-01",
                    salon_id: 1,
                    usuario_id: 3,
                    turno_id: 2,
                    tematica: "Cumple de 15",
                    importe_salon: 40000,
                    importe_total: 45000,
                    activo: 1,
                  },
                  servicios: [
                    { nombre_servicio: "Decoración premium", importe: 3000 },
                    { nombre_servicio: "DJ", importe: 2000 }
                  ]
                },
              },
            },
          },
          404: {
            description: "Reserva no encontrada",
            content: {
              "application/json": {
                example: { 
                  estado: false,
                  mensaje: "Reserva no encontrada o inactiva" },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: { 
                  estado: false, 
                  mensaje: "Error interno del servidor" },
              },
            },
          },
        },
      },
      // ACTUALIZAR RESERVA
      put: {
        tags: ["Reservas"],
        summary: "Actualizar una reserva existente",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la reserva a actualizar",
            schema: { type: "integer", example: 3 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                tematica: "Cumpleaños temática Marvel",
                importe_salon: 30000,
                servicios: [1, 2]
              },
            },
          },
        },
        responses: {
          200: {
            description: "Reserva actualizada correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Reserva actualizada correctamente",
                  datos: {
                    reservas: {
                      reserva_id: 3,
                      tematica: "Cumpleaños temática Marvel",
                      importe_total: 34000,
                    },
                    servicios: [
                      { nombre_servicio: "Catering completo", importe: 4000 },
                      { nombre_servicio: "Fotografía", importe: 2000 }
                    ]
                  }
                },
              },
            },
          },
          404: {
            description: "Reserva no encontrada",
            content: {
              "application/json": {
                example: { 
                  estado: false, 
                  mensaje: "No se encontró la reserva a actualizar" },
              },
            },
          },
        },
      },
      // ELIMINAR RESERVA
      delete: {
        tags: ["Reservas"],
        summary: "Desactivar una reserva",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la reserva a desactivar",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          200: {
            description: "Reserva desactivada correctamente",
            content: {
              "application/json": {
                example: { 
                  estado: true, 
                  mensaje: "Reserva desactivada correctamente" },
              },
            },
          },
          404: {
            description: "Reserva no encontrada",
            content: {
              "application/json": {
                example: { 
                  estado: false, 
                  mensaje: "Reserva no encontrada o ya está desactivada" },
              },
            },
          },
        },
      },
    },

    // INFORME RESERVAS
    "/reservas/informe": {
      get: {
        tags: ["Reservas"],
        summary: "Generar informe de reservas en formato CSV o PDF",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "formato",
            in: "query",
            description: "Formato de exportación (csv o pdf)",
            required: true,
            schema: { type: "string", enum: ["csv", "pdf"], example: "csv" },
          },
        ],
        responses: {
          200: {
            description: "Informe generado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Informe generado correctamente (descarga disponible)",
                },
              },
            },
          },
          400: {
            description: "Formato inválido",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El formato no es valido (solo se permite csv o pdf)"
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: { estado: false, mensaje: "Error interno del servidor" },
              },
            },
          },
        },
      },
    },
    // ---------- SALONES ----------
    // Listar Salones activos
    "/salones": {
      get: {
        tags: ["Salones"],
        summary: "Listar todos los salones activos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de salones activos",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: [
                    {
                      salon_id: 1,
                      titulo: "Salón Dorado",
                      direccion: "Av. Libertad 123",
                      latitud: -34.602,
                      longitud: -58.381,
                      capacidad: 120,
                      importe: 25000,
                      activo: 1,
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                },
              },
            },
          },
        },
      },
      // Crear Salon
      post: {
        tags: ["Salones"],
        summary: "Crear un nuevo salón",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                titulo: "Salón Imperial",
                direccion: "Calle Belgrano 999",
                latitud: -34.602,
                longitud: -58.381,
                capacidad: 150,
                importe: 32000,
              },
            },
          },
        },
        responses: {
          201: {
            description: "Salón creado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Salón creado correctamente",
                  data: {
                    salon_id: 5,
                    titulo: "Salón Imperial",
                    direccion: "Calle Belgrano 999",
                    latitud: -34.602,
                    longitud: -58.381,
                    capacidad: 150,
                    importe: 32000,
                    activo: 1,
                  },
                },
              },
            },
          },
          400: {
            description: "Faltan datos requeridos",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Faltan datos requeridos para crear el salón (mínimo título y dirección)",
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                },
              },
            },
          },
        },
      },
    },
    // Buscar salon por ID
    "/salones/{id}": {
      get: {
        tags: ["Salones"],
        summary: "Buscar salón por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID numérico del salón",
            schema: { type: "integer", example: 2 },
          },
        ],
        responses: {
          200: {
            description: "Salón encontrado",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: {
                    salon_id: 2,
                    titulo: "Salón de Plata",
                    direccion: "Calle San Martín 500",
                    latitud: -34.603,
                    longitud: -58.382,
                    capacidad: 80,
                    importe: 18000,
                    activo: 1,
                  },
                },
              },
            },
          },
          404: {
            description: "Salón no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Salón no encontrado o inactivo",
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                },
              },
            },
          },
        },
      },
      // Actualizar Salón
      put: {
        tags: ["Salones"],
        summary: "Actualizar un salón existente",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del salón a actualizar",
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                titulo: "Salón Dorado Renovado",
                direccion: "Av. Libertad 123",
                capacidad: 130,
                importe: 28000,
              },
            },
          },
        },
        responses: {
          200: {
            description: "Salón actualizado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Salón actualizado correctamente",
                  datos: {
                    salon_id: 1,
                    titulo: "Salón Dorado Renovado",
                    direccion: "Av. Libertad 123",
                    capacidad: 130,
                    importe: 28000,
                    activo: 1,
                  },
                },
              },
            },
          },
          404: {
            description: "Salón no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "No se encontró el salón para actualizar",
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                },
              },
            },
          },
        },
      },
      // Eliminar Salón
      delete: {
        tags: ["Salones"],
        summary: "Desactivar un salón",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del salón a desactivar",
            schema: { type: "integer", example: 3 },
          },
        ],
        responses: {
          200: {
            description: "Salón desactivado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Salón desactivado correctamente",
                },
              },
            },
          },
          404: {
            description: "Salón no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Salón no encontrado o ya está desactivado",
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                },
              },
            },
          },
        },
      },
    },
    // ---------- SERVICIOS ----------
    "/servicios": {
      get: {
        tags: ["Servicios"],
        summary: "Listar todos los servicios activos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de servicios",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: [
                    {
                      servicio_id: 1,
                      descripcion: "Decoración temática",
                      importe: "5000",
                      activo: 1,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Servicios"],
        summary: "Crear un nuevo servicio",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                descripcion: "Catering completo",
                importe: "15000",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Servicio creado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Servicio creado exitosamente",
                  datos: {
                    servicio_id: 5,
                    descripcion: "Catering completo",
                    importe: "15000",
                    activo: 1,
                  },
                },
              },
            },
          },
          400: {
            description: "Datos faltantes",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El nombre del servicio ya existe",
                },
              },
            },
          },
          409: {
            description: "El servicio ya existe con el mismo nombre",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El nombre del servicio ya existe",
                },
              },
            },
          },
        },
      },
    },
    "/servicios/{id}": {
      get: {
        tags: ["Servicios"],
        summary: "Obtener un servicio por ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", schema: { type: "integer" } }],
        responses: {
          200: {
            description: "Servicio encontrado",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  datos: {
                    servicio_id: 2,
                    descripcion: "Animación infantil",
                    importe: 8000,
                    activo: 1,
                  },
                },
              },
            },
          },
          400: {
            description: "Falta ingresar el id del servicio",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Falta el ID del servicio.",
                },
              },
            },
          },
          404: {
            description: "Servicio no encontrado.",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El servicio con ID no existe o está inactivo.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Servicios"],
        summary: "Actualizar un servicio existente",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", schema: { type: "integer" } }],
        requestBody: {
          content: {
            "application/json": {
              example: {
                descripcion: "Catering premium",
                importe: "20000",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Servicio actualizado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Servicio actualizado correctamente",
                  datos: {
                    servicio_id: 5,
                    descripcion: "Catering premium",
                    importe: 20000,
                    activo: 1,
                  },
                },
              },
            },
          },
          400: {
            description: "Faltan datos requeridos",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Faltan los datos requeridos.",
                },
              },
            },
          },
          404: {
            description: "Servicio no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "No se encontró el servicio a actualizar",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Servicios"],
        summary: "Desactivar un servicio",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del turno que se desea desactivar",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Servicio desactivado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "El servicio se desactivó correctamente",
                },
              },
            },
          },
          400: {
            description: "El ID no se ha otorgado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Falta el id del servicio a eliminar",
                },
              },
            },
          },
          404: {
            description: "Servicio no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El servicio no fue encontrado",
                },
              },
            },
          },
          409: {
            description: "Servicio ya esta desactivado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El servicio ya está desactivado",
                },
              },
            },
          },
        },
      },
    },
    "/servicios/{id}/activar": {
      patch: {
        tags: ["Servicios"],
        summary: "Activar un servicio desactivado",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", schema: { type: "integer" }, required: true }],
        responses: {
          200: {
            description: "Servicio activado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Servicio activado correctamente",
                },
              },
            },
          },
          400: {
            description: "El cliente no ha proporcionado el id a activar",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Falta el id del servicio a activar",
                },
              },
            },
          },
          404: {
            description: "Servicio no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El servicio con el ID proporcionado no existe",
                },
              },
            },
          },
          409: {
            description: "El servicio ya esta activado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "El servicio con el id proporcionado ya esta activado",
                },
              },
            },
          },
        },
      },
    },
    // ---------- TURNOS ----------
    "/turnos": {
      // LISTAR TODOS LOS TURNOS ACTIVOS
      get: {
        tags: ["Turnos"],
        summary: "Listar todos los turnos activos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de turnos",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  turnos: [
                    {
                      "turno_id": 1,
                      "orden": 1,
                      "hora_desde": "12:00:00",
                      "hora_hasta": "14:00:00",
                      "activo": 1,
                      "creado": "2025-08-19T21:44:19.000Z",
                      "modificado": "2025-08-19T21:44:19.000Z"
                    },
                  ],
                },
              },
            },
          },
        },
      },
      // CREAR TURNOS
      post: {
        tags: ["Turnos"],
        summary: "Crear un nuevo turno",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              example: {
                orden: 2,
                hora_desde: "12:00",
                hora_hasta: "17:00"
              },
            },
          },
        },
        responses: {
          201: {
            description: "Turno creado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Turno creado correctamente",
                  turno: {
                    turno_id: 8,
                    orden: 4,
                    hora_desde: "12:00",
                    hora_hasta: "17:00",
                    activo: 1,
                  },
                },
              },
            },
          },
          400: {
            description: "Datos faltantes",
            content: {
              "application/json": {
                example: {
                  "estado": "fallo",
                  "mensaje": {
                    "hora_desde": {
                      "type": "field",
                      "value": "",
                      "msg": "La hora de inicio es obligatoria",
                      "path": "hora_desde",
                      "location": "body"
                    }
                  }
                },
              },
            },
          },
        },
      },
    },
    // BUSCAR TURNOS POR ID
    "/turnos/{id}": {
      get: {
        tags: ["Turnos"],
        summary: "Buscar turno por ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", schema: { type: "integer" }, required: true }],
        responses: {
          200: {
            description: "Turno encontrado",
            content: {
              "application/json": {
                example: {
                  "estado": true,
                  "turno": {
                    "turno_id": 3,
                    "orden": 3,
                    "hora_desde": "18:00:00",
                    "hora_hasta": "20:00:00",
                    "activo": 1,
                    "creado": "2025-08-19T21:46:08.000Z",
                    "modificado": "2025-08-19T21:46:08.000Z"
                  },
                },
              },
            },
          },
          404: {
            description: "Turno no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Turno no encontrado"
                },
              },
            },
          },
        },
      },
      // ACTUALIZAR TURNOS
      put: {
        tags: ["Turnos"],
        summary: "Actualizar un turno",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", schema: { type: "integer" }, required: true }],
        requestBody: {
          content: {
            "application/json": {
              example: {
                orden: 1,
                hora_desde: "17:00",
                hora_hasta: "22:00"
              },
            },
          },
        },
        responses: {
          200: {
            description: "Turno actualizado correctamente",
            content: {
              "application/json": {
                example: {
                  "estado": true,
                  "mensaje": "Turno actualizado correctamente",
                  "turno": {
                    "id": "2",
                    "orden": 3,
                    "hora_desde": "17:00",
                    "hora_hasta": "22:00"
                  }
                },
              },
            },
          },
          404: {
            description: "Turno no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Turno no encontrado para actualizar"
                },
              },
            },
          },
        },
      },
    },
    "/turnos/{id}/desactivar": {
      patch: {
        tags: ["Turnos"],
        summary: "Desactivar un turno",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del turno que se desea desactivar",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Turno desactivado correctamente",
            content: {
              "application/json": {
                example: {
                  estado: true,
                  mensaje: "Turno desactivado correctamente"
                }
              }
            }
          },
          404: {
            description: "Turno no encontrado",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Turno no encontrado"
                }
              }
            }
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                example: {
                  estado: false,
                  mensaje: "Error interno del servidor"
                }
              }
            }
          }
        }
      }
    }

  },
};

const options = { swaggerDefinition, apis: [] };
const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Documentación de API Swagger: http://localhost:3000/api-docs");
}
