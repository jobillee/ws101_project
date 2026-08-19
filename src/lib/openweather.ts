const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function getApiKey(): string {
  return import.meta.env.VITE_OPENWEATHER_KEY ?? '';
}

export function isApiKeyConfigured(): boolean {
  const key = getApiKey().trim();
  return key.length > 0 && key !== 'PASTE_YOUR_KEY_HERE';
}

function buildUrl(path: string, city: string): string {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', getApiKey());
  url.searchParams.set('units', 'metric');
  return url.toString();
}

export function buildWeatherUrl(city: string): string {
  return buildUrl('/weather', city);
}

export function buildForecastUrl(city: string): string {
  return buildUrl('/forecast', city);
}
