

import React, { useState, useRef, useEffect } from 'react';
import { Info, ArrowUp, ArrowDown, MoreHorizontal, X, ChevronsUpDown, ChevronDown, SlidersHorizontal, Search, Check, CheckCircle, ChevronUp, Download, Undo, Redo, Trash2, GripVertical, MoreVertical, Table, BarChart2, FileDown, ImageIcon, Expand, ShoppingCart, XSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { BigNumber } from '../types';
import { formatNumberBR } from '../services/mockData';


interface CardActionsProps {
    showViewToggle?: boolean;
    currentView?: 'chart' | 'table';
    onToggleView?: () => void;
    onSaveImage?: () => void;
    onSaveSheet?: () => void;
    onExpand?: () => void; // Injected by Card
}

export const CardActions: React.FC<CardActionsProps> = ({ showViewToggle = false, currentView = 'chart', onToggleView, onSaveImage, onSaveSheet, onExpand }) => {
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const saveRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (saveRef.current && !saveRef.current.contains(event.target as Node)) {
                setIsSaveOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center space-x-1">
            {showViewToggle && (
                <Tooltip text={currentView === 'chart' ? "Ver Tabela" : "Ver Gráfico"}>
                    <button onClick={onToggleView} className="p-2 rounded-full hover:bg-gray-200" aria-label="Alternar visualização">
                        {currentView === 'chart' ? <Table className="h-4 w-4 text-gray-600" /> : <BarChart2 className="h-4 w-4 text-gray-600" />}
                    </button>
                </Tooltip>
            )}
            <div className="relative" ref={saveRef}>
                 <Tooltip text="Salvar / Baixar">
                    <button onClick={() => setIsSaveOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200" aria-label="Salvar">
                        <Download className="h-4 w-4 text-gray-600" />
                    </button>
                 </Tooltip>
                {isSaveOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-10 p-1">
                        <ul>
                            <li><button onClick={onSaveImage} className="w-full text-left flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"><ImageIcon className="h-4 w-4 mr-2" /> Salvar Imagem</button></li>
                            <li><button onClick={onSaveSheet} className="w-full text-left flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"><FileDown className="h-4 w-4 mr-2" /> Baixar Planilha</button></li>
                        </ul>
                    </div>
                )}
            </div>
            {onExpand && (
                 <Tooltip text="Expandir">
                    <button onClick={onExpand} className="p-2 rounded-full hover:bg-gray-200" aria-label="Expandir">
                        <Expand className="h-4 w-4 text-gray-600" />
                    </button>
                </Tooltip>
            )}
        </div>
    );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  tooltipText?: string;
  actions?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, tooltipText, actions, footerContent }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const cardContent = (
      <>
        {title && (
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center min-w-0">
                    <h3 className="font-bold text-lg text-secondary truncate mr-2">{title}</h3>
                    {tooltipText && (
                        <Tooltip text={tooltipText}>
                        <Info className="h-4 w-4 text-gray-500 cursor-pointer ml-2 flex-shrink-0" />
                        </Tooltip>
                    )}
                </div>
                {React.isValidElement(actions) && React.cloneElement(actions as React.ReactElement<any>, { onExpand: () => setIsExpanded(true) })}
            </div>
        )}
        <div className={`flex-1 ${title ? 'px-4 pb-4' : 'p-4'} min-h-0`}>
            {children}
        </div>
        {footerContent && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-center">
                {footerContent}
            </div>
        )}
      </>
    );

  return (
    <>
        <div className={`bg-white border border-gray-200 rounded-lg shadow-none flex flex-col ${className}`}>
            {cardContent}
        </div>
        <Modal isOpen={isExpanded} onClose={() => setIsExpanded(false)} title={title || ''}>
            <div className="h-[75vh]">
                {children}
            </div>
        </Modal>
    </>
  );
};


export const BigNumberCard: React.FC<BigNumber> = ({ title, value, tooltip }) => {
  return (
    <Card className="flex-1">
        <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-normal text-gray-600">{title}</h4>
            <Tooltip text={tooltip}>
                <button aria-label="Mais informações">
                    <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
                </button>
            </Tooltip>
        </div>
        <p className="text-4xl font-bold text-primary">{value}</p>
    </Card>
  );
};

