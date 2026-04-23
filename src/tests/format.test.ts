import { describe, it, expect } from 'vitest';
import { formatPrice } from '@/utils/format';

describe('formatPrice', () => {
    it('formats positive numbers correctly', () => {
        // En es-BO el formato es "Bs 49,99" (notar coma decimal)
        expect(formatPrice(49.99)).toMatch(/Bs[ \u00A0]49,99/);
    });

    it('formats large numbers with separators', () => {
        expect(formatPrice(1250.5)).toMatch(/Bs[ \u00A0]1.250,50/);
    });

    it('formats zero correctly', () => {
        expect(formatPrice(0)).toMatch(/Bs[ \u00A0]0,00/);
    });
});
