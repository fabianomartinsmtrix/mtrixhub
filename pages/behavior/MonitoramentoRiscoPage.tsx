


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

const MonitoramentoRiscoPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { monitoramentoRisco } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [gruposView, setGruposView] = useState<'chart' | 'table'>('chart');
    const [evolucaoView, setEvolucaoView] = useState<'chart' | 'table'>('chart');
    const [dispersaoView, setDispersaoView] = useState<'chart' | 'table'>('chart');

    // FIX: Create a list of all clusters to pass to the detailed table component.
    const allClusters = useMemo(() => {
        const mainClusters = Object.keys(subClusterData);
        const subClusters = Object.values(subClusterData).flat().map(d => d.cluster);
        return [...new Set([...mainClusters, ...subClusters])];
    }, []);

    const gruposRiscoOption = {
        ...baseChartOptions,
        xAxis: { type: 'category', data: monitoramentoRisco.gruposDeRisco.categories },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: monitoramentoRisco.gruposDeRisco.values }]
    };

    const evolucaoGruposOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'axis' },
        legend: { data: ['Baixo Risco', 'Médio Risco', 'Alto Risco'] },
        xAxis: { type: 'category', data: monitoramentoRisco.evolucaoGrupos.categories },
        yAxis: { type: 'value' },
        series: [
            { name: 'Baixo Risco', type: 'line', data: monitoramentoRisco.evolucaoGrupos.baixo, smooth: true, lineStyle: { color: '#00a06d' }, itemStyle: { color: '#00a06d' } },
            { name: 'Médio Risco', type: 'line', data: monitoramentoRisco.evolucaoGrupos.medio, smooth: true, lineStyle: { color: '#facc15' }, itemStyle: { color: '#facc15' } },
            { name: 'Alto Risco', type: 'line', data: monitoramentoRisco.evolucaoGrupos.alto, smooth: true, lineStyle: { color: '#dc3545' }, itemStyle: { color: '#dc3545' } }
        ]
    };
    
    const dispersaoRiscoOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'item', formatter: (p: any) => `Anterior: ${p.value[0].toFixed(2)}<br/>Atual: ${p.value[1].toFixed(2)}<br/>Variação: ${(p.value[2]*100).toFixed(1)}%` },
        xAxis: { type: 'value', name: 'RFV Período Anterior', scale: true },
        yAxis: { type: 'value', name: 'RFV Período Atual', scale: true },
        visualMap: {
            min: -1, max: 1, dimension: 2,
            inRange: { color: ['#dc3545', '#facc15', '#00a06d'] },
            show: false,
        },
        series: [{
            type: 'scatter',
            data: monitoramentoRisco.dispersaoRisco.map(d => [d.anterior, d.atual, d.variacao]),
            symbolSize: 8,
        }]
    };

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {monitoramentoRisco.indicadores.map(indicatorKey => (
                       <IndicatorSelectorCard
                            key={indicatorKey}
                            initialIndicatorKey={indicatorKey}
                            allIndicatorsData={allIndicatorsData}
                            indicatorOptions={indicatorOptions}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Grupos de Risco dos PDVs" footerContent={<SimpleSelect options={['Positivação']} />} actions={<CardActions showViewToggle currentView={gruposView} onToggleView={() => setGruposView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {gruposView === 'chart' ? (
                            <ReactECharts option={gruposRiscoOption} style={{ height: 350 }} />
                        ) : (
                            <DataTable columns={['Grupo de Risco', 'Qtd. PDVs']} data={monitoramentoRisco.gruposDeRisco.categories.map((c, i) => [c, monitoramentoRisco.gruposDeRisco.values[i]])} />
                        )}
                    </Card>
                    <Card title="Evolução dos Grupos de Risco dos PDVs" footerContent={<SimpleSelect options={['Positivação']} />} actions={<CardActions showViewToggle currentView={evolucaoView} onToggleView={() => setEvolucaoView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {evolucaoView === 'chart' ? (
                            <ReactECharts option={evolucaoGruposOption} style={{ height: 350 }} />
                        ) : (
                            <DataTable columns={['Mês', 'Baixo', 'Médio', 'Alto']} data={monitoramentoRisco.evolucaoGrupos.categories.map((c, i) => [c, monitoramentoRisco.evolucaoGrupos.baixo[i], monitoramentoRisco.evolucaoGrupos.medio[i], monitoramentoRisco.evolucaoGrupos.alto[i]])} />
                        )}
                    </Card>
                </div>

                <Card title="Dispersão de Risco" actions={<CardActions showViewToggle currentView={dispersaoView} onToggleView={() => setDispersaoView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {dispersaoView === 'chart' ? (
                        <ReactECharts option={dispersaoRiscoOption} style={{ height: 450 }} />
                    ) : (
                        <DataTable columns={['RFV Anterior', 'RFV Atual', 'Variação %']} data={monitoramentoRisco.dispersaoRisco.map(d => [d.anterior.toFixed(2), d.atual.toFixed(2), `${(d.variacao*100).toFixed(1)}%`])} />
                    )}
                </Card>

                 <TabelaDetalhadaComportamento title="Entrega Complementar (Relatório Acionável)" selectedClusters={allClusters} />
            </div>
        </>
    );
};

export const MonitoramentoRiscoPage = React.memo(MonitoramentoRiscoPageComponent);