interface IndicatorCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    comparisonText: string;
    wide?: boolean;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, change, changeType, comparisonText, wide = false }) => {
    const changeColor = changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-600';
    const ChangeIcon = changeType === 'positive' ? ArrowUp : ArrowDown;

    if (wide) {
        return (
            <Card>
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-600">{title}</h4>
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-3xl font-black text-primary">{value}</p>
                <div className="flex items-center text-xs mt-1">
                    <div className={`flex items-center font-bold ${changeColor}`}>
                        {changeType !== 'neutral' && <ChangeIcon className="h-3 w-3 mr-1" />}
                        <span>{change}</span>
                    </div>
                    <span className="text-gray-500 ml-1">{comparisonText}</span>
                </div>
            </Card>
        );
    }
    
    return (
         <Card>
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xl font-black text-primary my-1">{value}</p>
             <div className="flex items-center text-xs">
                 <div className={`flex items-center font-bold ${changeColor}`}>
                    {changeType !== 'neutral' && <ChangeIcon className="h-3 w-3 mr-1" />}
                    <span>{change}</span>
                 </div>
                 <span className="text-gray-500 ml-1">{comparisonText}</span>
            </div>
         </Card>
    );
};

interface IndicatorSelectorCardProps {
    initialIndicatorKey: string;
    allIndicatorsData: { [key: string]: { title: string; value: string; change?: string; changeType?: 'positive' | 'negative' | 'neutral'; tooltip: string; } };
    indicatorOptions: string[];
}

