

import React, { useState, useMemo } from 'react';
import { Package, Percent, DollarSign, FileUp, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import { Card, CustomDateRange, CustomSelect, CustomCheckboxGroup, TextInput } from '../components/ui';
import { mockSelectedSKUs, formatNumberBR } from '../services/mockData';

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["Configuração Básica", "Seleção de Produtos", "Critérios de Elegibilidade", "Resumo"];
    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = currentStep > stepNumber;
                const isActive = currentStep === stepNumber;
                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                isCompleted ? 'bg-accent text-white' : isActive ? 'bg-lime text-primary' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                            </div>
                            <p className={`mt-2 text-xs text-center ${isActive ? 'font-bold text-primary' : 'text-gray-500'}`}>{step}</p>
                        </div>
                        {stepNumber < steps.length && <div className={`flex-1 h-0.5 mx-4 ${currentStep > stepNumber ? 'bg-accent' : 'bg-gray-200'}`}></div>}
                    </React.Fragment>
                )
            })}
        </div>
    );
};

type SkuClassification = 'Obrigatório' | 'Complementar' | 'Inegociável';
// Fix: An interface cannot extend a complex object type. Changed to a type alias
// using an intersection (&) to correctly combine the inferred SKU type with the new
// `classification` property. This resolves all subsequent property access errors.
type SelectedSku = (typeof mockSelectedSKUs)[number] & {
    classification: SkuClassification;
};

