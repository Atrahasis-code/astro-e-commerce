import { supabase } from '@/lib/supabase';

export const CategoryService = {
    async getAllCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data || [];
    }
};
