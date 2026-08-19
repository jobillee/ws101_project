export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatDate(dtTxt: string): string {
  const date = new Date(`${dtTxt}Z`);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
