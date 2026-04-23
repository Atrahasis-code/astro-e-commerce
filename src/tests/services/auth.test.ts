import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '@/services/auth.service';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(),
        auth: {
            signUp: vi.fn(),
            signInWithPassword: vi.fn(),
            signOut: vi.fn()
        }
    }
}));

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getUserRole returns role for user', async () => {
        const mockData = { role: 'editor' };
        const mockSingle = {
            single: vi.fn().mockResolvedValue({ data: mockData, error: null })
        };
        const mockEq = {
            eq: vi.fn().mockReturnValue(mockSingle)
        };
        const mockSelect = {
            select: vi.fn().mockReturnValue(mockEq)
        };
        (supabase.from as any).mockReturnValue(mockSelect);

        const role = await AuthService.getUserRole('user-123');
        expect(role).toBe('editor');
        expect(supabase.from).toHaveBeenCalledWith('user_roles');
    });

    it('registerWithEmail calls supabase signUp', async () => {
        const mockResponse = { data: { user: { id: '123' } }, error: null };
        (supabase.auth.signUp as any).mockResolvedValue(mockResponse);

        const result = await AuthService.registerWithEmail('test@test.com', 'password123');
        expect(result.user?.id).toBe('123');
        expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'password123'
        });
    });
});
