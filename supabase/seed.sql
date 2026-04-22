-- Seed Categories
INSERT INTO public.categories (id, name, slug) VALUES
('b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b1', 'Accesorios', 'accesorios'),
('b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b2', 'Ropa', 'ropa'),
('b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3', 'Periféricos', 'perifericos'),
('b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b4', 'Tecnología', 'tecnologia');

-- Seed Products (Physical Items)
INSERT INTO public.products (title, slug, description, price, image_url, category_id, is_active, can_ship) VALUES
('Neural Bracer X-1', 'neural-bracer-x1', 'Accesorio premium con acabados metálicos y luz LED integrada.', 49.99, '/hero.png', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b1', true, true),
('Gafas Stealth Pro', 'gafas-stealth-pro', 'Protección visual con filtro blue-light y diseño ultra-ligero.', 129.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b1', true, true),
('Jersey Minimalist Black', 'jersey-minimalist-black', 'Algodón orgánico de alto gramaje con bordado minimalista.', 75.00, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b2', true, true),
('Teclado Mecánico Core-60', 'teclado-core-60', 'Teclado 60% con switches lineales y keycaps PBT.', 110.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3', true, true),
('Soporte Universal de Aluminio', 'soporte-aluminio', 'Soporte robusto para laptops de hasta 16 pulgadas.', 35.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b4', true, false),
('Mochila Técnico V2', 'mochila-tecnico-v2', 'Impermeable, con compartimentos acolchados para gadgets.', 89.00, 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800', 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b1', true, true);
