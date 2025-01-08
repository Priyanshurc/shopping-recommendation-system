import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const StickyTabsmenu = (
    {   tabs, 
        moreLabel = 'More', 
        overflowMenuWidth = '12rem', 
        slug,
        tabposition = 'sticky',
        tabpositionTop = 'top-[70px]',
        tabzIndex = 'z-30',
        tabBackgroundColor = 'bg-[#fff]',
        tabPadding = 'py-2 px-4'
    }
) => {
    const [overflowItems, setOverflowItems] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [showOverflowMenu, setShowOverflowMenu] = useState(false);
    const menuRef = useRef(null);
    const overflowMenuRef = useRef(null);

    useEffect(() => {
        handleOverflow();
        window.addEventListener('resize', handleOverflow);
        return () => window.removeEventListener('resize', handleOverflow);
    }, [tabs]);

    const handleOverflow = () => {
        const menu = menuRef.current;
        if (menu) {
            const items = Array.from(menu.children);
            const overflowedItems = [];

            items.forEach((item) => item.classList.remove('hidden'));

            for (let i = items.length - 1; i >= 0; i--) {
                if (menu.scrollWidth > menu.clientWidth) {
                    const tab = tabs[i];
                    overflowedItems.unshift(tab);
                    items[i].classList.add('hidden');
                }
            }
            setOverflowItems(overflowedItems);
        }
    };

    const toggleOverflowMenu = () => {
        setShowOverflowMenu(prevState => !prevState);
    };
    
     useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                overflowMenuRef.current &&
                !overflowMenuRef.current.contains(event.target) &&
                !menuRef.current.contains(event.target)
            ) {
                setShowOverflowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log("overflowItems", overflowItems);
    const handleScroll = (slug) => {
        setActiveTab(slug)
        setShowOverflowMenu(false);
        const section = document.getElementById(slug);
        if (section) {
          const offsetTop = section.offsetTop;
          const offset = 50; 
          window.scrollTo({
            top: offsetTop - offset,
            behavior: "smooth",
          });
        }
        setTimeout(handleOverflow, 0);
      };
    // const handleScroll = (slug) => {
    //     setActiveTab(slug);
    //     setShowOverflowMenu(false);
    
    //     const section = document.getElementById(slug);
    //     if (section) {
    //         const offsetTop = section.offsetTop;
    //         const offset = 50; 
    //         window.scrollTo({
    //             top: offsetTop - offset,
    //             behavior: "smooth",
    //         });
    //     }
    
    //     setTimeout(handleOverflow, 0);
    // };
    
    return (
        <div className={`menu-container ${tabposition} ${tabpositionTop}  ${tabzIndex} ${tabBackgroundColor} ${tabPadding}`}>
            <nav className="menu-items flex items-center justify-between relative">
                <ul ref={menuRef} className="flex gap-2 overflow-hidden whitespace-nowrap pr-[40px]">
                    {tabs?.map((tab, index) => (
                        (tab && 
                        <li key={index} onClick={()=>handleScroll(tab.slug)} 
                        className={`py-2 inline-block rounded px-4 text-sm hover:bg-black hover:text-white cursor-pointer ${
                            activeTab === tab.slug ? 'bg-black text-white' : ''
                        }`}
                        >
                            {tab.label}
                        </li>
                        )
                    ))}
                </ul>

                {overflowItems.length > 0 && (
                    <div className="relative" ref={overflowMenuRef}>
                        <a
                            onClick={toggleOverflowMenu}
                            className="py-2 inline-block rounded px-4 text-sm cursor-pointer"
                        >
                            {moreLabel}
                        </a>
                        {showOverflowMenu && (
                            <ul className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden" style={{ width: overflowMenuWidth }}>
                                {overflowItems.map((tab, index) => (
                                    (tab && <li  onClick={()=>handleScroll(tab.slug)}  key={index} 
                                    className={`py-2 inline-block  px-4 text-sm hover:bg-black hover:text-white cursor-pointer w-full ${
                                        activeTab === tab.slug ? 'bg-black text-white' : ''
                                    }`}
                                    >
                                        {tab.label}
                                    </li>)
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                
            </nav>
        </div>
    );
};

StickyTabsmenu.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        })
    ).isRequired,
    moreLabel: PropTypes.string,
    overflowMenuWidth: PropTypes.string,
    slug: PropTypes.string,
};

export default StickyTabsmenu;
