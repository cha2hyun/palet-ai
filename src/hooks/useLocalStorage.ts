import { useState, useEffect } from 'react';

export interface EnabledServices {
  chatgpt: boolean;
  gemini: boolean;
  perplexity: boolean;
  claude: boolean;
  mistral: boolean;
  browser: boolean;
}

export type LayoutType = 'column' | 'row' | 'grid';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validator?: (value: unknown) => value is T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        const parsed = JSON.parse(savedValue);
        if (validator) {
          return validator(parsed) ? parsed : defaultValue;
        }
        return parsed as T;
      }
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error silently handled
    }
  }, [key, value]);

  return [value, setValue];
}

// 유효성 검증 함수들
export function isValidEnabledServices(value: unknown): value is EnabledServices {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as EnabledServices).chatgpt === 'boolean' &&
    typeof (value as EnabledServices).gemini === 'boolean' &&
    typeof (value as EnabledServices).perplexity === 'boolean' &&
    typeof (value as EnabledServices).claude === 'boolean' &&
    typeof (value as EnabledServices).mistral === 'boolean' &&
    typeof (value as EnabledServices).browser === 'boolean'
  );
}

export function isValidLayoutType(value: unknown): value is LayoutType {
  return value === 'column' || value === 'row' || value === 'grid';
}

export function isValidUrl(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

// AI 서비스별 마지막 URL 저장 타입
export interface LastUrls {
  chatgpt: string;
  gemini: string;
  perplexity: string;
  claude: string;
  mistral: string;
}

export function isValidLastUrls(value: unknown): value is LastUrls {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as LastUrls).chatgpt === 'string' &&
    typeof (value as LastUrls).gemini === 'string' &&
    typeof (value as LastUrls).perplexity === 'string' &&
    typeof (value as LastUrls).claude === 'string' &&
    typeof (value as LastUrls).mistral === 'string'
  );
}
