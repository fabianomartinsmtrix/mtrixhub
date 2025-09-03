
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, AlertCircle } from 'lucide-react';
import { navigationData, findInitialPagePath } from '../../navigation';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-[230px] h-full flex flex-col flex-shrink-0 bg-white text-secondary border-r border-gray-200">
        <div className="flex flex-col overflow-y-auto">
            <nav className="flex-1 p-3 space-y-1">
                {navigationData.map((group) => (
                <div key={group.title} className="mb-2">
                    <p className="px-3 pt-2 pb-1 text-xs font-bold text-gray-500 uppercase">{group.title}</p>
                    {group.items.map((item) => {
                       const targetPath = item.secondaryMenu ? findInitialPagePath(item.path) : item.path;
                       return(
                            <NavLink
                                key={item.path}
                                to={item.disabled ? '#' : targetPath ?? '#'}
                                onClick={(e) => item.disabled && e.preventDefault()}
                                className={({ isActive }) =>
                                `flex items-start justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-colors duration-200 ${
                                    isActive && !item.disabled
                                    ? 'bg-lime text-primary'
                                    : item.disabled
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-secondary hover:bg-gray-100'
                                }`
                                }
                            >
                                <div className="flex items-start flex-1 mr-2 min-w-0">
                                <item.icon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="break-words">{item.label}</span>
                                </div>
                                {item.notification && (
                                    <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                )}
                            </NavLink>
                        )
                    })}
                </div>
                ))}
            </nav>
             <div className="p-3 mt-auto">
                 <hr className="border-gray-200 my-3" />
                 <NavLink
                    to="/compartilhado-comigo"
                    className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-sm font-bold rounded-md transition-colors duration-200 ${
                        isActive
                        ? 'bg-lime text-primary'
                        : 'text-secondary hover:bg-gray-100'
                    }`
                    }
                >
                    <Users className="w-5 h-5 mr-3" />
                    <span>Compartilhado comigo</span>
                </NavLink>
                <div className="p-3 mt-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Notícias, eventos e insights que movem o mercado. Saiba mais.</p>
                    <button className="mt-3 w-full px-4 py-2 bg-gray-300 text-secondary rounded-md text-sm font-bold hover:bg-gray-400">Mtrix Connect ⇲</button>
                    <p className="text-xs text-gray-400 mt-2">Sessão: 19m 08s</p>
                </div>
            </div>
        </div>
    </aside>
  );
};