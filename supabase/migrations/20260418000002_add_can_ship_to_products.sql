-- Add can_ship column to products table
ALTER TABLE IF EXISTS public.products 
ADD COLUMN IF NOT EXISTS can_ship BOOLEAN DEFAULT false;

-- Comentario para documentar el cambio en el esquema
COMMENT ON COLUMN public.products.can_ship IS 'Indica si el producto físico puede ser enviado por correo.';
