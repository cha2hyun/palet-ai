import React, { useState, useCallback, useMemo } from 'react';
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
  type EnabledServices,
  type LayoutType
} from './hooks/useLocalStorage';
import { useWebviewManager } from './hooks/useWebviewManager';
import { useAIServices } from './hooks/useAIServices';
import { useBrowser } from './hooks/useBrowser';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);

  // localStorage 연동 상태
  const [enabledServices, setEnabledServices] = useLocalStorage<EnabledServices>(
    'enabledServices',
    { chatgpt: true, gemini: true, perplexity: true, claude: true, browser: false },
    isValidEnabledServices
  );

  const [layoutType, setLayoutType] = useLocalStorage<LayoutType>('layoutType', 'column', isValidLayoutType);

  // Webview 관리
  const { refs, webviewsReady } = useWebviewManager();
  const { chatgptRef, geminiRef, perplexityRef, claudeRef, browserRef } = refs;

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

    // Browser에 전송
    if (enabledServices.browser && webviewsReady.browser) {
      await searchInBrowser(browserRef, prompt);
    }

    setTimeout(() => {
      setIsSending(false);
    }, 1000);
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
        />

        {/* Google Gemini */}
        <WebviewPanel
          service={AI_SERVICES.gemini}
          webviewRef={geminiRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.gemini}
        />

        {/* Claude */}
        <WebviewPanel
          service={AI_SERVICES.claude}
          webviewRef={claudeRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.claude}
        />

        {/* Perplexity */}
        <WebviewPanel
          service={AI_SERVICES.perplexity}
          webviewRef={perplexityRef as unknown as React.RefObject<HTMLElement>}
          isVisible={enabledServices.perplexity}
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
          {/* 상단 컨트롤 영역 */}
          <div className="flex items-center gap-4">
            <ServiceSelector enabledServices={enabledServices} setEnabledServices={setEnabledServices} />
            <LayoutSelector layoutType={layoutType} setLayoutType={setLayoutType} />

            {/* 개발 모드에서만 표시 */}
            {import.meta.env.DEV && (
              <DeveloperTools
                chatgptRef={chatgptRef}
                geminiRef={geminiRef}
                perplexityRef={perplexityRef}
                claudeRef={claudeRef}
              />
            )}

            {/* GitHub 바로가기 */}
            <a
              href="https://github.com/cha2hyun/PaletAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-10 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-gray-400">GitHub</span>
            </a>
          </div>

          {/* 입력창 및 전송 버튼 */}
          <InputArea prompt={prompt} setPrompt={setPrompt} isSending={isSending} onSend={handleSendToAll} />
        </div>
      </div>
    </div>
  );
}

export default App;
