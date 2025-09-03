
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHeader } from './PageHeader';
import type { SecondaryMenuContextProps } from '../components/layout/SecondaryMenuLayout';


export const PlaceholderScreen: React.FC<{ title: string; breadcrumbs?: string[] }> = ({ title, breadcrumbs = [] }) => {
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();

    return (
        <>
            {breadcrumbs.length > 0 && <PageHeader title={title} breadcrumbs={breadcrumbs} showFilters={false} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />}
            <div className="p-6">
                <div className="flex items-center justify-center h-96 bg-white border rounded-lg">
                    <h2 className="text-2xl text-gray-400">Página <span className="font-bold text-gray-500">{title}</span> em construção.</h2>
                </div>
            </div>
        </>
    );
}
