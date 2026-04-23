import { supabase } from '../lib/supabase';

export const ProductService = {
    async getFeaturedProducts(limit = 4) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .limit(limit);
        
        if (error) throw error;
        return data || [];
    },

    async searchProducts(searchQuery?: string | null, categoryId?: string | null) {
        let query = supabase.from('products').select('*').eq('is_active', true);

        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        if (searchQuery) {
            query = query.ilike('title', `%${searchQuery}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    }
};
