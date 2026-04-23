import { useState } from 'preact/hooks';
import { AuthService } from '@/services/auth.service';
import { setUser } from '@/store/auth.store';

export default function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { user, session } = await AuthService.loginWithEmail(email, password);
            
            if (user) {
                const role = await AuthService.getUserRole(user.id);
                const staffRoles = ['admin', 'editor', 'support'];
                
                if (!staffRoles.includes(role)) {
                    await AuthService.logout();
                    throw new Error('Acceso denegado: Se requieren permisos de staff.');
                }

                setUser(user);
                document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=3600; SameSite=Lax; Secure`;
                document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=3600; SameSite=Lax; Secure`;
                window.location.href = '/admin/dashboard'; // Assuming a dashboard exists or will exist
            }
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="w-full max-w-md p-10 bg-[#2C2C2E] rounded-3xl shadow-2xl border border-white/5 text-white">
            <div class="flex flex-col items-center mb-8">
                <div class="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-4 border border-brand-blue/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0071E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h2 class="text-2xl font-['Outfit'] font-bold">Panel de Control</h2>
                <p class="text-white/40 text-sm mt-1 text-center">Acceso restringido solo para personal autorizado</p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-6">
                <div>
                    <label class="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2.5">Email Staff</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                        placeholder="admin@digitalstore.com"
                        class="w-full px-5 py-4 bg-[#1C1C1E] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all text-sm font-medium text-white"
                    />
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2.5">Contraseña</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                        placeholder="••••••••"
                        class="w-full px-5 py-4 bg-[#1C1C1E] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all text-sm font-medium text-white"
                    />
                </div>

                {error && (
                    <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-semibold text-red-400">
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    class="w-full py-4 bg-brand-blue text-white rounded-full font-bold text-sm hover:bg-brand-blue/90 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-brand-blue/20"
                >
                    {loading ? 'Verificando...' : 'Autenticar Staff'}
                </button>
            </form>

            <div class="mt-8 text-center">
                <a href="/" class="text-xs font-medium text-white/30 hover:text-white transition-colors">Volver a la tienda pública</a>
            </div>
        </div>
    );
}
