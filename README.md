# Backend Casa Andina

API REST para autenticación de usuarios con Node.js, Express y PostgreSQL.

## 🚀 Características

- ✅ Registro de usuarios con encriptación de contraseñas (bcrypt)
- ✅ Login con JWT (JSON Web Tokens)
- ✅ Base de datos PostgreSQL (compatible con Neon)
- ✅ CORS habilitado
- ✅ Validación de datos

## 📋 Requisitos previos

- Node.js (v18 o superior)
- PostgreSQL o cuenta en [Neon](https://neon.tech/)
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd backend-casa-andina
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@host/nombre_base_datos?sslmode=require
JWT_SECRET=tu_secreto_super_seguro_aqui
```

4. **Crear la base de datos**

Ejecuta el script SQL en tu base de datos PostgreSQL:

```bash
psql -h <host> -U <usuario> -d <database> -f database.sql
```

O copia el contenido de `database.sql` y ejecútalo en tu cliente PostgreSQL.

## 🏃 Ejecutar el proyecto

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 📡 Endpoints

### Registro de usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "correo": "usuario@ejemplo.com",
  "contrasena": "miPassword123"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado con éxito",
  "usuario": {
    "id": 1,
    "correo": "usuario@ejemplo.com",
    "creado_en": "2025-10-02T12:00:00.000Z"
  }
}
```

### Login de usuario
```http
POST /api/auth/login
Content-Type: application/json

{
  "correo": "usuario@ejemplo.com",
  "contrasena": "miPassword123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "correo": "usuario@ejemplo.com"
  }
}
```

## 🛠️ Tecnologías utilizadas

- **Express.js** - Framework web
- **PostgreSQL** - Base de datos
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **cors** - Middleware para CORS
- **dotenv** - Variables de entorno

## 📁 Estructura del proyecto

```
backend-casa-andina/
├── src/
│   ├── config/
│   │   └── db.js              # Configuración de la base de datos
│   ├── controllers/
│   │   └── authController.js  # Lógica de autenticación
│   ├── models/
│   │   └── userModel.js       # Modelo de usuario
│   ├── routes/
│   │   └── authRoutes.js      # Rutas de autenticación
│   ├── app.js                 # Configuración de Express
│   └── server.js              # Punto de entrada
├── .env                       # Variables de entorno (no subir a git)
├── .env.example              # Ejemplo de variables de entorno
├── database.sql              # Script SQL para crear tablas
├── package.json
└── README.md
```

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt antes de guardarse
- Los tokens JWT expiran en 1 hora
- Se valida que no existan correos duplicados
- SSL habilitado para conexiones a la base de datos

## 🐛 Solución de problemas

### Error de conexión a la base de datos
- Verifica que `DATABASE_URL` en `.env` sea correcta
- Asegúrate de que tu base de datos PostgreSQL esté activa
- Para Neon, el formato debe incluir `?sslmode=require`

### Error "Usuario no encontrado" en login
- Verifica que el usuario esté registrado
- Comprueba que el correo sea exactamente el mismo

## 📝 Licencia

ISC
