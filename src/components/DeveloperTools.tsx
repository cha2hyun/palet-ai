import React, { useCallback } from 'react';
import { Tooltip } from '@heroui/react';
import { WebviewElement } from '../hooks/useWebviewManager';

interface DeveloperToolsProps {
  chatgptRef: React.RefObject<WebviewElement>;
  geminiRef: React.RefObject<WebviewElement>;
  perplexityRef: React.RefObject<WebviewElement>;
  claudeRef: React.RefObject<WebviewElement>;
  mistralRef: React.RefObject<WebviewElement>;
}

export default function DeveloperTools({ chatgptRef, geminiRef, perplexityRef, claudeRef, mistralRef }: DeveloperToolsProps) {
  const openDevTools = useCallback((webviewRef: React.RefObject<WebviewElement>) => {
    if (webviewRef.current) {
      webviewRef.current.openDevTools();
    }
  }, []);

  const analyzeDOM = useCallback(async (webviewRef: React.RefObject<WebviewElement>, name: string) => {
    if (!webviewRef.current) return;

    try {
      const code = `
        (function() {
          console.log('\\n====== ${name} DOM 분석 시작 ======\\n');
          
          // 1. 모든 textarea 찾기
          console.log('📝 입력창 (Textarea) 분석:');
          const textareas = document.querySelectorAll('textarea');
          textareas.forEach((ta, index) => {
            console.log(\`  [Textarea \${index + 1}]\`);
            console.log('    - id:', ta.id || '(없음)');
            console.log('    - class:', ta.className || '(없음)');
            console.log('    - aria-label:', ta.getAttribute('aria-label') || '(없음)');
            console.log('    - placeholder:', ta.placeholder || '(없음)');
            console.log('    - name:', ta.name || '(없음)');
            console.log('    - 표시 여부:', ta.offsetParent !== null ? '✅ 보임' : '❌ 숨김');
            console.log('');
          });
          
          // 2. contenteditable 요소 찾기
          console.log('✏️  ContentEditable 요소:');
          const editables = document.querySelectorAll('[contenteditable="true"]');
          editables.forEach((el, index) => {
            console.log(\`  [Editable \${index + 1}]\`);
            console.log('    - 태그:', el.tagName);
            console.log('    - class:', el.className || '(없음)');
            console.log('    - aria-label:', el.getAttribute('aria-label') || '(없음)');
            console.log('    - 표시 여부:', el.offsetParent !== null ? '✅ 보임' : '❌ 숨김');
            console.log('');
          });
          
          // 3. 모든 button 찾기 (보이는 것만)
          console.log('🔘 버튼 (Button) 분석:');
          const buttons = document.querySelectorAll('button');
          let visibleButtonCount = 0;
          buttons.forEach((btn, index) => {
            // 보이는 버튼만 표시
            if (btn.offsetParent !== null) {
              visibleButtonCount++;
              console.log(\`  [Button \${visibleButtonCount}]\`);
              console.log('    - type:', btn.type || '(없음)');
              console.log('    - class:', btn.className || '(없음)');
              console.log('    - aria-label:', btn.getAttribute('aria-label') || '(없음)');
              console.log('    - textContent:', btn.textContent?.trim().substring(0, 50) || '(없음)');
              console.log('    - data-* 속성:', 
                Array.from(btn.attributes)
                  .filter(attr => attr.name.startsWith('data-'))
                  .map(attr => \`\${attr.name}="\${attr.value}"\`)
                  .join(', ') || '(없음)'
              );
              
              // SVG 아이콘이 있는지 확인
              const hasSvg = btn.querySelector('svg') !== null;
              console.log('    - SVG 아이콘:', hasSvg ? '✅ 있음' : '❌ 없음');
              console.log('');
            }
          });
          console.log(\`총 \${visibleButtonCount}개의 보이는 버튼이 있습니다.\\n\`);
          
          // 4. Form 요소 찾기
          console.log('📋 Form 요소:');
          const forms = document.querySelectorAll('form');
          forms.forEach((form, index) => {
            console.log(\`  [Form \${index + 1}]\`);
            console.log('    - action:', form.action || '(없음)');
            console.log('    - method:', form.method || '(없음)');
            console.log('    - class:', form.className || '(없음)');
            console.log('');
          });
          
          console.log('\\n====== 분석 완료 ======\\n');
          console.log('💡 팁: 위 정보를 바탕으로 src/App.tsx의 셀렉터를 업데이트하세요!\\n');
          
          return true;
        })();
      `;

      await webviewRef.current.executeJavaScript(code);
    } catch (error) {
      // Error silently handled
    }
  }, []);

  const [showDevTools, setShowDevTools] = React.useState(false);

  return (
    <div className="flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 h-10">
      <button
        onClick={() => setShowDevTools(!showDevTools)}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-400 transition-colors whitespace-nowrap"
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform ${showDevTools ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Dev Tools
      </button>

      {showDevTools && (
        <>
          <div className="h-4 w-px bg-gray-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 whitespace-nowrap">DevTools:</span>
            <button
              onClick={() => openDevTools(chatgptRef)}
              className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded hover:bg-gray-700/50 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              ChatGPT
            </button>
            <button
              onClick={() => openDevTools(geminiRef)}
              className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded hover:bg-gray-700/50 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Gemini
            </button>
            <button
              onClick={() => openDevTools(perplexityRef)}
              className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded hover:bg-gray-700/50 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Perplexity
            </button>
            <button
              onClick={() => openDevTools(claudeRef)}
              className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded hover:bg-gray-700/50 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Claude
            </button>
            <button
              onClick={() => openDevTools(mistralRef)}
              className="px-2 py-0.5 text-xs bg-gray-800/50 text-gray-400 rounded hover:bg-gray-700/50 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Mistral
            </button>
          </div>

          <div className="h-4 w-px bg-gray-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 whitespace-nowrap">DOM:</span>
            <button
              onClick={() => analyzeDOM(chatgptRef, 'ChatGPT')}
              className="px-2 py-0.5 text-xs bg-gray-800/30 text-gray-400 rounded hover:bg-gray-700/40 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              ChatGPT
            </button>
            <button
              onClick={() => analyzeDOM(geminiRef, 'Gemini')}
              className="px-2 py-0.5 text-xs bg-gray-800/30 text-gray-400 rounded hover:bg-gray-700/40 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Gemini
            </button>
            <button
              onClick={() => analyzeDOM(perplexityRef, 'Perplexity')}
              className="px-2 py-0.5 text-xs bg-gray-800/30 text-gray-400 rounded hover:bg-gray-700/40 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Perplexity
            </button>
            <button
              onClick={() => analyzeDOM(claudeRef, 'Claude')}
              className="px-2 py-0.5 text-xs bg-gray-800/30 text-gray-400 rounded hover:bg-gray-700/40 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Claude
            </button>
            <button
              onClick={() => analyzeDOM(mistralRef, 'Mistral')}
              className="px-2 py-0.5 text-xs bg-gray-800/30 text-gray-400 rounded hover:bg-gray-700/40 hover:text-gray-300 transition-all whitespace-nowrap"
            >
              Mistral
            </button>
          </div>

          <div className="h-4 w-px bg-gray-800" />
          <Tooltip
            content="Reset to initial state. All login sessions will be cleared."
            placement="top"
            showArrow
            delay={0}
            closeDelay={0}
            classNames={{
              content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded max-w-xs'
            }}
          >
            <button
              onClick={() => {
                if (window.confirm('Reset to initial state? All settings and login sessions will be cleared.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-2 py-0.5 text-xs bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 hover:text-red-300 transition-all whitespace-nowrap"
            >
              Reset
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
}
