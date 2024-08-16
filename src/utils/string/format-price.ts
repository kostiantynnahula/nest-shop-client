export const formatPrice = (price: number) => {
  return price.toLocaleString('en-EN', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
}