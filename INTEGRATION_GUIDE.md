# Zion Flow - Website Integration Guide

## Descripción General

Zion Flow ahora está conectado con tu página web de restaurante. Cuando alguien hace una reserva desde la página web, **automáticamente aparece en la app de Zion Flow**.

## Cómo Funciona

### 1. Página Web (Restaurant Website)
- El formulario de reservas en tu sitio web guarda las reservas
- Las reservas se envían al backend Flask (`app.py`)
- Se guardan en dos formatos:
  - CSV (legacy)
  - JSON (para Zion Flow)

### 2. Backend API (Flask `app.py`)
- Proporciona endpoints REST para manejar reservas
- Almacena las reservas en `reservations.json`
- Permite crear, leer, actualizar y eliminar reservas

### 3. Zion Flow App
- Se conecta a la API del backend
- Obtiene las reservas de la página web
- Permite crear nuevas reservas desde la app
- Las reservas creadas en la app también se sincronizan al backend

## Endpoints API Disponibles

```
GET  /api/reservations           - Obtener todas las reservas
POST /api/reservations           - Crear una nueva reserva
PUT  /api/reservations/<id>      - Actualizar una reserva
DELETE /api/reservations/<id>    - Eliminar una reserva
```

## Instalación & Setup

### Paso 1: Instalar Dependencias
```bash
cd ~/restaurant-website
pip install flask
```

### Paso 2: Iniciar el Backend Flask
```bash
python app.py
```

El backend corre en `http://localhost:5000`

### Paso 3: Iniciar Zion Flow
En otra terminal:
```bash
cd ~/restaurant-website/zion-flow
python3 -m http.server 7070
```

Zion Flow corre en `http://localhost:7070`

### Paso 4: Asegurarse de que CORS esté habilitado
Si necesitas usar Zion Flow desde otro dominio, asegúrate de habilitar CORS en Flask:

```python
from flask_cors import CORS
CORS(app)
```

## Flujo de Reservas

### Reservas desde la Página Web
1. Usuario llena formulario en la página web
2. Formulario se envía a `/reserve` (POST)
3. Backend guarda en CSV y JSON
4. Zion Flow obtiene las reservas desde `/api/reservations`
5. **Las reservas aparecen automáticamente en el Dashboard**

### Reservas desde Zion Flow
1. Staff hace click en FAB (+)
2. Llena el formulario de "New Reservation"
3. Click en SAVE
4. La reserva se guarda localmente en Zion Flow
5. Se envía a la API backend (`/api/reservations` POST)
6. La reserva se sincroniza con el backend

## Estructura de Datos de Reserva

```json
{
  "id": 1690124400,
  "created_at": "2026-07-23 14:30:00",
  "name": "John Doe",
  "phone": "+1 (415) 555-0123",
  "date": "2026-07-25",
  "time": "19:30",
  "guests": 4,
  "message": "Celebrating anniversary",
  "status": "CONFIRMED",
  "table": "T12"
}
```

## Archivo de Configuración

### `api.js` (Cliente)
- Ubicación: `/zion-flow/api.js`
- Maneja la comunicación con el backend
- Métodos disponibles:
  - `getReservations()` - Obtener todas las reservas
  - `createReservation(data)` - Crear reserva
  - `updateReservation(id, data)` - Actualizar reserva
  - `deleteReservation(id)` - Eliminar reserva

### `app.py` (Backend)
- Ubicación: `/app.py`
- Define los endpoints API
- Guarda reservas en JSON

## Sincronización en Tiempo Real (Futuro)

Actualmente, Zion Flow carga las reservas una sola vez. Para agregar sincronización en tiempo real:

1. Usar WebSockets
2. Usar polling (verificar cada N segundos)
3. Usar servicios como Firebase

Ejemplo con polling simple:
```javascript
setInterval(() => {
  api.getReservations().then(reservations => {
    // Actualizar la UI con nuevas reservas
  });
}, 30000); // Cada 30 segundos
```

## Troubleshooting

### "Failed to fetch reservations"
- Verifica que Flask está corriendo en puerto 5000
- Verifica CORS está habilitado
- Verifica que `reservations.json` existe

### Las reservas no aparecen en Zion Flow
- Abre la consola del navegador (F12)
- Verifica que no hay errores de red
- Verifica que el backend está corriendo

### Las reservas no se sincronizan desde Zion Flow
- Verifica que el backend está corriendo
- Verifica que `api.js` está cargado
- Abre la consola para ver errores

## Próximas Mejoras

1. **Sincronización en Tiempo Real** - Actualizar automáticamente cuando hay cambios
2. **Autenticación** - Proteger endpoints con autenticación
3. **Base de Datos Real** - Usar SQLite/PostgreSQL en lugar de JSON
4. **Notificaciones Push** - Alertar cuando hay nuevas reservas
5. **Integración con Canales** - Sincronizar con WhatsApp, Email, etc.

## Arquitectura

```
┌─────────────────────────────────────┐
│   Página Web del Restaurante        │
│   (formulario de reservas)          │
└──────────────┬──────────────────────┘
               │ POST /reserve
               ▼
┌─────────────────────────────────────┐
│   Backend Flask (app.py)            │
│   - Guarda en CSV                   │
│   - Guarda en JSON                  │
│   - API REST endpoints              │
└──────────────┬──────────────────────┘
               │ GET /api/reservations
               │ POST /api/reservations
               ▼
┌─────────────────────────────────────┐
│   Zion Flow (index.html)            │
│   - Muestra reservas                │
│   - Crea nuevas reservas            │
│   - Gestiona floor plan             │
└─────────────────────────────────────┘
```

## Soporte

Si tienes problemas con la integración:
1. Revisa los logs de Flask
2. Abre la consola del navegador (F12)
3. Verifica que ambos servidores están corriendo
4. Verifica los puertos (5000 para Flask, 7070 para Zion Flow)
