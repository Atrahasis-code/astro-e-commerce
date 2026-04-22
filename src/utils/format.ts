/**
 * Formats a number as a currency string.
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
    }).format(price);
};