export const IndicatorSelectorCard: React.FC<IndicatorSelectorCardProps> = ({ initialIndicatorKey, allIndicatorsData, indicatorOptions }) => {
    const [selectedKey, setSelectedKey] = useState(initialIndicatorKey);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const indicator = allIndicatorsData[selectedKey];
    const { title, value, change, changeType, tooltip } = indicator;

    const changeColor = changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-600';
    const ChangeIcon = changeType === 'positive' ? ArrowUp : ArrowDown;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleSelect = (key: string) => {
        setSelectedKey(key);
        setIsDropdownOpen(false);
        setSearchTerm('');
    };
    
    const filteredOptions = indicatorOptions.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Card>
            <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-bold text-gray-600 flex-1 mr-2">{title}</h4>
                <div className="relative" ref={dropdownRef}>
                    <Tooltip text={tooltip}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className="p-1 rounded-full hover:bg-gray-100">
                             <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                    </Tooltip>
                    {isDropdownOpen && (
                         <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-2">
                             <div className="relative mb-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar indicador..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-100 border-none rounded-md pl-9 p-2 text-sm focus:ring-1 focus:ring-accent"
                                    autoFocus
                                />
                            </div>
                            <ul className="max-h-60 overflow-y-auto">
                                {filteredOptions.map(key => (
                                    <li key={key}>
                                        <button 
                                            onClick={() => handleSelect(key)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-md ${selectedKey === key ? 'bg-lime text-primary font-bold' : 'hover:bg-gray-100'}`}
                                        >
                                            {key}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-2xl font-black text-primary">{value}</p>
            {change && changeType && (
                <div className="flex items-center text-xs mt-1">
                    <div className={`flex items-center font-bold ${changeColor}`}>
                        {changeType !== 'neutral' && <ChangeIcon className="h-3 w-3 mr-1" />}
                        <span>{change}</span>
                    </div>
                </div>
            )}
        </Card>
    );
};


interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-bold transition-colors duration-200 ${
            isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-primary'
        }`}
    >
        {label}
    </button>
);


// Fix: Update DataTableProps to accept React.ReactNode for cell content,
// allowing components like <Link> to be rendered within table cells.
interface DataTableProps {
    columns: readonly string[];
    data: readonly (readonly React.ReactNode[])[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} scope="col" className="px-6 py-3 font-bold">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                            {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


interface ActionCardProps {
    title: string;
    subtitle: string;
    buttonText: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, subtitle, buttonText }) => (
    <Card className="items-center text-center">
        <h4 className="font-bold text-lg text-secondary">{title}</h4>
        <p className="text-2xl font-black text-primary my-2">{subtitle}</p>
        <button className="mt-2 w-full max-w-xs mx-auto px-4 py-2 bg-gray-200 text-secondary rounded-md text-sm font-bold hover:bg-gray-300">
            {buttonText}
        </button>
    </Card>
);

interface DataCardProps {
    icon: React.ElementType;
    cluster: string;
    pdvs: number;
    variacao: number;
    rfv: string;
    representatividade: number;
    isActive?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({ icon: Icon, cluster, pdvs, variacao, rfv, representatividade, isActive = false }) => {
    const varColor = variacao >= 0 ? 'text-green-600' : 'text-red-600';
    const VarIcon = variacao >= 0 ? ArrowUp : ArrowDown;
    const activeStateClasses = isActive ? 'border-accent shadow-lg' : 'hover:shadow-md hover:border-gray-300';

    return (
        <Card className={`transition-all duration-200 cursor-pointer h-full ${activeStateClasses}`}>
            <div className="flex flex-col h-full">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-gray-500" />
                            <h4 className="font-bold text-secondary text-sm border-b-2 border-dotted border-gray-300 pb-0.5">{cluster}</h4>
                        </div>
                        <button className="p-1 -mr-1 -mt-1 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                    <div className="flex items-baseline space-x-2 my-2">
                        <p className="text-4xl font-black text-primary">{formatNumberBR(pdvs)}</p>
                        <div className={`flex items-center font-bold ${varColor}`}>
                            <div className={`flex items-center justify-center h-5 w-5 rounded-full ${variacao >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                <VarIcon className="h-3 w-3" />
                            </div>
                            <span className="ml-1 text-sm">{Math.abs(variacao)}%</span>
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <div className="text-left">
                            <p>RFV</p>
                            <p className="text-secondary font-bold">{rfv}</p>
                        </div>
                        <div className="text-left">
                            <p>Representatividade</p>
                            <p className="text-secondary font-bold">{representatividade}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

interface CompactDataCardProps {
    icon: React.ElementType;
    title: string;
    value: number;
    change: number;
    representatividade: string;
    className?: string;
}

export const CompactDataCard: React.FC<CompactDataCardProps> = ({ icon: Icon, title, value, change, representatividade, className = '' }) => {
    const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
    const ChangeIcon = change >= 0 ? ArrowUp : ArrowDown;
    const changeBgColor = change >= 0 ? 'bg-green-100' : 'bg-red-100';

    return (
        <Card className={className}>
            <div className="flex justify-between items-start mb-2">
                <Icon className="h-5 w-5 text-gray-500" />
                <button className="p-1 -mr-1 -mt-1 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
            </div>
            <h4 className="font-bold text-secondary text-sm border-b-2 border-dotted border-gray-300 pb-0.5 inline-block mb-2">{title}</h4>
            <div className="flex items-baseline space-x-2 my-2">
                <p className="text-4xl font-black text-primary">{formatNumberBR(value)}</p>
                <div className={`flex items-center font-bold ${changeColor}`}>
                    <div className={`flex items-center justify-center h-5 w-5 rounded-full ${changeBgColor}`}>
                        <ChangeIcon className="h-3 w-3" />
                    </div>
                    <span className="ml-1 text-sm">{Math.abs(change)}%</span>
                </div>
            </div>
            <div className="mt-auto">
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <p>Representatividade</p>
                    <p className="text-secondary font-bold">{representatividade}</p>
                </div>
            </div>
        </Card>
    );
};

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 text-xs text-white bg-secondary rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-none">
        {text}
      </div>
    </div>
  );
};

export const TextInput: React.FC<{ label: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input 
            type="text" 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent outline-none shadow-none" 
        />
    </div>
);

interface CustomSelectProps {
    label: string;
    children: React.ReactNode;
    multiple?: boolean;
    value?: string | string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, children, multiple, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <select multiple={multiple} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent outline-none shadow-none" value={value} onChange={onChange}>
            {children}
        </select>
    </div>
);

// Fix: Add SimpleSelect component used in FidelizacaoPage.
interface SimpleSelectProps {
    options: string[];
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({ options, label, value, onChange }) => (
    <div className="flex items-center">
        {label && <label className="text-sm font-medium text-gray-600 mr-2">{label}</label>}
        <select 
            className="bg-gray-50 border border-gray-300 rounded-lg py-1 px-2 text-sm text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent outline-none shadow-none"
            value={value}
            onChange={onChange}
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

interface CustomDateRangeProps {
    label: string;
}

export const CustomDateRange: React.FC<CustomDateRangeProps> = ({ label }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="flex items-center space-x-2">
            <input type="date" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent outline-none shadow-none" />
            <span className="text-gray-500">-</span>
            <input type="date" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent outline-none shadow-none" />
        </div>
    </div>
);

interface CustomCheckboxGroupProps {
    label: string;
    options: string[];
}

export const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
        <div className="space-y-2">
            {options.map((option, index) => (
                <div key={index} className="flex items-center">
                    <input id={`checkbox-${index}`} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/50 shadow-none" />
                    <label htmlFor={`checkbox-${index}`} className="ml-2 block text-sm text-gray-800">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    </div>
);

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-secondary">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const BreadcrumbDropdown: React.FC<{
    label: string;
    options: { label: string; path: string }[];
    isLast: boolean;
}> = ({ label, options, isLast }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!options || options.length <= 1) {
        return (
            <span className={isLast ? 'font-bold' : 'font-normal'}>
                {label.toUpperCase()}
            </span>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-1 rounded-md px-2 py-1 transition-colors hover:bg-gray-200 ${isLast ? 'font-bold' : 'font-normal'} ${isOpen ? 'bg-gray-200' : ''}`}
                 aria-haspopup="true"
                 aria-expanded={isOpen}
            >
                <span>{label.toUpperCase()}</span>
                <ChevronsUpDown className="h-3 w-3 text-gray-600" />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1.5 w-max min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <ul className="py-1" role="menu">
                        {options.map(option => (
                            <li key={option.path} role="none">
                                <NavLink
                                    to={option.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block w-full text-left px-4 py-2 text-sm transition-colors ${
                                            isActive ? 'bg-gray-100 text-secondary font-bold' : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                    role="menuitem"
                                >
                                    {option.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const periodTypes = [
  { label: 'Ano Calendário', range: 'De 01/01 a 31/12' },
  { label: 'Ano Fiscal', range: 'De 01/04 a 31/03' },
];

const rangePresets = [
  { id: 'YTD', label: 'YTD', date: '01/01/2025 a 02/09/2025', description: 'Desde o início do ano até a data atual' },
  { id: 'L6M', label: 'L6M', date: '01/03/2025 a 31/08/2025', description: 'Últimos seis meses completos' },
  { id: 'L3M', label: 'L3M', date: '01/06/2025 a 31/08/2025', description: 'Últimos três meses completos' },
  { id: 'MAT', label: 'MAT', date: '01/09/2024 a 31/08/2025', description: 'Últimos 12 meses completos' },
  { id: 'MTD', label: 'MTD', date: '01/09/2025 a 02/09/2025', description: 'Desde o início do mês até a data atual' },
  { id: 'LM', label: 'LM', date: '01/08/2025 a 31/08/2025', description: 'Último mês completo' },
  { id: 'DIY', label: 'Personalizado', date: 'Personalizado', description: 'Selecione outros períodos', isCustom: true },
];

interface DateRangeOption {
    id: string;
    label: string;
    date: string;
    description: string;
    isCustom?: boolean;
}

const Drawer: React.FC<{ isOpen: boolean; onClose: () => void; onApply: () => void; children: React.ReactNode; title: string }> = ({ isOpen, onClose, onApply, children, title }) => {
    return (
        <div className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'pointer-events-none'}`} onClick={onClose}>
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-2xl w-96 transform transition-transform duration-300 z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-bold text-lg text-secondary">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
                <div className="p-4 border-t bg-white">
                    <button onClick={onApply} className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity">
                        <CheckCircle className="h-5 w-5" />
                        <span>Aplicar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const FilterSection: React.FC<{ 
    title: string; 
    items: string[]; 
    selectedItems: string[];
    onItemSelect: (item: string) => void;
    initiallyOpen?: boolean 
}> = ({ title, items, selectedItems, onItemSelect, initiallyOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="border rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 font-bold text-sm text-secondary">
                {title}
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {isOpen && (
                <div className="p-3 border-t">
                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 border-none rounded-md pl-9 p-2 text-sm focus:ring-1 focus:ring-accent"
                        />
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                        <ul className="text-sm space-y-1 pr-1">
                            {filteredItems.map(item => {
                                const isSelected = selectedItems.includes(item);
                                return (
                                    <li key={item}>
                                        <button
                                            onClick={() => onItemSelect(item)}
                                            className={`w-full text-left p-2 rounded-md flex justify-between items-center ${isSelected ? 'bg-lime text-primary font-bold' : 'hover:bg-gray-100'}`}
                                        >
                                            {item}
                                            {isSelected && <Check className="h-4 w-4 text-accent" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomPeriodDrawer: React.FC<{ isOpen: boolean; onClose: () => void; onApply: () => void; }> = ({ isOpen, onClose, onApply }) => {
    const [selections, setSelections] = useState<Record<string, string[]>>({});

    const handleSelect = (sectionTitle: string, item: string) => {
        setSelections(prev => {
            const currentSelection = prev[sectionTitle] || [];
            const newSelection = currentSelection.includes(item)
                ? currentSelection.filter(i => i !== item)
                : [...currentSelection, item];
            return { ...prev, [sectionTitle]: newSelection };
        });
    };
    
    const sections = [
        { title: 'ANO', items: ['2025', '2024', '2023'], initiallyOpen: true },
        { title: 'MÊS/ANO', items: ['09/2025', '08/2025', '07/2025', '06/2025', '05/2025', '04/2025'], initiallyOpen: true },
        { title: 'DATA', items: ['02/09/2025', '01/09/2025', '31/08/2025', '30/08/2025', '29/08/2025', '28/08/2025'], initiallyOpen: true },
        { title: 'DIA DA SEMANA', items: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'] },
        { title: 'DIA', items: Array.from({ length: 31 }, (_, i) => String(i + 1)) }
    ];

    return (
        <Drawer isOpen={isOpen} onClose={onClose} onApply={onApply} title="Período Personalizado">
            <div className="space-y-4">
                {sections.map(section => (
                    <FilterSection 
                        key={section.title}
                        title={section.title} 
                        items={section.items} 
                        initiallyOpen={section.initiallyOpen}
                        selectedItems={selections[section.title] || []}
                        onItemSelect={(item) => handleSelect(section.title, item)}
                    />
                ))}
            </div>
        </Drawer>
    );
};

export const DateFilter: React.FC = () => {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isRangeOpen, setIsRangeOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const [selectedType, setSelectedType] = useState(periodTypes[1]); // 'Ano Fiscal'
    const [selectedRange, setSelectedRange] = useState<DateRangeOption>(rangePresets[0]); // 'YTD'

    const typeRef = useRef<HTMLDivElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
            setIsTypeOpen(false);
        }
        if (rangeRef.current && !rangeRef.current.contains(event.target as Node)) {
            setIsRangeOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleTypeSelect = (type: typeof periodTypes[0]) => {
        setSelectedType(type);
        setIsTypeOpen(false);
    };
    
    const handleRangeSelect = (range: DateRangeOption) => {
        if (range.isCustom) {
            setIsDrawerOpen(true);
        } else {
            setSelectedRange(range);
        }
        setIsRangeOpen(false);
    };

    const handleDrawerApply = () => {
        setSelectedRange({
            id: 'DIY', // Match the ID of the 'Personalizado' option
            label: 'Personalizado',
            date: 'Personalizado',
            description: 'Período customizado selecionado.',
            isCustom: true,
        });
        setIsDrawerOpen(false);
    };

    return (
        <div className="flex items-center space-x-1">
            <div className="relative" ref={typeRef}>
                <button 
                    onClick={() => { setIsTypeOpen(!isTypeOpen); setIsRangeOpen(false); }}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white text-secondary rounded-full font-semibold text-xs hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm"
                >
                    <span>{selectedType.label.toUpperCase()}</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isTypeOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                        <ul className="p-2">
                            {periodTypes.map(type => (
                                <li key={type.label}>
                                    <button 
                                        onClick={() => handleTypeSelect(type)}
                                        className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${selectedType.label === type.label ? 'bg-lime' : 'hover:bg-gray-100'}`}
                                    >
                                        <div>
                                            <p className="font-bold text-sm text-secondary">{type.label}</p>
                                            <p className="text-xs text-gray-500">{type.range}</p>
                                        </div>
                                        {selectedType.label === type.label && <Check className="h-4 w-4 text-accent" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <div className="relative" ref={rangeRef}>
                 <button 
                    onClick={() => { setIsRangeOpen(!isRangeOpen); setIsTypeOpen(false); }}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white text-secondary rounded-full font-semibold text-xs hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm"
                >
                    <span>{selectedRange.date}</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isRangeOpen && (
                     <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                         <ul className="p-2 space-y-1">
                             {rangePresets.map(range => (
                                 <li key={range.id}>
                                     <button 
                                        onClick={() => handleRangeSelect(range)}
                                        className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${selectedRange.id === range.id ? 'bg-lime' : 'hover:bg-gray-100'}`}
                                     >
                                         <div className="flex items-center">
                                             <div className={`w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-xs mr-3 ${range.isCustom ? 'bg-secondary text-white' : 'bg-gray-200 text-secondary'}`}>
                                                 {range.label}
                                             </div>
                                             <div>
                                                 <p className="font-bold text-sm text-secondary">{range.isCustom ? range.label : range.date}</p>
                                                 <p className="text-xs text-gray-500">{range.description}</p>
                                             </div>
                                         </div>
                                         {range.isCustom && <SlidersHorizontal className="h-4 w-4 text-gray-500" />}
                                         {selectedRange.id === range.id && <Check className="h-4 w-4 text-accent" />}
                                     </button>
                                 </li>
                             ))}
                         </ul>
                     </div>
                )}
            </div>
            <CustomPeriodDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onApply={handleDrawerApply} />
        </div>
    );
};

const FilterAccordionItem: React.FC<{ label: string; items: string[] }> = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-3 text-left">
                <div className="flex items-center">
                    <GripVertical className="h-5 w-5 text-gray-400 mr-3 cursor-grab flex-shrink-0" />
                    <div>
                        <p className="font-bold text-sm text-secondary">{label}</p>
                        <p className="text-xs text-gray-500">0 de {items.length}</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />}
            </button>
            {isOpen && (
                <div className="p-3 border-t">
                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 border-none rounded-md pl-9 p-2 text-sm focus:ring-1 focus:ring-accent"
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        <ul className="text-sm text-gray-700 space-y-1">
                            {filteredItems.map(item => (
                                <li key={item} className="p-2 rounded-md hover:bg-gray-100 flex items-center">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/50 mr-3" id={`filter-${label}-${item}`}/>
                                    <label htmlFor={`filter-${label}-${item}`} className="flex-1 cursor-pointer">{item}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const FilterAccordionSection: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-2">
                <p className="font-bold text-sm text-secondary flex items-center">
                   {isOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                   {title}
                </p>
            </button>
            {isOpen && <div className="space-y-2 pl-2">{children}</div>}
        </div>
    );
};

export const FilterDrawer: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('TODOS');

    const filterData = {
        'Distribuidor': [
            { title: 'GRUPO DE DISTRIBUIÇÃO', items: ['ATACADISTAS NACIONAIS', 'DISTRIBUIDORES REGIONAIS', 'VAREJO DIRETO'] },
            { title: 'AGENTE DE DISTRIBUIÇÃO', items: ['Distribuidora Horizonte', 'Logisul Atacadista', 'Central Bebidas', 'Rede Rápida Log', 'NorteSul Distribuição'] },
        ],
        'Produto': [
            { title: 'MARCA', items: ['Sabor Tropical', 'Frescor Citrus', 'Pura Leveza', 'GuaraPower', 'BioNectar'] },
            { title: 'PRODUTO', items: ['Sabor Tropical Uva 1L', 'Frescor Citrus Limão 350ml', 'Pura Leveza com Gás 500ml', 'GuaraPower Zero Açúcar 2L'] },
            { title: 'CATEGORIA', items: ['SUCOS', 'REFRIGERANTES', 'ÁGUAS', 'ISOTÔNICOS', 'CHÁS'] },
            { title: 'SUBCATEGORIA', items: ['UVA', 'CÍTRICOS', 'COM GÁS', 'GUARANÁ', 'ORGÂNICOS'] },
            { title: 'SKU', items: ['78901', '78902', '78903', '78904', '78905'] },
        ],
        'Geografia': [
            { title: 'UF', items: ['SP', 'RJ', 'MG', 'BA', 'RS', 'PR', 'SC'] },
            { title: 'CIDADE', items: ['SÃO PAULO', 'RIO DE JANEIRO', 'BELO HORIZONTE', 'SALVADOR', 'PORTO ALEGRE'] },
            { title: 'BAIRRO', items: ['Centro', 'Zona Sul', 'Zona Norte', 'Leste', 'Oeste'] },
        ],
        'Força de Vendas': [
            { title: 'REGIONAL', items: ['SUDESTE', 'NORDESTE', 'SUL', 'CENTRO-OESTE', 'NORTE'] },
            { title: 'GERENTE', items: ['Ricardo Almeida', 'Sofia Costa', 'Bruno Ferreira'] },
            { title: 'SUPERVISOR', items: ['Lucas Mendes', 'Camila Rocha', 'Gustavo Dias'] },
        ],
        'PDV': [
            { title: 'SEGMENTO PDV', items: ['HIPERMERCADO', 'SUPERMERCADO', 'ATACAREJO', 'BAR', 'RESTAURANTE'] },
            { title: 'SEGMENTO MTRIX', items: ['MERCADOS > 10 CHK', 'MERCADOS 5 A 9 CHK', 'MERCADOS 1 A 4 CHK', 'OUTROS VAREJOS'] },
            { title: 'CNPJ PDV', items: ['01.234.567/0001-88', '12.345.678/0001-99'] },
            { title: 'RAZÃO SOCIAL', items: ['Mercado Bom Preço Ltda.', 'Super Varejão Central', 'Atacado Forte S.A.', 'Cantina do Sabor'] },
            { title: 'CEP', items: ['01000-000', '20000-000', '30000-000'] },
            { title: 'ENDEREÇO', items: ['AV. PRINCIPAL, 123', 'RUA COMERCIAL, 456', 'PRAÇA DA MATRIZ, 789'] },
        ]
    };

    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'pointer-events-none opacity-0'}`} onClick={onClose}>
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-2xl w-[400px] transform transition-transform duration-300 z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-drawer-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                    <h3 id="filter-drawer-title" className="font-bold text-lg text-secondary">FILTROS</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X className="h-5 w-5 text-gray-600" /></button>
                </div>
                
                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {/* Top Selects */}
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect label="Medidas"><option>Caixas</option></CustomSelect>
                        <CustomSelect label="Moedas"><option>Reais</option></CustomSelect>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex border-b">
                       <TabButton label="TODOS" isActive={activeTab === 'TODOS'} onClick={() => setActiveTab('TODOS')} />
                       <TabButton label="SALVOS" isActive={activeTab === 'SALVOS'} onClick={() => setActiveTab('SALVOS')} />
                    </div>
                    
                    {/* Filters */}
                    <FilterAccordionSection title="Filtros mais utilizados">
                        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-sm text-gray-500">
                            Arraste os filtros que mais usa para este espaço
                        </div>
                    </FilterAccordionSection>
                    
                    {Object.entries(filterData).map(([categoryTitle, sections]) => (
                        <FilterAccordionSection key={categoryTitle} title={categoryTitle}>
                            <div className="space-y-2">
                               {sections.map(section => (
                                   <FilterAccordionItem key={section.title} label={section.title} items={section.items} />
                               ))}
                            </div>
                        </FilterAccordionSection>
                    ))}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t bg-white flex justify-around items-center flex-shrink-0">
                    <button onClick={onClose} className="flex flex-col items-center text-xs font-bold text-secondary hover:text-accent transition-colors"><CheckCircle className="h-5 w-5 mb-1" /> Aplicar</button>
                    <button className="flex flex-col items-center text-xs font-bold text-secondary hover:text-accent transition-colors"><Download className="h-5 w-5 mb-1" /> Salvar</button>
                    <button className="flex flex-col items-center text-xs font-bold text-secondary hover:text-accent transition-colors"><Undo className="h-5 w-5 mb-1" /> Desfazer</button>
                    <button className="flex flex-col items-center text-xs font-bold text-secondary hover:text-accent transition-colors"><Redo className="h-5 w-5 mb-1" /> Refazer</button>
                    <button className="flex flex-col items-center text-xs font-bold text-secondary hover:text-accent transition-colors"><Trash2 className="h-5 w-5 mb-1" /> Limpar</button>
                </div>
            </div>
        </div>
    );
};