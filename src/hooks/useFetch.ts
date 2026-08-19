import { useEffect, useRef, useState } from 'react';

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

interface UseFetchOptions {
  headers?: HeadersInit;
}

/**
 * Generic fetch hook.
 *
 * Pass a `url` to start fetching; pass `null` to stay idle.
 * Returns a discriminated union so callers can narrow on `state.status`.
 */
export function useFetch<T>(url: string | null, options?: UseFetchOptions): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (url === null) {
      setState({ status: 'idle' });
      return;
    }

    const controller = new AbortController();
    const { headers } = optionsRef.current ?? {};

    let active = true;
    setState({ status: 'loading' });

    const load = async (): Promise<void> => {
      try {
        const response = await fetch(url, { headers, signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed (${response.status} ${response.statusText})`);
        }
        const data = (await response.json()) as T;
        if (active) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (active && !controller.signal.aborted) {
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error('An unknown error occurred'),
          });
        }
      }
    };

    void load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  return state;
}