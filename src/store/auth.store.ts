import { atom } from 'nanostores';
import type { User } from '@supabase/supabase-js';

export const $user = atom<User | null>(null);
export const $isAuthenticated = atom<boolean>(false);

export function setUser(user: User | null) {
    $user.set(user);
    $isAuthenticated.set(!!user);
}
