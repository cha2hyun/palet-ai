import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Chip } from '@heroui/react';
import AppBar from './AppBar';
import ServiceSelector from './components/ServiceSelector';
import LayoutSelector from './components/LayoutSelector';
import InputArea from './components/InputArea';
import WebviewPanel from './components/WebviewPanel';
import BrowserPanel from './components/BrowserPanel';
import DeveloperTools from './components/DeveloperTools';
import { AI_SERVICES } from './constants/aiServices';
import {
  useLocalStorage,
  isValidEnabledServices,
  isValidLayoutType,
  isValidLastUrls,
  type EnabledServices,
  type LayoutType,
  type LastUrls
} from './hooks/useLocalStorage';
import { useWebviewManager } from './hooks/useWebviewManager';
import useAIServices from './hooks/useAIServices';
import useBrowser from './hooks/useBrowser';
import { useReleaseChecker } from './hooks/useReleaseChecker';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);

  // 릴리즈 체크
  const { releaseInfo } = useReleaseChecker();

  // Zoom 레벨 복원 및 저장
  useEffect(() => {
    if (!window.Main) return undefined;

    // 저장된 zoom 레벨 복원 (없으면 기본값 0 사용)
    const savedZoomLevel = localStorage.getItem('zoomLevel');
    if (savedZoomLevel) {
      const zoomLevel = parseFloat(savedZoomLevel);
      window.Main.RestoreZoomLevel(zoomLevel);
    } else {
      // 최초 실행 시 기본값 0으로 설정 (정상 크기)
      localStorage.setItem('zoomLevel', '0');
      window.Main.RestoreZoomLevel(0);
    }

    // zoom 레벨 변경 이벤트 리스너
    const handleZoomLevelChanged = (zoomLevel: number) => {
      localStorage.setItem('zoomLevel', zoomLevel.toString());
    };

    const listener = window.Main.on('zoom-level-changed', handleZoomLevelChanged);

    // Cleanup: 이벤트 리스너 제거
    return () => {
      if (window.Main && listener) {
        window.Main.removeListener('zoom-level-changed', listener);
      }
    };
  }, []);

  // localStorage 연동 상태
  const [enabledServices, setEnabledServices] = useLocalStorage<EnabledServices>(
    'enabledServices',
    { chatgpt: true, gemini: true, perplexity: true, claude: true, mistral: true, browser: false },
    isValidEnabledServices
  );

  const [layoutType, setLayoutType] = useLocalStorage<LayoutType>('layoutType', 'row', isValidLayoutType);

  // Grid 레이아웃 제약 조건 체크 (5개 이상 선택 시 자동으로 Row로 전환)
  useEffect(() => {
    const selectedCount = Object.values(enabledServices).filter(Boolean).length;
    if (layoutType === 'grid' && selectedCount > 4) {
      setLayoutType('row');
    }
  }, [enabledServices, layoutType, setLayoutType]);

  // 마지막 채팅 URL 저장
  const [lastUrls, setLastUrls] = useLocalStorage<LastUrls>(
    'lastUrls',
    {
      chatgpt: AI_SERVICES.chatgpt.url,
      gemini: AI_SERVICES.gemini.url,
      perplexity: AI_SERVICES.perplexity.url,
      claude: AI_SERVICES.claude.url,
      mistral: AI_SERVICES.mistral.url
    },
    isValidLastUrls
  );

  // Webview 관리
  const { refs, webviewsReady } = useWebviewManager();
  const { chatgptRef, geminiRef, perplexityRef, claudeRef, mistralRef, browserRef } = refs;

  // AI 서비스 관리
  const { sendToAI, searchInBrowser } = useAIServices();

  // 브라우저 관리
  const { browserUrl, browserInputUrl, setBrowserInputUrl, handleBrowserNavigate, handleBrowserKeyPress } =
    useBrowser(browserRef);

  // 레이아웃 클래스 메모이제이션
  const layoutClass = useMemo(() => {
    if (layoutType === 'column') return 'flex flex-col';
    if (layoutType === 'row') return 'flex flex-row';
    return 'grid grid-cols-2 grid-rows-2';
  }, [layoutType]);

  // URL 변경 핸들러 (functional update로 최적화)
  const handleUrlChange = useCallback(
    (serviceName: string, url: string) => {
      setLastUrls((prev: LastUrls) => ({
        ...prev,
        [serviceName]: url
      }));
    },
    [setLastUrls]
  );

  // New Chat 핸들러 - 모든 서비스를 메인 URL로 리셋
  const handleNewChat = useCallback(() => {
    const defaultUrls = {
      chatgpt: AI_SERVICES.chatgpt.url,
      gemini: AI_SERVICES.gemini.url,
      perplexity: AI_SERVICES.perplexity.url,
      claude: AI_SERVICES.claude.url,
      mistral: AI_SERVICES.mistral.url
    };

    // localStorage 업데이트
    setLastUrls(defaultUrls);

    // 각 webview를 메인 URL로 리로드
    if (chatgptRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (chatgptRef.current as any).loadURL(AI_SERVICES.chatgpt.url);
    }
    if (geminiRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (geminiRef.current as any).loadURL(AI_SERVICES.gemini.url);
    }
    if (perplexityRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (perplexityRef.current as any).loadURL(AI_SERVICES.perplexity.url);
    }
    if (claudeRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (claudeRef.current as any).loadURL(AI_SERVICES.claude.url);
    }
    if (mistralRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mistralRef.current as any).loadURL(AI_SERVICES.mistral.url);
    }
  }, [setLastUrls, chatgptRef, geminiRef, perplexityRef, claudeRef, mistralRef]);

  // 모든 AI 서비스에 전송
  const handleSendToAll = useCallback(async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsSending(true);

    // ChatGPT에 전송
    if (enabledServices.chatgpt && webviewsReady.chatgpt) {
      await sendToAI(
        chatgptRef,
        AI_SERVICES.chatgpt.selector,
        AI_SERVICES.chatgpt.buttonSelector,
        prompt,
        AI_SERVICES.chatgpt.displayName
      );
    }

    // Gemini에 전송
    if (enabledServices.gemini && webviewsReady.gemini) {
      await sendToAI(
        geminiRef,
        AI_SERVICES.gemini.selector,
        AI_SERVICES.gemini.buttonSelector,
        prompt,
        AI_SERVICES.gemini.displayName
      );
    }

    // Perplexity에 전송
    if (enabledServices.perplexity && webviewsReady.perplexity) {
      await sendToAI(
        perplexityRef,
        AI_SERVICES.perplexity.selector,
        AI_SERVICES.perplexity.buttonSelector,
        prompt,
        AI_SERVICES.perplexity.displayName
      );
    }

    // Claude에 전송
    if (enabledServices.claude && webviewsReady.claude) {
      await sendToAI(
        claudeRef,
        AI_SERVICES.claude.selector,
        AI_SERVICES.claude.buttonSelector,
        prompt,
        AI_SERVICES.claude.displayName
      );
    }

    // Mistral에 전송
    if (enabledServices.mistral && webviewsReady.mistral) {
      await sendToAI(
        mistralRef,
        AI_SERVICES.mistral.selector,
        AI_SERVICES.mistral.buttonSelector,
        prompt,
        AI_SERVICES.mistral.displayName
      );
    }

    // Browser에 전송
    if (enabledServices.browser && webviewsReady.browser) {
      await searchInBrowser(browserRef, prompt);
    }

    setTimeout(() => {
      setIsSending(false);
    }, 300);
  }, [
    prompt,
    enabledServices,
    webviewsReady,
    sendToAI,
    searchInBrowser,
    chatgptRef,
    geminiRef,
    perplexityRef,
    claudeRef,
    mistralRef,
    browserRef
  ]);

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* AppBar */}
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}

      {/* Webview 영역 (동적 분할) */}
      <div className={`flex-1 gap-0 overflow-hidden ${layoutClass}`}>
        {/* ChatGPT */}
        <WebviewPanel
          service={AI_SERVICES.chatgpt}
          webviewRef={chatgptRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.chatgpt}
          lastUrl={lastUrls.chatgpt}
          onUrlChange={handleUrlChange}
        />

        {/* Google Gemini */}
        <WebviewPanel
          service={AI_SERVICES.gemini}
          webviewRef={geminiRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.gemini}
          lastUrl={lastUrls.gemini}
          onUrlChange={handleUrlChange}
        />

        {/* Claude */}
        <WebviewPanel
          service={AI_SERVICES.claude}
          webviewRef={claudeRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.claude}
          lastUrl={lastUrls.claude}
          onUrlChange={handleUrlChange}
        />

        {/* Perplexity */}
        <WebviewPanel
          service={AI_SERVICES.perplexity}
          webviewRef={perplexityRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.perplexity}
          lastUrl={lastUrls.perplexity}
          onUrlChange={handleUrlChange}
        />

        {/* Mistral */}
        <WebviewPanel
          service={AI_SERVICES.mistral}
          webviewRef={mistralRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.mistral}
          lastUrl={lastUrls.mistral}
          onUrlChange={handleUrlChange}
        />

        {/* Web Browser */}
        <BrowserPanel
          browserRef={browserRef as unknown as React.RefObject<HTMLElement>}
          browserUrl={browserUrl}
          browserInputUrl={browserInputUrl}
          setBrowserInputUrl={setBrowserInputUrl}
          handleBrowserNavigate={handleBrowserNavigate}
          handleBrowserKeyPress={handleBrowserKeyPress}
          isVisible={enabledServices.browser}
        />
      </div>

      {/* 입력창 영역 (하단) */}
      <div className="flex-none px-6 py-4 border-t border-gray-900 bg-gray-950/50">
        <div className="max-w-full mx-auto space-y-2">
          {/* 컨트롤 영역 - 반응형 (한 줄 → 여러 줄로 자동 줄바꿈) */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* New Chat 버튼 - 맨 좌측 */}
            <button
              onClick={handleNewChat}
              className="h-10 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 backdrop-blur-sm rounded-lg border border-blue-500/50 hover:border-blue-500 transition-all duration-200"
            >
              <span className="text-sm font-medium text-blue-400">⚡️ New Chat</span>
            </button>

            <ServiceSelector
              enabledServices={enabledServices}
              setEnabledServices={setEnabledServices}
              layoutType={layoutType}
            />
            <LayoutSelector layoutType={layoutType} setLayoutType={setLayoutType} enabledServices={enabledServices} />

            {/* Zoom 컨트롤 */}
            {window.Main && (
              <div className="h-10 flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
                <Chip size="md" variant="flat" className="text-gray-500 bg-transparent">
                  Zoom
                </Chip>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.Main.ZoomOut()}
                    className="p-1.5 hover:bg-gray-800 rounded transition-colors"
                    title="축소 (Cmd -)"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>

                  <button
                    onClick={() => window.Main.ZoomIn()}
                    className="p-1.5 hover:bg-gray-800 rounded transition-colors"
                    title="확대 (Cmd +)"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* 개발 모드에서만 표시 */}
            {import.meta.env.DEV && (
              <DeveloperTools
                chatgptRef={chatgptRef}
                geminiRef={geminiRef}
                perplexityRef={perplexityRef}
                claudeRef={claudeRef}
                mistralRef={mistralRef}
              />
            )}

            {/* GitHub 바로가기 */}
            <button
              onClick={() => window.Main?.OpenExternalLink('https://github.com/cha2hyun/PaletAI')}
              className="flex items-center gap-2 h-10 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-gray-400">GitHub</span>
            </button>

            {/* 새 릴리즈 알림 */}
            {releaseInfo && releaseInfo.hasNewVersion && (
              <button
                onClick={() => window.Main?.OpenExternalLink(releaseInfo.releaseUrl)}
                className="flex items-center gap-2 h-10 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/50 hover:border-green-500 transition-colors animate-pulse cursor-pointer"
                title={`새 버전 ${releaseInfo.latestVersion} 사용 가능`}
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-xs font-medium text-green-400">v{releaseInfo.latestVersion}</span>
              </button>
            )}
          </div>

          {/* 입력창 및 전송 버튼 */}
          <InputArea prompt={prompt} setPrompt={setPrompt} isSending={isSending} onSend={handleSendToAll} />
        </div>
      </div>
    </div>
  );
}

export default App;
