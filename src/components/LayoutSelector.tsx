import React, { useMemo } from 'react';
import { RadioGroup, Radio, Chip, Tooltip } from '@heroui/react';
import { LayoutType, EnabledServices } from '../hooks/useLocalStorage';

interface LayoutSelectorProps {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  enabledServices: EnabledServices;
}

export default function LayoutSelector({ layoutType, setLayoutType, enabledServices }: LayoutSelectorProps) {
  // 현재 선택된 서비스 개수 계산
  const selectedCount = useMemo(() => {
    return Object.values(enabledServices).filter(Boolean).length;
  }, [enabledServices]);

  // Grid 레이아웃은 최대 4개까지만 허용
  const isGridDisabled = selectedCount > 4;
  return (
    <div className="h-10 flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
      <Chip size="md" variant="flat" className="text-gray-500 bg-transparent">
        Layout
      </Chip>

      <RadioGroup
        orientation="horizontal"
        value={layoutType}
        onValueChange={(value) => setLayoutType(value as LayoutType)}
        size="sm"
        classNames={{
          base: 'p-0',
          wrapper: 'gap-3'
        }}
      >
        <Radio
          value="column"
          classNames={{
            base: 'inline-flex m-0 p-0 items-center',
            wrapper: 'w-4 h-4',
            label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
          }}
        >
          Column
        </Radio>
        <Radio
          value="row"
          classNames={{
            base: 'inline-flex m-0 p-0 items-center',
            wrapper: 'w-4 h-4',
            label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
          }}
        >
          Row
        </Radio>
        <Tooltip
          content="Grid layout supports up to 4 selections"
          isDisabled={!isGridDisabled}
          placement="top"
          showArrow
          delay={0}
          closeDelay={0}
          classNames={{
            content: 'bg-gray-800 text-white text-xs px-2 py-1 rounded'
          }}
        >
          <div>
            <Radio
              value="grid"
              isDisabled={isGridDisabled}
              classNames={{
                base: 'inline-flex m-0 p-0 items-center',
                wrapper: 'w-4 h-4',
                label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
              }}
            >
              Grid (2 x 2)
            </Radio>
          </div>
        </Tooltip>
      </RadioGroup>
    </div>
  );
}
