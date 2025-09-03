
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Navigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { findSecondaryMenu, SecondaryNavItem, SecondaryNavCategory } from '../../navigation';

const CollapsibleSecondaryNav: React.FC<{ menu: (SecondaryNavCategory | SecondaryNavItem)[], basePath: string }> = ({ menu, basePath }) => {
    const defaultOpenSections = menu
        .filter((item): item is SecondaryNavCategory => 'title' in item)
        .reduce((acc, section) => {
            acc[section.title] = true; // Default to open
            return acc;
        }, {} as Record<string, boolean>);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(defaultOpenSections);

    const toggleSection = (title: string) => {
        setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const renderNavItem = (item: SecondaryNavItem) => (
         <NavLink
            key={item.path}
            to={`${basePath}/${item.path}`}
            className={({ isActive }) =>
                `block py-1.5 px-2 text-sm rounded-md transition-colors duration-200 my-1 break-words ${
                    isActive 
                    ? 'bg-lime text-primary font-bold' 
                    : 'text-secondary hover:bg-gray-100'
                }`
            }
        >
            {item.label}
        </NavLink>
    );

    return (
        <aside className="w-[180px] flex-shrink-0 border-r border-[#D4D6DA] transition-all duration-300">
            <nav className="flex flex-col space-y-2 p-2">
                {menu.map((section, index) => {
                    if ('title' in section) { // It's a category
                        return (
                             <div key={section.title}>
                                <button 
                                    onClick={() => toggleSection(section.title)}
                                    className="flex items-start justify-between w-full px-2 py-2 text-left text-xs font-bold text-gray-500 uppercase hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <span className="flex-1 mr-2 break-words">- {section.title}</span>
                                    {openSections[section.title] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {openSections[section.title] && (
                                    <div className="pl-4 pt-1 pb-2">
                                        {section.items.map(renderNavItem)}
                                    </div>
                                )}
                            </div>
                        )
                    } else { // It's a flat item
                        return renderNavItem(section);
                    }
                })}
            </nav>
        </aside>
    );
};

export interface SecondaryMenuContextProps {
  toggleSecondaryMenu: () => void;
}

export const SecondaryMenuLayout: React.FC = () => {
    const location = useLocation();
    const basePath = '/' + location.pathname.split('/')[1];
    const menuData = findSecondaryMenu(basePath);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(true);

    const toggleSecondaryMenu = () => {
        setIsSecondaryMenuOpen(prev => !prev);
    };


    if (!menuData) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex flex-1">
            {isSecondaryMenuOpen && <CollapsibleSecondaryNav menu={menuData} basePath={basePath} />}
            <main className="flex-1 overflow-x-hidden">
                <Outlet context={{ toggleSecondaryMenu }} />
            </main>
        </div>
    );
};
