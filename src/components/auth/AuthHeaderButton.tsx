import { useEffect } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $user, setUser } from '@/store/auth.store';
import { AuthService } from '@/services/auth.service';
import type { User } from '@supabase/supabase-js';

interface Props {
    initialUser?: User | null;
}

export default function AuthHeaderButton({ initialUser }: Props) {
    const user = useStore($user);

    useEffect(() => {
        if (initialUser && !$user.get()) {
            setUser(initialUser);
        }
    }, [initialUser]);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            // Clear cookies
            document.cookie = 'sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure';
            document.cookie = 'sb-refresh-token=; path=/; max-age=0; SameSite=Lax; Secure';
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (user) {
        return (
            <div class="flex items-center gap-4">
                <div class="hidden md:flex flex-col items-end">
                    <span class="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Sesión activa</span>
                    <span class="text-xs font-medium text-brand-gray truncate max-w-40">{user.email}</span>
                </div>
                <button 
                    onClick={handleLogout}
                    class="p-2.5 bg-surface-gray rounded-full text-brand-gray hover:bg-red-50 hover:text-red-600 transition-all group"
                    aria-label="Cerrar sesión"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-12 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </button>
            </div>
        );
    }

    return (
        <a 
            href="/login" 
            class="flex items-center gap-2 px-5 py-2 bg-brand-gray text-white text-xs font-bold rounded-full hover:opacity-90 transition-all active:scale-95 shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="hidden sm:inline">Ingresar</span>
        </a>
    );
}
