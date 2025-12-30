import React, { useRef, useState, useEffect } from 'react';

export interface WebviewElement extends HTMLElement {
  src: string;
  partition: string;
  executeJavaScript: (code: string) => Promise<unknown>;
  openDevTools: () => void;
  reload: () => void;
  loadURL: (url: string) => Promise<void>;
}

export interface WebviewRefs {
  chatgptRef: React.RefObject<WebviewElement>;
  geminiRef: React.RefObject<WebviewElement>;
  perplexityRef: React.RefObject<WebviewElement>;
  claudeRef: React.RefObject<WebviewElement>;
  mistralRef: React.RefObject<WebviewElement>;
  browserRef: React.RefObject<WebviewElement>;
}

export interface WebviewsReady {
  chatgpt: boolean;
  gemini: boolean;
  perplexity: boolean;
  claude: boolean;
  mistral: boolean;
  browser: boolean;
}

export function useWebviewManager() {
  const chatgptRef = useRef<WebviewElement>(null);
  const geminiRef = useRef<WebviewElement>(null);
  const perplexityRef = useRef<WebviewElement>(null);
  const claudeRef = useRef<WebviewElement>(null);
  const mistralRef = useRef<WebviewElement>(null);
  const browserRef = useRef<WebviewElement>(null);

  const [webviewsReady, setWebviewsReady] = useState<WebviewsReady>({
    chatgpt: false,
    gemini: false,
    perplexity: false,
    claude: false,
    mistral: false,
    browser: false
  });

  useEffect(() => {
    if (window.Main) {
      window.Main.removeLoading();
    }

    let interval: number | null = null;
    let timeout: number | null = null;

    const checkWebviewsReady = () => {
      const chatgptReady = chatgptRef.current !== null;
      const geminiReady = geminiRef.current !== null;
      const perplexityReady = perplexityRef.current !== null;
      const claudeReady = claudeRef.current !== null;
      const mistralReady = mistralRef.current !== null;
      const browserReady = browserRef.current !== null;

      const allReady = chatgptReady && geminiReady && perplexityReady && claudeReady && mistralReady && browserReady;

      setWebviewsReady({
        chatgpt: chatgptReady,
        gemini: geminiReady,
        perplexity: perplexityReady,
        claude: claudeReady,
        mistral: mistralReady,
        browser: browserReady
      });

      // 모든 webview가 준비되면 interval 조기 종료
      if (allReady && interval !== null) {
        clearInterval(interval);
        if (timeout !== null) clearTimeout(timeout);
      }
    };

    // 1000ms로 증가 (CPU 사용량 감소)
    interval = window.setInterval(checkWebviewsReady, 1000);
    checkWebviewsReady();

    // 최대 10초까지 체크
    timeout = window.setTimeout(() => {
      if (interval !== null) clearInterval(interval);
    }, 10000);

    return () => {
      if (interval !== null) clearInterval(interval);
      if (timeout !== null) clearTimeout(timeout);
    };
  }, []);

  return {
    refs: { chatgptRef, geminiRef, perplexityRef, claudeRef, mistralRef, browserRef },
    webviewsReady
  };
}
