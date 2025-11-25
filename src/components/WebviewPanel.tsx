import React, { useEffect, useRef } from 'react';
import { AIServiceConfig } from '../constants/aiServices';

interface WebviewPanelProps {
  service: AIServiceConfig;
  webviewRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  lastUrl?: string;
  onUrlChange?: (serviceName: string, url: string) => void;
}

export default function WebviewPanel({ service, webviewRef, isVisible, lastUrl, onUrlChange }: WebviewPanelProps) {
  // useRef로 초기 URL을 고정 - 컴포넌트가 리렌더링되어도 절대 변경되지 않음
  const initialUrlRef = useRef(lastUrl || service.url);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const webview = webviewRef.current as any;
    if (!webview) {
      return undefined;
    }

    // URL 변경 감지 (디바운스 적용) - localStorage에만 저장
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNavigate = (event: any) => {
      const newUrl = event.url;
      if (!newUrl || !onUrlChange) return;

      // 기존 타이머가 있으면 취소
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 2초 후에 URL을 localStorage에 저장 (webview는 리로드하지 않음)
      debounceTimerRef.current = setTimeout(() => {
        onUrlChange(service.name, newUrl);
      }, 2000);
    };

    // did-navigate 이벤트 리스너 등록
    webview.addEventListener('did-navigate', handleNavigate);
    webview.addEventListener('did-navigate-in-page', handleNavigate);

    return () => {
      webview.removeEventListener('did-navigate', handleNavigate);
      webview.removeEventListener('did-navigate-in-page', handleNavigate);

      // 클린업 시 타이머도 정리
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [webviewRef, service.name, onUrlChange]);

  return (
    <div className="flex-1 flex flex-col border-r border-gray-900" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="h-8 flex-none px-4 py-2 bg-black/80 border-b border-gray-900">
        <h2 className="text-sm font-medium text-gray-400">{service.displayName}</h2>
      </div>
      <webview
        ref={webviewRef}
        src={initialUrlRef.current}
        partition={service.partition}
        className="flex-1 w-full h-full"
        style={{ display: 'inline-flex' }}
      />
    </div>
  );
}
