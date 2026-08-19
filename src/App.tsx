import { useMemo, useReducer } from 'react';
import { Card } from './components/Card';
import { CurrentConditionsCard } from './components/CurrentConditionsCard';
import { DataState } from './components/DataState';
import { ForecastDetailCard } from './components/ForecastDetailCard';
import { ForecastListCard } from './components/ForecastListCard';
import { SearchBar } from './components/SearchBar';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useFetch } from './hooks/useFetch';
import { buildForecastUrl, buildWeatherUrl, isApiKeyConfigured } from './lib/openweather';
import type { CurrentWeather, ForecastResponse } from './types/api';

interface SearchState {
  query: string;
  submitted: string | null;
  selectedIndex: number | null;
}

type SearchAction =
  | { type: 'type'; value: string }
  | { type: 'submit'; city: string }
  | { type: 'select'; index: number }
  | { type: 'deselect' };

const initialState: SearchState = {
  query: '',
  submitted: null,
  selectedIndex: null,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'type':
      return { ...state, query: action.value };
    case 'submit':
      return { ...state, query: action.city, submitted: action.city, selectedIndex: null };
    case 'select':
      return { ...state, selectedIndex: action.index };
    case 'deselect':
      return { ...state, selectedIndex: null };
  }
}

function AppContent() {
  const [search, dispatch] = useReducer(searchReducer, initialState);
  const { theme, toggleTheme } = useTheme();

  const weatherUrl = useMemo(
    () => (search.submitted === null ? null : buildWeatherUrl(search.submitted)),
    [search.submitted],
  );
  const forecastUrl = useMemo(
    () => (search.submitted === null ? null : buildForecastUrl(search.submitted)),
    [search.submitted],
  );

  const current = useFetch<CurrentWeather>(weatherUrl);
  const forecast = useFetch<ForecastResponse>(forecastUrl);

  const selectedItem =
    search.selectedIndex !== null && forecast.status === 'success'
      ? (forecast.data.list[search.selectedIndex] ?? null)
      : null;

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Weather SPA</h1>
          <p className="app__tagline">
            Live conditions &amp; 5-day forecast from the OpenWeather REST API
          </p>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
        </button>
      </header>

      {!isApiKeyConfigured() && (
        <Card title="API key required">
          <p>
            Create <code>.env.local</code> and set <code>VITE_OPENWEATHER_KEY</code> to your
            OpenWeather API key, then restart <code>npm run dev</code>.
          </p>
        </Card>
      )}

      <SearchBar
        value={search.query}
        onChange={(value) => dispatch({ type: 'type', value })}
        placeholder="Search a city, e.g. Manila"
        onSearch={(city) => dispatch({ type: 'submit', city })}
      />

      {search.submitted === null ? (
        <Card title="Ready when you are">
          <p>Enter a city above to load its current conditions and 5-day forecast.</p>
        </Card>
      ) : (
        <div className="results">
          <section aria-label={`Current weather for ${search.submitted}`}>
            <DataState state={current} renderSuccess={(data) => <CurrentConditionsCard data={data} />} />
          </section>
          <section aria-label={`Forecast for ${search.submitted}`}>
            <DataState
              state={forecast}
              renderSuccess={(data) => (
                <ForecastListCard
                  data={data}
                  selectedIndex={search.selectedIndex}
                  onSelect={(index) => dispatch({ type: 'select', index })}
                />
              )}
            />
          </section>
          {selectedItem && (
            <section aria-label="Selected forecast details">
              <ForecastDetailCard
                item={selectedItem}
                onClose={() => dispatch({ type: 'deselect' })}
              />
            </section>
          )}
        </div>
      )}

      <footer className="app__footer">
        <p>
          Data source:{' '}
          <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer">
            OpenWeather API
          </a>
        </p>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}