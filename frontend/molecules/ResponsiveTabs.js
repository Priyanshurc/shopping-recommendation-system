import { ArrowRight, ChevronDown } from "../../assets/Icons";
import { useState, useRef, useEffect } from "react";

const ACTION_BTNS_GAP = 16;
const MORE_BTN_RESERVED_WIDTH = 28;

export default function ResponsiveTabs({
  items,
  isFilterTabs,
  defaultActive,
  onChange,
}) {
  const containerRef = useRef(null);

  const ACTIONS_LIST = items.map((item, index) => {
    return {
      value: index,
      name: item.label,
    };
  });

  const containerVisibleWidth = useRef(0);
  const actionElementsWidth = useRef([]);
  const moreBtnLeftPosition = useRef(0);

  const [actionsMoreList, setActionsMoreList] = useState([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const calculateVisibility = (actionElements) => {
    let visibleElementsWidth = 0;
    const actionsMoreData = [];
    let isVisible = true;

    [...actionElements].forEach((actionEl, i) => {
      const gapWidth = i === actionElements.length - 1 ? 0 : ACTION_BTNS_GAP;
      visibleElementsWidth += actionElementsWidth.current[i] + gapWidth;
      const visibleSpaceWidth =
        i !== actionElements.length - 1
          ? visibleElementsWidth + MORE_BTN_RESERVED_WIDTH
          : visibleElementsWidth;

      if (visibleSpaceWidth <= containerVisibleWidth.current && isVisible) {
        actionEl.className = "respTab-action respTab-visible";
      } else {
        if (isVisible) {
          moreBtnLeftPosition.current =
            actionElementsWidth.current
              .slice(0, i)
              .reduce((acc, item) => item + acc, 0) +
            ACTION_BTNS_GAP * i;

          isVisible = false;
        }
        actionEl.className = "respTab-action respTab-hidden";

        actionsMoreData.push(ACTIONS_LIST[i]);
      }
    });
    setActionsMoreList([...actionsMoreData]);
  };
  useEffect(() => {
    const actionElements = containerRef.current?.children || [];
    const actionsListWidth = [];
    [...actionElements].forEach((actionEl) => {
      actionsListWidth.push(actionEl.offsetWidth);
    });

    actionElementsWidth.current = [...actionsListWidth];

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = entry.contentBoxSize[0];

          containerVisibleWidth.current = Math.ceil(contentBoxSize.inlineSize);

          calculateVisibility(actionElements);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
  }, []);

  const [activeTab, setActiveTab] = useState(defaultActive || 0);
  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange(items[index]);
    if (isMoreOpen) {
      setIsMoreOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative font-inter">
        <div
          className="flex-shrink-1 flex items-center overflow-hidden"
          style={{ gap: ACTION_BTNS_GAP }}
          ref={containerRef}
        >
          {ACTIONS_LIST.map((action) => (
            <div
              className={`respTab-action`}
              style={{
                background: activeTab == action.value ? "#EFEFEF" : "",
                color: activeTab == action.value ? "#1A1D1F" : "",
              }}
              onClick={() => handleTabClick(action.value)}
            >
              {action.name}
            </div>
          ))}
        </div>

        <div
          className={`absolute top-0 px-[10px] py-[10px] box-border rounded-lg cursor-pointer
          ${actionsMoreList.length ? "respTab-visible" : "respTab-hidden"}`}
          style={{ left: moreBtnLeftPosition.current }}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          <span
            className={`transition inline-block ${
              isMoreOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>
      </div>
      <div
        className={`bg-neutral-0 rounded-lg absolute top-[50px] flex flex-col items-start gap-[10px] py-[8px] -translate-x-[50%] dropdownMenuSelect ${
          isMoreOpen ? "respTab-visible" : "respTab-hidden"
        }`}
        style={{ left: moreBtnLeftPosition.current }}
      >
        {actionsMoreList.map((action) => (
          <div
            className={`py-[8px] whitespace-nowrap px-[16px]  font-[500] font-inter react-select-option ${
              activeTab === action.value
                ? "text-primary-5"
                : "text-neutral-shades-2"
            }`}
            key={action.value}
            onClick={() => handleTabClick(action.value)}
          >
            {action.name}
          </div>
        ))}
      </div>
      {!isFilterTabs && (
        <div className="tab-content p-4 mt-4 border border-neutral-3 rounded-lg">
          {items[activeTab] && items[activeTab].content}
        </div>
      )}
    </div>
  );
}
const ACTIONS_LIST = [
  {
    value: 1,
    name: "Oneewh",
  },
  {
    value: 2,
    name: "Two",
  },
  {
    value: 3,
    name: "Three",
  },
  {
    value: 4,
    name: "Four",
  },
  {
    value: 5,
    name: "Five",
  },
  {
    value: 6,
    name: "Six",
  },
  {
    value: 7,
    name: "Sevenirh ",
  },
  {
    value: 8,
    name: "Eightuierhg",
  },
  {
    value: 9,
    name: "Nineiowh ",
  },
  {
    value: 10,
    name: "Ten",
  },
];
