


import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';
import { PageHeader } from '../PageHeader';
import { Card, DataTable, CardActions } from '../../components/ui';
// FIX: import subClusterData to get all clusters for the detailed table.
import { mockBehavior, subClusterData } from '../../services/mockData';
import { baseChartOptions } from '../common';
import { TabelaDetalhadaComportamento } from './common';
import type { SecondaryMenuContextProps } from '../../components/layout/SecondaryMenuLayout';

const CoberturaPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { cobertura } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();

    const [coberturaView, setCoberturaView] = useState<'chart' | 'table'>('chart');
    const [agenteView, setAgenteView] = useState<'chart' | 'table'>('chart');

    // FIX: Create a list of all clusters to pass to the detailed table component.
    const allClusters = useMemo(() => {
        const mainClusters = Object.keys(subClusterData);
        const subClusters = Object.values(subClusterData).flat().map(d => d.cluster);
        return [...new Set([...mainClusters, ...subClusters])];
    }, []);

    const barOptionHorizontal = {
        ...baseChartOptions,
        grid: { ...baseChartOptions.grid, left: '20%' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { ...baseChartOptions.legend, data: ['Sem Compra', 'Estável'] },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: ['Cobertura'] },
        series: [
            { name: 'Sem Compra', type: 'bar', stack: 'total', label: { show: true }, data: [cobertura.semComprasVsEstaveis.semCompra] },
            { name: 'Estável', type: 'bar', stack: 'total', label: { show: true }, data: [cobertura.semComprasVsEstaveis.estavel] }
        ]
    };
    
    const barOptionVertical = {
        ...baseChartOptions,
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { ...baseChartOptions.legend, data: ['Sem Compra', 'Estável'] },
        xAxis: { type: 'category', data: cobertura.porAgente.categories },
        yAxis: { type: 'value' },
        series: [
            { name: 'Sem Compra', type: 'bar', data: cobertura.porAgente.semCompra },
            { name: 'Estável', type: 'bar', data: cobertura.porAgente.estavel }
        ]
    };
    
    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <Card title="Defina o Período de Cobertura">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <label className="text-sm font-bold text-secondary">Cobertura Total - 2 meses</label>
                            <input type="range" min="1" max="12" defaultValue="2" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent mt-2" />
                            <p className="text-xs text-gray-500 mt-1">Período de análise: {cobertura.periodoTotal}</p>
                        </div>
                         <div>
                            <label className="text-sm font-bold text-secondary">Cobertura Estável - 2 meses</label>
                            <input type="range" min="1" max="12" defaultValue="2" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent mt-2" />
                             <p className="text-xs text-gray-500 mt-1">Período de análise: {cobertura.periodoEstavel}</p>
                        </div>
                    </div>
                </Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="PDVs sem Compras e Estáveis" actions={<CardActions showViewToggle currentView={coberturaView} onToggleView={() => setCoberturaView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {coberturaView === 'chart' ? (
                            <ReactECharts option={barOptionHorizontal} style={{ height: 250 }} />
                        ) : (
                            <DataTable columns={['Status', 'Qtd. PDVs']} data={[['Sem Compra', cobertura.semComprasVsEstaveis.semCompra], ['Estável', cobertura.semComprasVsEstaveis.estavel]]} />
                        )}
                    </Card>
                    <Card title="PDVs sem Compras e Estáveis por Agente de Distribuição" actions={<CardActions showViewToggle currentView={agenteView} onToggleView={() => setAgenteView(v => v === 'chart' ? 'table' : 'chart')} />}>
                         {agenteView === 'chart' ? (
                            <ReactECharts option={barOptionVertical} style={{ height: 250 }} />
                         ) : (
                            <DataTable columns={['Agente', 'Sem Compra', 'Estável']} data={cobertura.porAgente.categories.map((cat, i) => [cat, cobertura.porAgente.semCompra[i], cobertura.porAgente.estavel[i]])} />
                         )}
                    </Card>
                </div>
                <Card title="Cobertura de PDVs" actions={<CardActions />}>
                    <DataTable columns={cobertura.tabelaCobertura.columns as readonly string[]} data={cobertura.tabelaCobertura.data as readonly (string | number)[][]} />
                </Card>
                 <TabelaDetalhadaComportamento title="Entrega Complementar (Relatório Acionável)" selectedClusters={allClusters} />
            </div>
        </>
    );
};

export const CoberturaPage = React.memo(CoberturaPageComponent);