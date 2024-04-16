export const formatPrice = (price: number, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2, // Ensure at least 2 decimal places
        maximumFractionDigits: 2 // Maximum 2 decimal places
    }).format(price);
}