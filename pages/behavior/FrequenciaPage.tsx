


import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';
import { PageHeader } from '../PageHeader';
import { Card, IndicatorSelectorCard, SimpleSelect, CardActions, DataTable } from '../../components/ui';
// FIX: import subClusterData to get all clusters for the detailed table.
import { mockBehavior, allIndicatorsData, indicatorOptions, subClusterData } from '../../services/mockData';
import { baseChartOptions } from '../common';
import { TabelaDetalhadaComportamento } from './common';
import type { SecondaryMenuContextProps } from '../../components/layout/SecondaryMenuLayout';

const FrequenciaPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { frequencia } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [cohortView, setCohortView] = useState<'chart' | 'table'>('chart');
    const [ticketsView, setTicketsView] = useState<'chart' | 'table'>('chart');
    const [recorrenciaView, setRecorrenciaView] = useState<'chart' | 'table'>('chart');

    // FIX: Create a list of all clusters to pass to the detailed table component.
    const allClusters = useMemo(() => {
        const mainClusters = Object.keys(subClusterData);
        const subClusters = Object.values(subClusterData).flat().map(d => d.cluster);
        return [...new Set([...mainClusters, ...subClusters])];
    }, []);

    const cohortOption = {
        ...baseChartOptions,
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => `Mês ${params.data[0] + 1}, Retenção: ${params.data[2]}%`
        },
        grid: { height: '70%', top: '10%' },
        xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `Mês ${i + 1}`), splitArea: { show: true } },
        yAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `${i + 1}`), splitArea: { show: true }, name: 'Frequência com x Meses Ativos', nameLocation: 'middle', nameGap: 40 },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            inRange: { color: ['#d9ef96', '#00a06d'] }
        },
        series: [{
            name: 'Retenção',
            type: 'heatmap',
            data: frequencia.cohortData.flatMap((row, i) => row.map((val, j) => (val !== null ? [j, i, val] : null))).filter(Boolean),
            label: { show: true, color: '#002e31', formatter: '{@[2]}%' },
        }]
    };

    const ticketsMedioOption = {
        ...baseChartOptions,
        grid: { ...baseChartOptions.grid, left: '10%' },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: frequencia.ticketsMedio.categories },
        series: [{
            name: 'Ticket Médio',
            type: 'bar',
            data: frequencia.ticketsMedio.values,
            label: { show: true, position: 'right' }
        }]
    };

    const recorrenciaOption = {
        ...baseChartOptions,
        xAxis: { type: 'category', data: frequencia.recorrencia.categories, name: 'Período sem compras', nameLocation: 'middle', nameGap: 30 },
        yAxis: { type: 'value', name: 'Qtd. PDVs' },
        series: [{
            name: 'PDVs',
            type: 'bar',
            data: frequencia.recorrencia.values
        }]
    };
    
    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {frequencia.indicadores.map(indicatorKey => (
                        <IndicatorSelectorCard
                            key={indicatorKey}
                            initialIndicatorKey={indicatorKey}
                            allIndicatorsData={allIndicatorsData}
                            indicatorOptions={indicatorOptions}
                        />
                    ))}
                </div>

                <Card title="Cohort de PDVs – % Retenção por Mês" footerContent={<SimpleSelect options={['Últimos 12M', 'Últimos 6M']} />} actions={<CardActions showViewToggle currentView={cohortView} onToggleView={() => setCohortView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {cohortView === 'chart' ? (
                        <ReactECharts option={cohortOption} style={{ height: 450 }} />
                    ) : (
                        <DataTable columns={['Mês Entrada', ...cohortOption.xAxis.data]} data={frequencia.cohortData.map((row, i) => [`Mês ${i+1}`, ...row.map(d => d === null ? '-' : `${d}%`)])} />
                    )}
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Tickets Médio por Frequência de PDVs" actions={<CardActions showViewToggle currentView={ticketsView} onToggleView={() => setTicketsView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {ticketsView === 'chart' ? (
                            <ReactECharts option={ticketsMedioOption} style={{ height: 400 }} />
                        ) : (
                            <DataTable columns={['Frequência', 'Ticket Médio']} data={frequencia.ticketsMedio.categories.map((cat, i) => [cat, frequencia.ticketsMedio.values[i]])} />
                        )}
                    </Card>
                    <Card title="Recorrência dos PDVs" actions={<CardActions showViewToggle currentView={recorrenciaView} onToggleView={() => setRecorrenciaView(v => v === 'chart' ? 'table' : 'chart')} />}>
                         {recorrenciaView === 'chart' ? (
                            <ReactECharts option={recorrenciaOption} style={{ height: 400 }} />
                         ) : (
                            <DataTable columns={['Período sem Compras', 'Qtd. PDVs']} data={frequencia.recorrencia.categories.map((cat, i) => [cat, frequencia.recorrencia.values[i]])} />
                         )}
                    </Card>
                </div>

                 <TabelaDetalhadaComportamento title="Entrega Complementar (Relatório Acionável)" selectedClusters={allClusters} />
            </div>
        </>
    );
};

export const FrequenciaPage = React.memo(FrequenciaPageComponent);