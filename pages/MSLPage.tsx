import React from 'react';
import { NavLink, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { PageHeader } from './PageHeader';
import { DefinicaoMSLScreen } from './DefinicaoMSL';
import { DiagnosticoMSLScreen } from './DiagnosticoMSL';
import { ConformidadeMSLScreen } from './ConformidadeMSL';

const mslTabs = [
    { name: 'Definição', path: 'definicao' },
    { name: 'Diagnóstico', path: 'diagnostico' },
    { name: 'Conformidade', path: 'conformidade' },
];

const MSLTabNavigation: React.FC = () => {
    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                {mslTabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        className={({ isActive }) =>
                            `whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors ${
                                isActive
                                    ? 'border-accent text-accent'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

const MSLPageComponent: React.FC = () => {
    const location = useLocation();
    const currentTab = mslTabs.find(tab => location.pathname.includes(tab.path));
    const breadcrumbs = ['Desempenho Comercial', 'MSL', currentTab?.name ?? ''];

    return (
        <div>
            <PageHeader 
                title={currentTab?.name ?? 'MSL'} 
                breadcrumbs={breadcrumbs} 
                showFilters={currentTab?.path !== 'definicao'} 
            />
            <MSLTabNavigation />
            <div className="p-6">
                <Routes>
                    <Route index element={<Navigate to="definicao" replace />} />
                    <Route path="definicao" element={<DefinicaoMSLScreen />} />
                    <Route path="diagnostico" element={<DiagnosticoMSLScreen />} />
                    <Route path="conformidade" element={<ConformidadeMSLScreen />} />
                </Routes>
            </div>
        </div>
    );
};

export const MSLPage = React.memo(MSLPageComponent);