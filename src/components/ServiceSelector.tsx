import React, { useMemo } from 'react';
import { Checkbox, Chip, Tooltip } from '@heroui/react';
import { EnabledServices } from '../hooks/useLocalStorage';

interface ServiceSelectorProps {
  enabledServices: EnabledServices;
  setEnabledServices: (services: EnabledServices) => void;
}

const MAX_SELECTIONS = 5;

export default function ServiceSelector({ enabledServices, setEnabledServices }: ServiceSelectorProps) {
  // 현재 선택된 서비스 개수 계산
  const selectedCount = useMemo(() => {
    return Object.values(enabledServices).filter(Boolean).length;
  }, [enabledServices]);

  // 최대 선택 개수 도달 여부
  const isMaxReached = selectedCount >= MAX_SELECTIONS;

  return (
    <div className="h-10 flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
      <Chip size="md" variant="flat" className="text-gray-500 bg-transparent">
        Target:
      </Chip>

      <Tooltip
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.chatgpt || !isMaxReached}
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
            isDisabled={!enabledServices.chatgpt && isMaxReached}
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
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.gemini || !isMaxReached}
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
            isDisabled={!enabledServices.gemini && isMaxReached}
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
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.perplexity || !isMaxReached}
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
            isDisabled={!enabledServices.perplexity && isMaxReached}
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
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.claude || !isMaxReached}
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
            isDisabled={!enabledServices.claude && isMaxReached}
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
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.mistral || !isMaxReached}
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
            isDisabled={!enabledServices.mistral && isMaxReached}
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
        content="Maximum 5 selections allowed"
        isDisabled={enabledServices.browser || !isMaxReached}
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
            isDisabled={!enabledServices.browser && isMaxReached}
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
