import { useState } from 'react';
import { formatDate, formatPercent, formatTemp } from '../lib/format';
import type { ForecastResponse } from '../types/api';
import { Card } from './Card';
import { ItemList } from './ItemList';

const PAGE_SIZE = 8;

interface ForecastListCardProps {
  data: ForecastResponse;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ForecastListCard({ data, selectedIndex, onSelect }: ForecastListCardProps) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const visibleItems = data.list.slice(0, limit);
  const hasMore = limit < data.list.length;

  return (
    <Card title="5-Day Forecast" subtitle={`3-hour steps · ${data.city.name}, ${data.city.country}`}>
      <ItemList
        items={visibleItems}
        keyOf={(item) => item.dt}
        renderItem={(item, index) => {
          const condition = item.weather[0];
          return (
            <button
              type="button"
              className={selectedIndex === index ? 'forecast-item forecast-item--selected' : 'forecast-item'}
              onClick={() => onSelect(index)}
            >
              <span className="forecast-item__time">{formatDate(item.dt_txt)}</span>
              {condition && (
                <img
                  className="forecast-item__icon"
                  src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                  alt={condition.description}
                />
              )}
              <span className="forecast-item__temp">{formatTemp(item.main.temp)}</span>
              <span className="forecast-item__desc">{condition?.description ?? '—'}</span>
              <span className="forecast-item__pop">Rain {formatPercent(item.pop)}</span>
            </button>
          );
        }}
      />
      {hasMore && (
        <button
          type="button"
          className="load-more"
          onClick={() => setLimit((current) => current + PAGE_SIZE)}
        >
          Show more
        </button>
      )}
    </Card>
  );
}