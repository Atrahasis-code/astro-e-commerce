import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductService } from '../../services/products.service';
import { supabase } from '../../lib/supabase';

// Helper to create a chainable mock
const createMockQuery = (data: any) => {
    const mock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        ilike: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        then: vi.fn((resolve) => resolve({ data, error: null })),
    };
    return mock;
};

vi.mock('../../lib/supabase', () => ({
    supabase: {
        from: vi.fn()
    }
}));

describe('ProductService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getFeaturedProducts returns data', async () => {
        const mockData = [{ id: '1', title: 'Test' }];
        (supabase.from as any).mockReturnValue(createMockQuery(mockData));

        const products = await ProductService.getFeaturedProducts(4);
        expect(products).toHaveLength(1);
        expect(products[0].title).toBe('Test');
        expect(supabase.from).toHaveBeenCalledWith('products');
    });

    it('searchProducts applies filters', async () => {
        const mockData: any[] = [];
        (supabase.from as any).mockReturnValue(createMockQuery(mockData));

        await ProductService.searchProducts('query', 'cat-id');
        expect(supabase.from).toHaveBeenCalledWith('products');
    });
});
