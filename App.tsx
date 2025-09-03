
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

import { navigationData, findInitialPagePath } from './navigation';
import { TopHeader } from './components/layout/TopHeader';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SecondaryMenuLayout } from './components/layout/SecondaryMenuLayout';
import { PlaceholderScreen } from './pages/Placeholder';
import { MSLPage } from './pages/MSLPage';
import { VisaoTaticaPage } from './pages/behavior/VisaoTaticaPage';
import { RaioXPDVPage } from './pages/behavior/RaioXPDVPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const generateRoutes = () => {
    return navigationData.flatMap(category => 
        category.items.map(item => {
            if (item.secondaryMenu) {
                return (
                    <Route key={item.path} path={`${item.path}/*`} element={<SecondaryMenuLayout />}>
                        <Route index element={<Navigate to={findInitialPagePath(item.path) ?? ''} replace />} />
                        {item.secondaryMenu.flatMap(subItem => {
                             if ('title' in subItem) { // Category
                                return subItem.items.map(navItem => {
                                    // FIX: Removed logic that forced PlaceholderScreen for 'Comportamento' routes.
                                    const Component = navItem.component;
                                    return (
                                        <Route 
                                            key={navItem.path} 
                                            path={navItem.path} 
                                            element={<Component title={navItem.label} breadcrumbs={[category.title, item.label, subItem.title, navItem.label]} />} 
                                        />
                                    );
                                });
                             } else { // Flat item
                                return <Route key={subItem.path} path={subItem.path} element={<subItem.component title={subItem.label} breadcrumbs={[category.title, item.label, subItem.label]} />} />;
                             }
                        })}
                    </Route>
                );
            }
            if (item.isLayout && item.component) {
                 return <Route key={item.path} path={`${item.path}/*`} element={<item.component />} />;
            }
            if (item.component) {
                 return <Route key={item.path} path={item.path} element={<item.component title={item.label} breadcrumbs={[category.title, item.label]} />} />;
            }
            return null;
        })
    );
  };

  return (
    <HashRouter>
      <div className="flex flex-col h-screen bg-white text-gray-800 font-sans">
        <TopHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1 overflow-hidden">
          <div className={`flex-shrink-0 transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-[230px]' : 'w-0'}`}>
            <Sidebar />
          </div>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
                <Route path="/" element={<Navigate to={findInitialPagePath('/') ?? '/'} replace />} />
                {generateRoutes()}
                <Route 
                  path="/sell-through/comportamento/visao-tatica" 
                  element={<VisaoTaticaPage title="Visão Tática de Comportamento" breadcrumbs={['Desempenho Comercial', 'Sell-through', 'Comportamento', 'Visão Tática']} />} 
                />
                <Route 
                  path="/sell-through/comportamento/raio-x-pdv" 
                  element={<RaioXPDVPage title="Raio-X do PDV" breadcrumbs={['Desempenho Comercial', 'Sell-through', 'Comportamento', 'Raio-X PDV']} />} 
                />
                 <Route path="*" element={<PlaceholderScreen title="Página não encontrada" />} />
            </Routes>
             <Footer />
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;