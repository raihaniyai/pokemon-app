'use client';

import { ReactNode, useState } from 'react';

type Items = {
  key: string | number;
  label: string;
  children: ReactNode,
}

type Props = {
  items: Items[],
  defaultActiveKey?: string | number;
  activeKey?: string | number;
}

const Tabs = ({ items, defaultActiveKey, activeKey }: Props) => {
  const [selectedTab, setSelectedTab] = useState(activeKey || defaultActiveKey || items[0].key);
  const handleTabClick = (key: string | number) => {
    setSelectedTab(key);
  };

  return (
    <div className="mx-8 space-y-8">
      <div className="flex space-x-4 justify-between border-b border-gray-200 font-bold">
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            className={`cursor-pointer pb-4 ${selectedTab === item.key
              ? 'border-b-2 border-black text-black -mb-[1.5px]'
              : 'text-gray-200'
              }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div>
        {items.map((item) =>
          item.key === selectedTab && item.children
        )}
      </div>
    </div>
  );
};

export default Tabs;
