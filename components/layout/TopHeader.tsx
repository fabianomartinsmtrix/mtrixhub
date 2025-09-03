import React from 'react';
import { Menu, Bell, HelpCircle, Settings } from 'lucide-react';
import { MtrixLogo } from './MtrixLogo';

export const TopHeader: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-4">
            <button onClick={onToggleSidebar} className="p-2 rounded-full hover:bg-gray-100" aria-label="Alternar menu lateral">
                <Menu className="h-6 w-6 text-secondary" />
            </button>
            <MtrixLogo />
        </div>
        <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Notificações">
                <Bell className="h-5 w-5 text-secondary" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Ajuda">
                <HelpCircle className="h-5 w-5 text-secondary" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Configurações">
                <Settings className="h-5 w-5 text-secondary" />
            </button>
            <div className="flex items-center space-x-3 pl-2 ml-2 border-l border-gray-200">
                <div className="text-right">
                    <p className="text-sm font-bold text-secondary">Fabiano Martins</p>
                    <p className="text-xs text-gray-500">NOME DA EMPRESA</p>
                </div>
                 <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center font-bold text-primary">
                    FM
                </div>
            </div>
        </div>
    </header>
);