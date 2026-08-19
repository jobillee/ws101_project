import type { ReactNode } from 'react';
import type { AsyncState } from '../hooks/useFetch';

interface DataStateProps<T> {
  state: AsyncState<T>;
  loadingText?: string;
  renderSuccess: (data: T) => ReactNode;
}

export function DataState<T>({ state, loadingText = 'Loading...', renderSuccess }: DataStateProps<T>) {
  switch (state.status) {
    case 'idle':
      return <p className="status status--idle">Waiting for a search…</p>;
    case 'loading':
      return (
        <p className="status status--loading" role="status">
          {loadingText}
        </p>
      );
    case 'error':
      return (
        <p className="status status--error" role="alert">
          {state.error.message}
        </p>
      );
    case 'success':
      return <>{renderSuccess(state.data)}</>;
  }
}