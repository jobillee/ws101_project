# Weather SPA

A single-page application built with **Vite + TypeScript + React** that fetches live
weather data from the **OpenWeather REST API**.

Built for WS101 (Web Systems and Technologies 1) — Prelim Project.

## Features

- Current conditions for any city (temperature, feels-like, humidity, wind, pressure)
- 5-day / 3-hour forecast rendered as a typed list with `.map()`
- Search bar with controlled input
- Loading / error / success states via a discriminated union (`AsyncState<T>`)
- Generic custom hook `useFetch<T>`
- State management with `useReducer`
- Light / dark theme toggle via `useContext` (persisted to `localStorage`)
- Responsive layout (no UI framework — plain CSS)

## Setup

```bash
npm install
```

Create `.env.local` and set your OpenWeather API key:

```
VITE_OPENWEATHER_KEY=your_key_here
```

Get a free key at <https://openweathermap.org/api>.

```bash
npm run dev
```

Open <http://localhost:5173>.

## Useful commands

```bash
npm run dev       # start the dev server
npm run build     # type-check (tsc) + production build
npm run preview   # preview the production build
npx tsc --noEmit  # type-check only
```

## API source

[OpenWeather — Current Weather](https://openweathermap.org/current) and
[5 Day / 3 Hour Forecast](https://openweathermap.org/forecast5).

## Project structure

```
src/
├── components/
│   ├── Card.tsx                  # Typed props with children
│   ├── SearchBar.tsx             # Controlled input with event typing
│   ├── ItemList.tsx              # Generic list rendered with typed .map()
│   ├── DataState.tsx             # Renders idle/loading/error/success
│   ├── CurrentConditionsCard.tsx
│   ├── ForecastListCard.tsx
│   └── ForecastDetailCard.tsx
├── hooks/
│   └── useFetch.ts               # Generic <T> hook + discriminated union
├── contexts/
│   └── ThemeContext.tsx          # useContext for shared theme state
├── types/
│   └── api.ts                    # OpenWeather response interfaces
├── lib/
│   ├── openweather.ts            # URL builders / API key helpers
│   └── format.ts                 # Display formatting helpers
├── App.tsx                       # Root composition (useReducer)
├── App.css                       # Responsive styling
└── main.tsx                      # Entry point
```

## TypeScript

`tsconfig.json` runs in `strict: true` mode. No `any` types are used in `src/`.