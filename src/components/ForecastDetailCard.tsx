import { formatDate, formatPercent, formatTemp } from '../lib/format';
import type { ForecastListItem } from '../types/api';
import { Card } from './Card';

interface ForecastDetailCardProps {
  item: ForecastListItem;
  onClose: () => void;
}

export function ForecastDetailCard({ item, onClose }: ForecastDetailCardProps) {
  return (
    <Card title="Forecast Details" subtitle={formatDate(item.dt_txt)}>
      <dl className="detail-grid">
        <div>
          <dt>Temperature</dt>
          <dd>{formatTemp(item.main.temp)}</dd>
        </div>
        <div>
          <dt>Feels like</dt>
          <dd>{formatTemp(item.main.feels_like)}</dd>
        </div>
        <div>
          <dt>Min / Max</dt>
          <dd>
            {formatTemp(item.main.temp_min)} / {formatTemp(item.main.temp_max)}
          </dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{item.main.humidity}%</dd>
        </div>
        <div>
          <dt>Pressure</dt>
          <dd>{item.main.pressure} hPa</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{Math.round(item.wind.speed)} m/s</dd>
        </div>
        <div>
          <dt>Cloudiness</dt>
          <dd>{item.clouds.all}%</dd>
        </div>
        <div>
          <dt>Rain probability</dt>
          <dd>{formatPercent(item.pop)}</dd>
        </div>
        <div>
          <dt>Visibility</dt>
          <dd>{item.visibility} m</dd>
        </div>
      </dl>
      <button type="button" className="load-more" onClick={onClose}>
        Close
      </button>
    </Card>
  );
}