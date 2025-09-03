

import React, { useState } from 'react';
import { Menu, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { DateFilter, BreadcrumbDropdown, FilterDrawer } from '../components/ui';
import { navigationData, findInitialPagePath, SecondaryNavItem, SecondaryNavCategory } from '../navigation';

export const PageHeader: React.FC<{ title: string; breadcrumbs: string[]; showFilters?: boolean; onToggleSecondaryMenu?: () => void; }> = ({ title, breadcrumbs, showFilters = true, onToggleSecondaryMenu }) => {
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const visibleCrumbs = breadcrumbs.slice(1);
    const lastCrumbIndex = visibleCrumbs.length - 1;

    const getOptionsForCrumb = (index: number): { label: string; path: string }[] => {
        // Handle first breadcrumb: It should list all main navigation items.
        if (index === 0) {
            return navigationData.flatMap(category =>
                category.items
                    .filter(item => !item.disabled)
                    .map(item => ({
                        label: item.label,
                        path: findInitialPagePath(item.path) ?? item.path
                    }))
            );
        }

        // Find context from full breadcrumb path
        const mainCategory = navigationData.find(c => c.title.toUpperCase() === breadcrumbs[0].toUpperCase());
        if (!mainCategory) return [];

        const mainItem = mainCategory.items.find(i => i.label.toUpperCase() === breadcrumbs[1].toUpperCase());
        if (!mainItem || !mainItem.secondaryMenu) return [];

        // Handle second breadcrumb (index 1)
        if (index === 1) {
            // Siblings are the other items in the secondaryMenu of the mainItem.
            return mainItem.secondaryMenu.map(section => {
                if ('title' in section) { // It's a category
                    return { label: section.title, path: `${mainItem.path}/${section.items[0].path}` };
                } else { // It's a flat item
                    return { label: section.label, path: `${mainItem.path}/${section.path}` };
                }
            });
        }

        // Handle third breadcrumb (index 2)
        if (index === 2) {
            // Parent is the secondary category, which is breadcrumbs[2].
            const secondaryCategoryLabel = breadcrumbs[2];
            const secondaryCategory = mainItem.secondaryMenu.find(
                s => 'title' in s && s.title.toUpperCase() === secondaryCategoryLabel.toUpperCase()
            ) as SecondaryNavCategory | undefined;
            
            if (secondaryCategory) {
                return secondaryCategory.items.map(item => ({
                    label: item.label,
                    path: `${mainItem.path}/${item.path}`
                }));
            }
        }
        
        return [];
    };


    return (
        <>
            <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 bg-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                    <button
                        onClick={onToggleSecondaryMenu}
                        disabled={!onToggleSecondaryMenu}
                        className="p-1 rounded-full hover:bg-gray-200 mr-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                        aria-label="Alternar menu secundário"
                    >
                        <Menu className="h-3 w-3 text-secondary" />
                    </button>
                    <nav className="text-secondary tracking-wider text-[10px] flex items-center" aria-label="breadcrumb">
                        {visibleCrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="mx-1 text-gray-400">/</span>}
                                <BreadcrumbDropdown 
                                    label={crumb}
                                    options={getOptionsForCrumb(index)}
                                    isLast={index === lastCrumbIndex}
                                />
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                 {showFilters && (
                    <div className="flex items-center space-x-3">
                        <DateFilter />
                        <button 
                            onClick={() => setIsFilterDrawerOpen(true)}
                            className="p-1.5 bg-white text-secondary rounded-full hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm"
                            aria-label="Filtros"
                        >
                            <SlidersHorizontal className="h-4 w-4 text-secondary" />
                        </button>
                    </div>
                )}
            </div>
            <FilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} />
        </>
    );
};