import React, { useState } from 'react';
import packageJson from '../package.json';

function AppBar() {
  const [isMaximize, setMaximize] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  return (
    <div
      className="bg-black/95 py-2 flex justify-between draggable text-white items-center border-b border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-flex items-center gap-3 pl-3">
        {/* macOS 스타일 창 컨트롤 버튼 - 미니멀 버전 */}
        <div className="inline-flex gap-2 undraggable">
          <button
            onClick={window.Main.Close}
            className="w-3 h-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center group"
            title="닫기"
          >
            {isHovered && (
              <span className="text-gray-300 text-[10px] font-bold leading-none opacity-0 group-hover:opacity-100">
                ×
              </span>
            )}
          </button>
          <button
            onClick={window.Main.Minimize}
            className="w-3 h-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center group"
            title="최소화"
          >
            {isHovered && (
              <span className="text-gray-300 text-[10px] font-bold leading-none opacity-0 group-hover:opacity-100">
                −
              </span>
            )}
          </button>
          <button
            onClick={handleToggle}
            className="w-3 h-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center group"
            title="최대화"
          >
            {isHovered && (
              <span className="text-gray-300 text-[10px] font-bold leading-none opacity-0 group-hover:opacity-100">
                {isMaximize ? '−' : '+'}
              </span>
            )}
          </button>
        </div>

        <p className="text-sm text-gray-400">palet-ai (v{packageJson.version})</p>
      </div>
    </div>
  );
}

export default AppBar;
