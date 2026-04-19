# 🚀 DigitalStore - Premium Digital E-commerce

Bienvenido a **DigitalStore**, un e-commerce de última generación diseñado para la venta de productos digitales (accesorios virtuales, ropa para el metaverso y assets digitales). Este proyecto utiliza un enfoque **API-First** con **Astro v6** y **Supabase** para garantizar escalabilidad, seguridad y un rendimiento excepcional.

## 🛠️ Tech Stack

- **Frontend**: [Astro v6](https://astro.build/) (Modo SSR)
- **Backend**: [Supabase](https://supabase.com/) (Auth, DB, RLS y Edge Functions)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (Estética Premium & Glassmorphism)
- **Componentes**: [Preact](https://preactjs.com/) (Islas de interactividad)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto generado desde DB)
- **Package Manager**: [Yarn](https://yarnpkg.com/)

---

## 💻 Configuración Local

Sigue estos pasos para montar el proyecto en tu entorno local:

### 1. Prerrequisitos
- **Node.js**: Versión 22.12.0 o superior.
- **Docker**: Necesario para correr el CLI de Supabase localmente.
- **Yarn**: Instalado vía Corepack (`corepack enable`).

### 2. Instalación de Dependencias
```bash
yarn install
```

### 3. Configuración de Variables de Entorno
Copia el archivo de ejemplo y rellena los valores (si usas Supabase local, los valores se obtienen en el paso 4):
```bash
cp .env.example .env
```

### 4. Inicializar Supabase Local
Inicia los contenedores de Supabase para tener la base de datos y servicios corriendo:
```bash
npx supabase start
```
*Si es la primera vez, esto aplicará automáticamente las migraciones en `supabase/migrations`.*

### 5. Sincronizar Tipos de Datos (API-First)
Para mantener la consistencia entre la DB y el Frontend, genera los tipos de TypeScript:
```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

### 6. Ejecutar el Servidor de Desarrollo
```bash
yarn dev
```
La aplicación estará disponible en `http://localhost:4321`.

---

## 📁 Estructura del Proyecto

- `src/layouts/`: Plantillas base con diseño premium y SEO.
- `src/pages/`: Rutas de la aplicación (SSR activado).
- `src/components/`: Componentes atómicos e islas de Preact.
- `src/lib/`: Configuración de clientes (Supabase, etc.).
- `src/types/`: Definiciones de TypeScript autogeneradas.
- `supabase/migrations/`: Historial de cambios en la base de datos.

---

## 🎨 Filosofía de Diseño
El proyecto sigue las reglas establecidas en `GEMINI.md`:
- **Estética Rich**: Uso de gradientes lineales, efectos de cristal (glassmorphism) y modo oscuro nativo.
- **Rendimiento**: Hidratación mínima (0kb JS inicial) gracias a las islas de Astro.
- **Seguridad**: Todas las tablas tienen políticas **RLS (Row Level Security)** activadas.

---

## 📜 Comandos Útiles
- `npx supabase db reset`: Reinicia la base de datos local y vuelve a aplicar todas las migraciones.
- `yarn build`: Genera el bundle de producción para el adaptador de Node.js.
- `npx supabase stop`: Detiene los contenedores locales de Supabase.