const DefinicaoMSLScreenComponent: React.FC = () => {
    const [step, setStep] = useState(1);
    const [strategyName, setStrategyName] = useState('Estratégia Sell-through Varejo SP');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkus, setSelectedSkus] = useState<SelectedSku[]>(() => 
        mockSelectedSKUs.slice(0, 3).map(sku => ({ ...sku, classification: 'Obrigatório' }))
    );

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
    const handlePublish = () => alert('Estratégia publicada com sucesso!');

    const { totalParticipation, totalPotential } = useMemo(() => {
        const totalParticipation = selectedSkus.reduce((acc, sku) => acc + sku.participation, 0);
        const totalPotential = selectedSkus.reduce((acc, sku) => acc + sku.potential, 0);
        return { totalParticipation, totalPotential };
    }, [selectedSkus]);

    const changeSkuClassification = (id: string, classification: SkuClassification) => {
        setSelectedSkus(prev => prev.map(sku => sku.id === id ? { ...sku, classification } : sku));
    };
    
    const Step1 = () => (
        <Card title="Passo 1: Configuração Básica">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput label="Nome da Estratégia" value={strategyName} onChange={e => setStrategyName(e.target.value)} placeholder="Ex: MSL Varejo Sudeste" />
                <CustomDateRange label="Período de vigência" />
                <CustomSelect label="Segmento (múltiplo)" multiple>
                    <option>Canal</option>
                    <option>Cluster</option>
                    <option>Missão de compra</option>
                </CustomSelect>
                <CustomSelect label="Região">
                    <option>Sudeste</option>
                    <option>Sul</option>
                    <option>Nordeste</option>
                </CustomSelect>
            </div>
        </Card>
    );

    const Step2 = () => (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card title="Passo 2: Seleção de Produtos">
                    <TextInput label="Busca por SKU com autocomplete" placeholder="Digite o nome ou código do SKU..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-bold text-md text-secondary mb-2">SKUs Selecionados:</h4>
                        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {selectedSkus.map(sku => (
                                <li key={sku.id} className="p-3 bg-gray-50 rounded-lg border flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm text-secondary">{sku.id} - {sku.name}</p>
                                        <p className="text-xs text-gray-500">Part.: {formatNumberBR(sku.participation)}% | Pot.: R$ {formatNumberBR(sku.potential)}</p>
                                    </div>
                                    <CustomSelect label="" value={sku.classification} onChange={(e) => changeSkuClassification(sku.id, e.target.value as SkuClassification)}>
                                        <option>Obrigatório</option>
                                        <option>Complementar</option>
                                        <option>Inegociável</option>
                                    </CustomSelect>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
             <div className="lg:col-span-1">
                 <div className="sticky top-6">
                    <Card title="MSL em Construção">
                        <div className="space-y-3 mb-5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center text-gray-600"><Package className="w-4 h-4 mr-2 text-gray-400"/> Nº SKUs</span>
                                <span className="font-bold text-secondary">{selectedSkus.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center text-gray-600"><Percent className="w-4 h-4 mr-2 text-gray-400"/> % Participação Estimada</span>
                                <span className="font-bold text-secondary">{formatNumberBR(totalParticipation)}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center text-gray-600"><DollarSign className="w-4 h-4 mr-2 text-gray-400"/> Potencial Incremental</span>
                                <span className="font-bold text-secondary">R$ {formatNumberBR(totalPotential)}</span>
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>
         </div>
    );
    
    const Step3 = () => (
        <Card title="Passo 3: Critérios de Elegibilidade">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CustomCheckboxGroup 
                    label="Selecione os critérios para inclusão automática de produtos" 
                    options={['Volume mínimo', 'Margem', 'Relevância para o Shopper', 'Inovação']}
                />
                <div>
                     <label className="block text-sm font-medium text-gray-600 mb-2">Opções Adicionais</label>
                     <button className="w-full flex items-center justify-center px-4 py-2.5 border border-dashed border-gray-400 rounded-lg text-sm font-bold text-secondary hover:bg-gray-100 transition-colors">
                        <FileUp className="w-4 h-4 mr-2" />
                        Importar lista via Excel/API
                    </button>
                </div>
            </div>
        </Card>
    );

    const Step4 = () => (
         <Card title="Passo 4: Resumo da Estratégia">
            <div className="space-y-4">
                <h3 className="text-xl font-black text-primary">{strategyName}</h3>
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                     <div><p className="text-sm text-gray-500">Período de Vigência</p><p className="font-bold">02/09/2025 - 01/09/2026</p></div>
                     <div><p className="text-sm text-gray-500">Segmentos</p><p className="font-bold">Canal, Cluster</p></div>
                     <div><p className="text-sm text-gray-500">Regiões</p><p className="font-bold">Sudeste</p></div>
                </div>
                 <h4 className="font-bold text-md text-secondary pt-2">KPIs Esperados</h4>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Sell-through Potencial</p><p className="font-bold text-lg text-primary">R$ {formatNumberBR(totalPotential)}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Cobertura</p><p className="font-bold text-lg text-primary">85%</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Ticket Médio</p><p className="font-bold text-lg text-primary">R$ 125,50</p></div>
                 </div>
                  <h4 className="font-bold text-md text-secondary pt-2">Produtos ({selectedSkus.length})</h4>
                  <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 border rounded-lg p-2 bg-gray-50">
                    {selectedSkus.map(sku => (
                        <li key={sku.id} className="text-xs p-2 bg-white rounded-md border flex justify-between items-center">
                            <p className="font-bold text-secondary flex-1">{sku.id} - {sku.name}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                sku.classification === 'Obrigatório' ? 'bg-red-100 text-red-800' :
                                sku.classification === 'Complementar' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>{sku.classification}</span>
                        </li>
                    ))}
                 </ul>
            </div>
         </Card>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <ProgressBar currentStep={step} />
            
            <div className="mt-6 min-h-[450px]">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
            </div>

            <div className="flex items-center justify-between mt-8">
                <button 
                    onClick={handlePrev} 
                    disabled={step === 1}
                    className="flex items-center px-6 py-2.5 rounded-full shadow-none font-bold text-sm bg-gray-200 text-secondary hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                </button>

                {step < 4 && (
                    <button 
                        onClick={handleNext}
                        className="flex items-center px-6 py-2.5 rounded-full shadow-none font-bold text-sm bg-primary text-white hover:opacity-90 transition-opacity"
                    >
                        Próximo
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                )}
                 {step === 4 && (
                    <button 
                        onClick={handlePublish}
                        className="px-8 py-2.5 rounded-full shadow-none font-black text-sm bg-lime text-primary hover:opacity-90 transition-opacity"
                    >
                        Publicar Estratégia
                    </button>
                )}
            </div>
        </div>
    );
};
export const DefinicaoMSLScreen = React.memo(DefinicaoMSLScreenComponent);