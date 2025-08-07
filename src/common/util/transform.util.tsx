export function convertTimestamp(timestamp: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  if (typeof timestamp === 'string') {
    timestamp = new Date(new Date(timestamp).getTime() + 8 * 60 * 60 * 1000);
  }
  const result = timestamp?.toLocaleDateString([], options).split(',')[1].trim();
  return result;
}
