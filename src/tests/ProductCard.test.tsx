import { render, screen } from '@testing-library/preact';
import { ProductCard } from '@/components/ProductCard';
import { describe, it, expect } from 'vitest';

const mockProduct = {
    id: '1',
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    image_url: 'https://example.com/image.jpg',
    slug: 'test-product',
    can_ship: true
};

describe('ProductCard', () => {
    it('renders the product title and price', () => {
        render(<ProductCard product={mockProduct} />);
        
        expect(screen.getByText('Test Product')).toBeTruthy();
        expect(screen.getByText(/Bs[ \u00A0]100,00/)).toBeTruthy();
    });

    it('shows shipping tag when can_ship is true', () => {
        const { getByText } = render(<ProductCard product={mockProduct} />);
        expect(getByText('Envío disponible')).toBeTruthy();
    });

    it('shows digital delivery tag when can_ship is false', () => {
        const digitalProduct = { ...mockProduct, can_ship: false };
        const { getByText } = render(<ProductCard product={digitalProduct} />);
        expect(getByText('Envio no disponible')).toBeTruthy();
    });

    it('uses placeholder when image_url is missing', () => {
        const noImageProduct = { ...mockProduct, image_url: null };
        render(<ProductCard product={noImageProduct} />);
        const img = screen.getByRole('img');
        expect(img.getAttribute('src')).toBe('/placeholder.png');
    });
});
