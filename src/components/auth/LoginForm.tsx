import { useState } from 'preact/hooks';
import { AuthService } from '@/services/auth.service';
import { setUser } from '@/store/auth.store';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMagicLink, setIsMagicLink] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isMagicLink) {
                await AuthService.loginWithMagicLink(email);
                setError('Enlace mágico enviado. Revisa tu correo.');
            } else {
                const { user, session } = await AuthService.loginWithEmail(email, password);
                if (user) {
                    setUser(user);
                    // Sync cookies for SSR (Supabase helper usually does this, but we ensure it)
                    document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=3600; SameSite=Lax; Secure`;
                    document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=3600; SameSite=Lax; Secure`;
                    window.location.href = '/';
                }
            }
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-black/5">
            <h2 class="text-3xl font-['Outfit'] font-bold text-brand-gray mb-2">Bienvenido</h2>
            <p class="text-[#86868B] mb-8 text-sm">Ingresa tus credenciales para continuar</p>

            <form onSubmit={handleSubmit} class="space-y-5">
                <div>
                    <label class="block text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Email</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                        placeholder="tu@email.com"
                        class="w-full px-5 py-3.5 bg-surface-gray rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm font-medium"
                    />
                </div>

                {!isMagicLink && (
                    <div>
                        <label class="block text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                            placeholder="••••••••"
                            class="w-full px-5 py-3.5 bg-surface-gray rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm font-medium"
                        />
                    </div>
                )}

                {error && (
                    <div class={`p-4 rounded-xl text-xs font-semibold ${error.includes('enviado') ? 'bg-blue-50 text-brand-blue' : 'bg-red-50 text-red-600'}`}>
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    class="w-full py-4 bg-brand-blue text-white rounded-full font-bold text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                    {loading ? 'Procesando...' : isMagicLink ? 'Enviar Enlace' : 'Iniciar Sesión'}
                </button>
            </form>

            <div class="mt-8 pt-6 border-t border-black/5 text-center">
                <button 
                    onClick={() => setIsMagicLink(!isMagicLink)}
                    class="text-xs font-bold text-brand-blue hover:underline"
                >
                    {isMagicLink ? 'Usar contraseña' : 'Usar enlace mágico (Magic Link)'}
                </button>
            </div>
        </div>
    );
}
