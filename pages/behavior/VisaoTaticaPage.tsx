


import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext, Link } from 'react-router-dom';
import { PageHeader } from '../PageHeader';
import { Card, DataTable, IndicatorCard, SimpleSelect, CardActions } from '../../components/ui';
// FIX: import subClusterData to get all clusters for the detailed table.
import { mockBehavior, subClusterData } from '../../services/mockData';
import { baseChartOptions } from '../common';
import { TabelaDetalhadaComportamento } from './common';
import type { SecondaryMenuContextProps } from '../../components/layout/SecondaryMenuLayout';

const VisaoTaticaPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { visaoTatica } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [rfvView, setRfvView] = useState<'chart' | 'table'>('chart');
    const [performanceView, setPerformanceView] = useState<'chart' | 'table'>('chart');

    // FIX: Create a list of all clusters to pass to the detailed table component.
    const allClusters = useMemo(() => {
        const mainClusters = Object.keys(subClusterData);
        const subClusters = Object.values(subClusterData).flat().map(d => d.cluster);
        return [...new Set([...mainClusters, ...subClusters])];
    }, []);

    const rfvMatrixOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'item', formatter: (p: any) => `${p.name}<br/>PDVs: ${p.value[2]}` },
        xAxis: { type: 'value', name: 'Recência', min: 0.5, max: 5.5, splitLine: { show: true } },
        yAxis: { type: 'value', name: 'Frequência ou Valor Monetário', min: 0.5, max: 5.5, splitLine: { show: true } },
        series: [{
            type: 'scatter',
            data: visaoTatica.rfvMatrix.map(item => ({...item, value: [item.x, item.y, item.value] })),
            symbolSize: (data: any) => Math.sqrt(data[2]) * 1.8,
            label: { 
                show: true, 
                formatter: '{b}', 
                color: '#fff', 
                textShadowColor: 'rgba(0, 0, 0, 0.7)', 
                textShadowBlur: 2,
                fontWeight: 'bold',
                fontSize: 10,
            },
            itemStyle: {
                color: '#4f46e5'
            },
        }]
    };
    
    const treemapOption = {
        ...baseChartOptions,
        color: ['#f5b01c', '#f07c33', '#8a8d91', '#4a90e2', '#50e3c2', '#b8e986', '#7ed321'],
        tooltip: {
            formatter: (params: any) => {
                 if (!params.data) return '';
                return `${params.data.name}<br/>PDVs: ${params.data.value}`;
            }
        },
        series: [{
            type: 'treemap',
            roam: false,
            label: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.7)',
                textShadowBlur: 2,
            },
            itemStyle: {
                borderColor: '#fff'
            },
            data: visaoTatica.performanceComportamento.treeData
        }]
    };

    const footerFilters = (
        <div className="flex items-end flex-wrap gap-4">
            <SimpleSelect label="Segmento, Geografia, AD e FDV" options={['Todos', 'Segmento do PDV', 'Geografia']} />
            <SimpleSelect label="Positivação" options={['Sell-through (Qtde.)', 'Sell-through em R$', 'Ticket Médio PDV', 'Mix Médio de Produto']} />
        </div>
    );

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <Card title="Visão Tática do Comportamento de PDVs" actions={<CardActions showViewToggle currentView={rfvView} onToggleView={() => setRfvView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {rfvView === 'chart' ? (
                        <ReactECharts option={rfvMatrixOption} style={{ height: 450 }} />
                    ) : (
                        <DataTable columns={['Cluster', 'Recência', 'Frequência', 'PDVs']} data={visaoTatica.rfvMatrix.map(d => [d.name, d.x, d.y, d.value])} />
                    )}
                </Card>

                <Card title="Performance de Comportamento" footerContent={footerFilters} actions={<CardActions showViewToggle currentView={performanceView} onToggleView={() => setPerformanceView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {performanceView === 'chart' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            <ReactECharts option={treemapOption} style={{ height: 400 }} />
                            <div className="max-h-[400px] overflow-y-auto">
                                <DataTable 
                                    columns={visaoTatica.performanceComportamento.tableColumns as readonly string[]} 
                                    data={visaoTatica.performanceComportamento.tableData as readonly (string | number)[][]} 
                                />
                            </div>
                        </div>
                    ) : (
                         <DataTable 
                            columns={visaoTatica.performanceComportamento.tableColumns as readonly string[]} 
                            data={visaoTatica.performanceComportamento.tableData as readonly (string | number)[][]} 
                        />
                    )}
                </Card>

                <Card title="Visão Operacional do Comportamento de PDVs" actions={<CardActions />}>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                         {visaoTatica.visaoOperacional.map(item => <IndicatorCard key={item.title} {...item} value={String(item.value)} change={String(item.change)} comparisonText="" wide={false} />)}
                     </div>
                </Card>
                
                 <TabelaDetalhadaComportamento 
                    title="Tabela do Comportamento de PDVs"
                    showPDVLink={true}
                    selectedClusters={allClusters}
                 />

            </div>
        </>
    );
};

export const VisaoTaticaPage = React.memo(VisaoTaticaPageComponent);