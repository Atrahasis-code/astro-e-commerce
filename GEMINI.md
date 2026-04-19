# Reglas y Tecnologías del Proyecto (E-commerce)

Este documento rige las convenciones y directrices tecnológicas para el desarrollo del E-commerce utilizando Astro v6 y Supabase, enfocado en un diseño "API-First" y escalabilidad a futuro.

## Arquitectura General
- **Enfoque API-First**: El contrato de la API y la estructura de datos (Schema de Supabase) dirigen el desarrollo. Todas las interfaces del Frontend deben consumir datos definidos por este contrato.
- **Backend (Supabase)**: Fuente única de la verdad, maneja la persistencia, la lógica de base de datos, funciones de borde (Edge Functions), almacenamiento y la seguridad en tiempo real.
- **Frontend (Astro v6)**: Responsable de la UI/UX. Enfocado fuertemente en SSR (Server-Side Rendering) y SSG (Static Site Generation), aprovechando la arquitectura de "Islas de Servidor" de Astro para delegar contenido dinámico del usuario (por ejemplo, el carrito de compras y notificaciones).

## Entorno y Seguridad
- **Variables de Entorno (.env)**: 
  - Todo token, clave secreta o URI de conexión debe residir y ser consumido exclusivamente a través de los archivos `.env`.
  - NUNCA se deben commitear credenciales (`.env` se agrega inmediatamente a `.gitignore`).
  - Solo las variables expuestas intrínsecamente de forma pública hacia el navegador deben usar el prefijo explícito necesario por el bundler (Vite/Astro usan por defecto `PUBLIC_`). **Las variables de servidor nunca usarán tal prefijo y siempre se resolverán sever-side.**

## Reglas para Supabase (Database Specialist & Backend Logic)
1. **Seguridad Nativa (RLS)**: Las Políticas de Seguridad a Nivel de Fila (Row Level Security / RLS) DEBEN estar habilitadas por defecto en TODAS las tablas. La protección de los datos de los usuarios, carritos transaccionales y órdenes debe ser garantizada a nivel base de datos, independientemente del front.
2. **Tipado Estricto de los Datos**: Se debe generar o sincronizar periódicamente las definiciones de tipo de TypeScript extraídas desde el esquema Supabase. El cliente web Astro DEBE emplear estos tipos autogenerados para preservar la integridad referencial en todo momento.
3. **Gestión de la Evolución (Migraciones)**: Todo cambio del esquema de base de datos pasará por los archivos `.sql` atómicos de migraciones. Toda acción estructural debe ser reproducible sin requerir administración manual por consola.

## Reglas para Astro v6 (Frontend Architect)
1. **Rendimiento Omnicanal**: Mantener una hidratación nula (`0kb` base de Javascript de UI inicial). Usar la hidratación en cliente (ej. `client:load` o `client:idle`) solo sobre elementos interactivos aislados como el sumario de carrito o estados de componentes. Todo lo estático se pre-renderiza.
2. **Framework UI (Estilizado Premium)**: Basarse en los principios de estética moderna, evitando layouts rudimentarios. En principio, el diseño utilizará CSS/Animaciones optimizadas que luzcan avanzadas y atractivas desde el primer momento, adhiriéndose a las directrices de los colores abstractos y accesibilidad.
3. **Manejo de estados globales (Astro Middleware)**: El chequeo de autenticidades se validará primordialmente en el middleware nativo del servidor Astro interceptando solicitudes web, con el fin de proteger las áreas críticas (ej. checkout o profile) antes de emitir cualquier código HTML al observador.
