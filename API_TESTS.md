# Pruebas de API - Backend Casa Andina

Puedes usar estos ejemplos con herramientas como Postman, Thunder Client, o curl.

## 📌 URL Base
```
http://localhost:3000
```

## 1. Registro de Usuario

### Endpoint
```
POST http://localhost:3000/api/auth/register
```

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "correo": "test@ejemplo.com",
  "contrasena": "password123"
}
```

### Respuesta Exitosa (201)
```json
{
  "message": "Usuario registrado con éxito",
  "usuario": {
    "id": 1,
    "correo": "test@ejemplo.com",
    "creado_en": "2025-10-02T12:00:00.000Z"
  }
}
```

### Errores Posibles
- **400**: Correo ya está registrado
- **400**: Correo y contraseña son obligatorios
- **500**: Error en el servidor

---

## 2. Login de Usuario

### Endpoint
```
POST http://localhost:3000/api/auth/login
```

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "correo": "test@ejemplo.com",
  "contrasena": "password123"
}
```

### Respuesta Exitosa (200)
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29ycmVvIjoidGVzdEBlamVtcGxvLmNvbSIsImlhdCI6MTcyNzg3MjgwMCwiZXhwIjoxNzI3ODc2NDAwfQ.xyz",
  "usuario": {
    "id": 1,
    "correo": "test@ejemplo.com"
  }
}
```

### Errores Posibles
- **400**: Usuario no encontrado
- **400**: Correo y contraseña son requeridos
- **401**: Credenciales inválidas
- **500**: Error en el servidor

---

## 🧪 Usando curl (Terminal)

### Registro
```bash
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"correo\":\"test@ejemplo.com\",\"contrasena\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"correo\":\"test@ejemplo.com\",\"contrasena\":\"password123\"}"
```

---

## 🔑 Usando el Token JWT

Una vez que obtengas el token del login, puedes usarlo en futuras peticiones protegidas:

```
Authorization: Bearer <tu_token_aqui>
```

### Ejemplo
```bash
curl -X GET http://localhost:3000/api/protegido ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📝 Notas

- El token JWT expira en **1 hora**
- Las contraseñas se almacenan encriptadas con bcrypt
- No se puede registrar el mismo correo dos veces
- El correo no distingue mayúsculas/minúsculas en la base de datos
