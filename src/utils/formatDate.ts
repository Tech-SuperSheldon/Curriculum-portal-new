export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};