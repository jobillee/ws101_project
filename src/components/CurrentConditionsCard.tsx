import type { CurrentWeather } from '../types/api';
import { Card } from './Card';

interface CurrentConditionsCardProps {
  data: CurrentWeather;
}

export function CurrentConditionsCard({ data }: CurrentConditionsCardProps) {
  const condition = data.weather[0];

  return (
    <Card
      title={`${data.name}${data.sys.country ? `, ${data.sys.country}` : ''}`}
      subtitle={condition?.description}
    >
      <div className="current">
        <div className="current__temp">
          <span className="current__value">{Math.round(data.main.temp)}°C</span>
          {condition && (
            <img
              className="current__icon"
              src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
              alt={condition.description}
            />
          )}
        </div>
        <ul className="current__stats">
          <li>Feels like: {Math.round(data.main.feels_like)}°C</li>
          <li>Min / Max: {Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</li>
          <li>Humidity: {data.main.humidity}%</li>
          <li>Wind: {Math.round(data.wind.speed)} m/s</li>
          <li>Pressure: {data.main.pressure} hPa</li>
          <li>Cloudiness: {data.clouds.all}%</li>
        </ul>
      </div>
    </Card>
  );
}