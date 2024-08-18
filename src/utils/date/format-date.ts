export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${days}.${month}.${year}`;
}