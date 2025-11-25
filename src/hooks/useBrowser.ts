import React, { useState, useCallback } from 'react';
import { WebviewElement } from './useWebviewManager';
import { DEFAULT_BROWSER_URL } from '../constants/aiServices';

export default function useBrowser(browserRef: React.RefObject<WebviewElement>) {
  const [browserUrl, setBrowserUrl] = useState(() => {
    try {
      const savedBrowserUrl = localStorage.getItem('browserUrl');
      if (savedBrowserUrl && typeof savedBrowserUrl === 'string' && savedBrowserUrl.trim().length > 0) {
        return savedBrowserUrl;
      }
      return DEFAULT_BROWSER_URL;
    } catch (error) {
      return DEFAULT_BROWSER_URL;
    }
  });

  const [browserInputUrl, setBrowserInputUrl] = useState(browserUrl);

  const handleBrowserNavigate = useCallback(() => {
    if (browserRef.current && browserInputUrl) {
      let url = browserInputUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      setBrowserUrl(url);
      browserRef.current.loadURL(url);
    }
  }, [browserRef, browserInputUrl]);

  const handleBrowserKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleBrowserNavigate();
      }
    },
    [handleBrowserNavigate]
  );

  return {
    browserUrl,
    browserInputUrl,
    setBrowserInputUrl,
    handleBrowserNavigate,
    handleBrowserKeyPress
  };
}
