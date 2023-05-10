import React from "react";

export function Tabs({ tabs }: any) {
  const tabsFormatted = tabs.map(({ onClick, selected, tabName }: any) => {
    return (
      <a
        key={tabName}
        onClick={onClick}
        className={`tab tab-bordered${selected ? " tab-active" : ""}`}
      >
        {tabName}
      </a>
    );
  });

  return <div className="tabs justify-center py-2">{tabsFormatted}</div>;
}
