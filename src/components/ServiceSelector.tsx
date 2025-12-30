import React, { useMemo } from 'react';
import { Checkbox, Chip, Tooltip } from '@heroui/react';
import { EnabledServices, LayoutType } from '../hooks/useLocalStorage';

interface ServiceSelectorProps {
  enabledServices: EnabledServices;
  setEnabledServices: (services: EnabledServices) => void;
  layoutType: LayoutType;
}

export default function ServiceSelector({ enabledServices, setEnabledServices, layoutType }: ServiceSelectorProps) {
  // 현재 선택된 서비스 개수 계산
  const selectedCount = useMemo(() => {
    return Object.values(enabledServices).filter(Boolean).length;
  }, [enabledServices]);

  // Grid 레이아웃이고 4개가 선택된 경우, 선택되지 않은 항목 비활성화
  const isMaxReachedInGrid = layoutType === 'grid' && selectedCount >= 4;
  return (
    <div className="h-10 flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
      <Chip size="md" variant="flat" className="text-gray-500 bg-transparent">
        Target
      </Chip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.chatgpt || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.chatgpt}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, chatgpt: checked })}
            isDisabled={!enabledServices.chatgpt && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            ChatGPT
          </Checkbox>
        </div>
      </Tooltip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.gemini || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.gemini}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, gemini: checked })}
            isDisabled={!enabledServices.gemini && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            Gemini
          </Checkbox>
        </div>
      </Tooltip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.perplexity || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.perplexity}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, perplexity: checked })}
            isDisabled={!enabledServices.perplexity && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            Perplexity
          </Checkbox>
        </div>
      </Tooltip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.claude || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.claude}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, claude: checked })}
            isDisabled={!enabledServices.claude && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            Claude
          </Checkbox>
        </div>
      </Tooltip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.mistral || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.mistral}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, mistral: checked })}
            isDisabled={!enabledServices.mistral && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            Mistral
          </Checkbox>
        </div>
      </Tooltip>

      <Tooltip
        content="Grid layout supports up to 4 selections"
        isDisabled={enabledServices.browser || !isMaxReachedInGrid}
        placement="top"
        showArrow
        delay={0}
        closeDelay={0}
        classNames={{
          content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
        }}
      >
        <div>
          <Checkbox
            isSelected={enabledServices.browser}
            onValueChange={(checked) => setEnabledServices({ ...enabledServices, browser: checked })}
            isDisabled={!enabledServices.browser && isMaxReachedInGrid}
            size="sm"
            classNames={{
              wrapper: 'w-4 h-4',
              label: 'text-sm font-medium text-gray-300'
            }}
          >
            Browser
          </Checkbox>
        </div>
      </Tooltip>
    </div>
  );
}
