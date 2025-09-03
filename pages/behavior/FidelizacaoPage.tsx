

import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { Card, SimpleSelect, CardActions, DataTable } from '../../components/ui';
import { mockBehavior, allIndicatorsData, indicatorOptions, subClusterData, formatNumberBR } from '../../services/mockData';
import { baseChartOptions } from '../common';
import type { SecondaryMenuContextProps } from '../../components/layout/SecondaryMenuLayout';
import { TabelaDetalhadaComportamento, AnaliseComplementarCluster, PerformanceComportamentoCluster } from './common';

const clusterHierarchy = {
    'Campeões': [],
    'Fiéis': ['Fiéis', 'Potenciais Fiéis', 'Não Posso Perdê-los'],
    'Potenciais': ['Precisam de Atenção', 'Promissores', 'Novos'],
    'Em Risco': ['Vulneráveis', 'Hibernando'],
};

const ClusterSelector: React.FC<{ selected: string[], onSelectionChange: (selection: string[]) => void }> = ({ selected, onSelectionChange }) => {
    const [open, setOpen] = useState<Record<string, boolean>>({ 'Campeões': true, 'Fiéis': true, 'Potenciais': true, 'Em Risco': true });

    const handleMainChange = (cluster: string, subclusters: string[]) => {
        const allChildren = [cluster, ...subclusters];
        const areAllSelected = allChildren.every(c => selected.includes(c));
        let newSelection;
        if (areAllSelected) {
            newSelection = selected.filter(s => !allChildren.includes(s));
        } else {
            newSelection = [...new Set([...selected, ...allChildren])];
        }
        onSelectionChange(newSelection);
    };

    const handleSubChange = (item: string) => {
        const newSelection = selected.includes(item) ? selected.filter(s => s !== item) : [...selected, item];
        onSelectionChange(newSelection);
    };

    return (
        <Card title="Painel de Seleção" className="sticky top-6">
            <p className="text-sm text-gray-500 mb-4">Selecione um ou mais clusters/sub-clusters para análise comparativa.</p>
            {Object.entries(clusterHierarchy).map(([main, subs]) => {
                 const isMainSelected = subs.length > 0 ? subs.every(s => selected.includes(s)) : selected.includes(main);
                 return(
                    <div key={main} className="py-2">
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm font-bold text-secondary cursor-pointer">
                                <input type="checkbox" checked={isMainSelected} onChange={() => handleMainChange(main, subs)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/50 mr-3"/>
                                {main}
                            </label>
                            {subs.length > 0 && <button onClick={() => setOpen(p => ({...p, [main]: !p[main]}))}>{open[main] ? <ChevronUp/> : <ChevronDown/>}</button>}
                        </div>
                        {open[main] && subs.length > 0 && (
                            <div className="pl-8 pt-2 space-y-2">
                                {subs.map(sub => (
                                     <label key={sub} className="flex items-center text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" checked={selected.includes(sub)} onChange={() => handleSubChange(sub)} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/50 mr-3"/>
                                        {sub}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                 )
            })}
        </Card>
    );
};


const ResumoCard: React.FC<{ selection: string[] }> = ({ selection }) => {
    const summary = useMemo(() => {
        if (selection.length === 0) {
            return { pdvs: 0, representatividade: 0 };
        }
        
        let totalPdvs = 0;
        let totalRep = 0;

        const allSubclusters = Object.values(subClusterData).flat();
        
        selection.forEach(item => {
            const data = allSubclusters.find(d => d.cluster === item);
            if (data) {
                totalPdvs += data.ytd25;
                totalRep += data.representatividade; // This is an approximation; real logic would be more complex
            }
        });

        return { pdvs: totalPdvs, representatividade: totalRep };

    }, [selection]);

    return (
        <Card title="Resumo da Seleção">
             <div className="flex justify-around items-center h-full">
                <div className="text-center">
                    <p className="text-sm text-gray-500">Total de PDVs</p>
                    <p className="text-4xl font-black text-primary">{formatNumberBR(summary.pdvs)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-500">Representatividade Total</p>
                    <p className="text-4xl font-black text-primary">{summary.representatividade.toFixed(0)}%</p>
                </div>
            </div>
        </Card>
    );
};

const ComparativeChart: React.FC<{ selection: string[] }> = ({ selection }) => {
    const [view, setView] = useState<'chart' | 'table'>('chart');

    const chartData = useMemo(() => {
        if (selection.length === 0) return { categories: [], series: [], tableData: [] };
        
        const mainClustersSelected = selection.filter(s => clusterHierarchy[s as keyof typeof clusterHierarchy]);
        
        if (mainClustersSelected.length === 0) return { categories: [], series: [], tableData: [] };
        
        const firstMain = mainClustersSelected[0] as keyof typeof subClusterData;
        const categories = subClusterData[firstMain].map(s => s.cluster);

        const series = mainClustersSelected.map(mainCluster => {
            const subData = subClusterData[mainCluster as keyof typeof subClusterData];
            return {
                name: mainCluster,
                type: 'bar',
                data: categories.map(cat => subData.find(s => s.cluster === cat)?.ytd25 || 0)
            }
        });

        const tableData = categories.map((cat, i) => [
            cat,
            ...series.map(s => s.data[i])
        ]);

        return { categories, series, tableData };

    }, [selection]);

    const chartOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'axis' },
        legend: { ...baseChartOptions.legend, data: chartData.series.map(s => s.name) },
        xAxis: { type: 'category', data: chartData.categories, axisLabel: { interval: 0, rotate: 30 } },
        yAxis: { type: 'value', name: 'Qtd. PDVs' },
        series: chartData.series
    };

    return (
        <Card 
            title="Distribuição de PDVs por Sub-Cluster"
            actions={<CardActions showViewToggle currentView={view} onToggleView={() => setView(v => v === 'chart' ? 'table' : 'chart')} />}
        >
            {view === 'chart' ? (
                 <ReactECharts option={chartOption} style={{ height: 400 }} />
            ): (
                <DataTable columns={['Sub-Cluster', ...chartData.series.map(s => s.name)]} data={chartData.tableData} />
            )}
        </Card>
    );
}


const FidelizacaoPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [selectedClusters, setSelectedClusters] = useState<string[]>(['Fiéis']);

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                <div className="lg:col-span-1">
                    <ClusterSelector selected={selectedClusters} onSelectionChange={setSelectedClusters} />
                </div>
                <div className="lg:col-span-3 space-y-6">
                    <ResumoCard selection={selectedClusters} />
                    <ComparativeChart selection={selectedClusters} />
                    {selectedClusters.length > 0 && (
                        <>
                         <AnaliseComplementarCluster selectedClusters={selectedClusters} />
                         <PerformanceComportamentoCluster selectedClusters={selectedClusters} />
                         <TabelaDetalhadaComportamento 
                             title={`Detalhes - PDVs Selecionados`}
                             selectedClusters={selectedClusters}
                             showPDVLink={true}
                         />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export const FidelizacaoPage = React.memo(FidelizacaoPageComponent);