# 🎨 Sistema de Alquiler de Atuendos - Frontend

Interfaz web moderna para la gestión de alquiler de prendas (vestidos, trajes, disfraces) construida con React, TypeScript y Tailwind CSS.

> **Proyecto académico** - Diseño e Implementación de Software  
> **Universidad Compensar** - 2025

---

## 🎯 Características Principales

- ✅ Dashboard con métricas en tiempo real
- ✅ Gestión completa de clientes y empleados
- ✅ Catálogo de prendas con búsqueda y filtros
- ✅ Sistema de alquiler con validación de disponibilidad
- ✅ Cola de lavandería con sistema de prioridades
- ✅ Interfaz responsive y moderna
- ✅ Validación de formularios con React Hook Form + Zod
- ✅ Estado global con TanStack Query (React Query)
- ✅ Enrutamiento con React Router v7
- ✅ Componentes UI reutilizables con Tailwind CSS

---

## 🛠️ Stack Tecnológico

| Tecnología          | Versión | Propósito                  |
| ------------------- | ------- | -------------------------- |
| **React**           | 19.1.1  | Librería UI                |
| **TypeScript**      | 5.9.3   | Tipado estático            |
| **Vite**            | 7.1.7   | Build tool                 |
| **Tailwind CSS**    | 3.4.18  | Estilos utility-first      |
| **React Router**    | 7.9.5   | Enrutamiento               |
| **TanStack Query**  | 5.90.7  | Manejo de estado asíncrono |
| **React Hook Form** | 7.66.0  | Manejo de formularios      |
| **Zod**             | 4.1.12  | Validación de esquemas     |
| **Axios**           | 1.13.2  | Cliente HTTP               |

---

## 📁 Estructura del Proyecto

```text
src/
├── components/          # Componentes UI reutilizables
│   └── ui/
│       ├── Badge.tsx    # Etiquetas de estado
│       ├── Button.tsx   # Botones con variantes
│       ├── Card.tsx     # Contenedor con sombra
│       ├── Input.tsx    # Campo de entrada
│       └── Select.tsx   # Selector dropdown
│
├── lib/                 # Configuración y utilidades
│   ├── http.ts          # Cliente Axios configurado
│   └── queryClient.ts   # Configuración React Query
│
├── modules/             # Módulos de la aplicación
│   ├── dashboard/       # Panel principal
│   ├── clientes/        # CRUD de clientes
│   ├── empleados/       # CRUD de empleados
│   ├── prendas/         # Catálogo de prendas
│   ├── alquileres/      # Gestión de alquileres
│   ├── lavanderia/      # Cola de lavandería
│   └── layout/          # Layout principal (Sidebar + Topbar)
│
├── services/            # Servicios API
│   ├── clientes.ts      # API de clientes
│   ├── empleados.ts     # API de empleados
│   ├── prendas.ts       # API de prendas
│   ├── alquileres.ts    # API de alquileres
│   └── lavanderia.ts    # API de lavandería
│
├── main.tsx             # Punto de entrada
├── App.tsx              # Componente raíz
└── index.css            # Estilos globales
```

---

## 🚀 Instalación y Configuración

### 1. Prerrequisitos

- Node.js 18+ y npm
- Backend corriendo en `http://localhost:3001`

### 2. Clonar el repositorio e instalar dependencias

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Navegar a la carpeta del frontend
cd atuendos/frontend/atuendos-frontend

# Instalar dependencias
npm install
```

### 3. Configurar variables de entorno

Crea el archivo .env en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (Vite)

# Producción
npm run build        # Compila para producción
npm run preview      # Preview de build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

---

## 🎨 Componentes UI

### Button

```tsx
import { Button } from './components/ui/Button'

<Button variant="primary">Guardar</Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="danger">Eliminar</Button>
```

### Input

```tsx
import { Input } from "./components/ui/Input";

<Input
  type="text"
  placeholder="Nombre completo"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>;
```

### Select

```tsx
import { Select } from "./components/ui/Select";

<Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
  <option value="">Seleccionar...</option>
  <option value="DAMA">Dama</option>
  <option value="CABALLERO">Caballero</option>
</Select>;
```

### Card

```tsx
import Card from "./components/ui/Card";

<Card>
  <h2 className="text-lg font-semibold mb-4">Título</h2>
  <p>Contenido...</p>
</Card>;
```

### Badge

```tsx
import { Badge } from './components/ui/Badge'

<Badge color="success">Disponible</Badge>
<Badge color="danger">Urgente</Badge>
<Badge color="slate">Normal</Badge>
```

---

## 🔌 Servicios API

### Ejemplo: Clientes

```typescript
import { clientesApi } from "./services/clientes";

// Listar todos
const clientes = await clientesApi.listar();

// Obtener por ID
const cliente = await clientesApi.obtenerPorId(1);

// Crear nuevo
await clientesApi.crear({
  nombre: "Juan Pérez",
  email: "juan@example.com",
  telefono: "3001234567",
});

// Actualizar
await clientesApi.actualizar(1, { telefono: "3009876543" });

// Eliminar
await clientesApi.eliminar(1);
```

### Ejemplo: Prendas con React Query

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { prendasApi } from "./services/prendas";

function Prendas() {
  // Listar prendas
  const { data: prendas } = useQuery({
    queryKey: ["prendas"],
    queryFn: prendasApi.listar,
  });

  // Crear prenda
  const crear = useMutation({
    mutationFn: prendasApi.crear,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["prendas"] }),
  });

  return (
    <div>
      {prendas?.map((p) => (
        <div key={p.id}>{p.referencia}</div>
      ))}
    </div>
  );
}
```

---

## 🎯 Módulos de la Aplicación

### 1. Dashboard

- Métricas en tiempo real
- Total de clientes, empleados, prendas
- Alquileres activos y pendientes de lavandería

### 2. Clientes

- Listado con búsqueda
- Formulario de creación/edición
- Validación de email y teléfono

### 3. Empleados

- CRUD completo
- Roles: Vendedor, Diseñador, Mensajero
- Validación de datos

### 4. Prendas

- Catálogo con filtros por tipo
- Creación de prendas individuales o compuestas
- Cálculo automático de costo
- Factory Pattern: Dama, Caballero, Disfraz

### 5. Alquileres

- Registro de nuevos alquileres
- Validación de disponibilidad
- Selección de cliente y empleado
- Fechas de inicio y fin

### 6. Lavandería

- Cola con sistema de prioridades
- Flags: Manchada, Delicada, Urgente
- Envío por lotes a lavar
- Decorator Pattern para prioridades

---

## 🌐 Integración con Backend

### Cliente HTTP (Axios)

```typescript
// src/lib/http.ts
import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
```

### Configuración React Query

```typescript
// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

---

## 🐛 Solución de Problemas

### Error: Cannot find module

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS

Verifica que el backend tenga CORS habilitado:

```typescript
// backend/src/server.ts
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
```

### Tailwind no aplica estilos

Verifica que `index.css` tenga:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Y que esté importado en `main.tsx`:

```typescript
import "./index.css";
```

---

## 📝 Notas Importantes

1. **TypeScript estricto**: El proyecto usa `verbatimModuleSyntax`, siempre usar `import type` para tipos
2. **React Query**: Todas las peticiones HTTP usan React Query para cache y revalidación
3. **Validación**: Los formularios usan Zod + React Hook Form
4. **Tailwind**: Componentes UI usan clases de Tailwind, evitar CSS inline

---

## 👥 Autores

**Universidad Compensar** - Diseño e Implementación de Software - 2025

---

## 📄 Licencia

Proyecto académico - Todos los derechos reservados
