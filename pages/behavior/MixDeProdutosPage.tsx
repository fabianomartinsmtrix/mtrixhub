


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

const MixDeProdutosPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { mixDeProdutos } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [cohortView, setCohortView] = useState<'chart' | 'table'>('chart');
    const [rankingView, setRankingView] = useState<'chart' | 'table'>('chart');
    const [mixFreqView, setMixFreqView] = useState<'chart' | 'table'>('chart');
    const [mixPDVView, setMixPDVView] = useState<'chart' | 'table'>('chart');
    const [top5View, setTop5View] = useState<'chart' | 'table'>('chart');

    // FIX: Create a list of all clusters to pass to the detailed table component.
    const allClusters = useMemo(() => {
        const mainClusters = Object.keys(subClusterData);
        const subClusters = Object.values(subClusterData).flat().map(d => d.cluster);
        return [...new Set([...mainClusters, ...subClusters])];
    }, []);

    const cohortOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'item', formatter: (params: any) => `Mês ${params.data[0] + 1}, Mix: ${params.data[2]}` },
        grid: { height: '70%', top: '10%' },
        xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `Mês ${i + 1}`), splitArea: { show: true } },
        yAxis: { type: 'category', data: ['Abr/25', 'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25'], splitArea: { show: true }, name: 'Mês de entrada do PDV', nameLocation: 'middle', nameGap: 50 },
        visualMap: { min: 1, max: 2.5, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%', inRange: { color: ['#d9ef96', '#00a06d'] } },
        series: [{
            name: 'Mix',
            type: 'heatmap',
            data: mixDeProdutos.cohortData.flatMap((row, i) => row.map((val, j) => (val !== null ? [j, i, val] : null))).filter(Boolean),
            label: { show: true, color: '#002e31' },
        }]
    };

    const rankingOption = {
        ...baseChartOptions,
        grid: { left: '15%', right: '15%' },
        yAxis: { type: 'category', data: mixDeProdutos.ranking.map(r => r.categoria), inverse: true },
        xAxis: { type: 'value' },
        series: [
            { name: 'Positivação', type: 'bar', data: mixDeProdutos.ranking.map(r => r.valor) },
            {
                name: 'Variação', type: 'bar', yAxisIndex: 0, xAxisIndex: 0, data: mixDeProdutos.ranking.map(r => r.variacao),
                label: { show: true, formatter: '{c}%', position: (params: any) => params.value >= 0 ? 'right' : 'left' },
                itemStyle: { color: (params: any) => params.value >= 0 ? '#00a06d' : '#dc3545' },
                barGap: '-100%',
            }
        ]
    };

    const mixPorFreqOption = {
        ...baseChartOptions,
        grid: { ...baseChartOptions.grid, left: '10%' },
        xAxis: { type: 'value', name: 'Penetração dos produtos' },
        yAxis: { type: 'category', data: mixDeProdutos.mixPorFrequencia.categories },
        series: [{ name: 'Penetração', type: 'bar', data: mixDeProdutos.mixPorFrequencia.values, label: { show: true, position: 'right' } }]
    };

    const mixPorPDVOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'axis' },
        legend: { data: ['QTD PDVs Período Anterior', 'QTD PDVs Período Atual'] },
        xAxis: { type: 'category', data: mixDeProdutos.mixPorPDV.categories },
        yAxis: { type: 'value' },
        series: [
            { name: 'QTD PDVs Período Anterior', type: 'bar', data: mixDeProdutos.mixPorPDV.anterior },
            { name: 'QTD PDVs Período Atual', type: 'bar', data: mixDeProdutos.mixPorPDV.atual },
        ]
    };

    const vennOption = {
        ...baseChartOptions,
        series: [{ type: 'venn', data: mixDeProdutos.top5presenca.sets, }],
    };

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {mixDeProdutos.indicadores.map(indicatorKey => (
                        <IndicatorSelectorCard
                            key={indicatorKey}
                            initialIndicatorKey={indicatorKey}
                            allIndicatorsData={allIndicatorsData}
                            indicatorOptions={indicatorOptions}
                        />
                    ))}
                </div>

                <Card title="Cohort de Mix de Produtos" footerContent={<SimpleSelect options={['Últimos 12M', 'Últimos 6M']} />} actions={<CardActions showViewToggle currentView={cohortView} onToggleView={() => setCohortView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {cohortView === 'chart' ? (
                        <ReactECharts option={cohortOption} style={{ height: 400 }} />
                    ) : (
                        <DataTable columns={['Mês Entrada', ...cohortOption.xAxis.data]} data={cohortOption.yAxis.data.map((month, i) => [month, ...mixDeProdutos.cohortData[i].map(d => d === null ? '-' : d)])} />
                    )}
                </Card>
                
                <Card title="Ranking de Produto" actions={<CardActions showViewToggle currentView={rankingView} onToggleView={() => setRankingView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {rankingView === 'chart' ? (
                        <ReactECharts option={rankingOption} style={{ height: 400 }} />
                    ) : (
                        <DataTable columns={['Categoria', 'Positivação', 'Variação %']} data={mixDeProdutos.ranking.map(r => [r.categoria, r.valor, `${r.variacao}%`])} />
                    )}
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Mix de Produtos por Frequência de PDVs" actions={<CardActions showViewToggle currentView={mixFreqView} onToggleView={() => setMixFreqView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {mixFreqView === 'chart' ? (
                            <ReactECharts option={mixPorFreqOption} style={{ height: 400 }} />
                        ) : (
                            <DataTable columns={['Frequência', 'Penetração']} data={mixDeProdutos.mixPorFrequencia.categories.map((c, i) => [c, mixDeProdutos.mixPorFrequencia.values[i]])} />
                        )}
                    </Card>
                    <Card title="Mix de Produto por PDVs" actions={<CardActions showViewToggle currentView={mixPDVView} onToggleView={() => setMixPDVView(v => v === 'chart' ? 'table' : 'chart')} />}>
                        {mixPDVView === 'chart' ? (
                             <ReactECharts option={mixPorPDVOption} style={{ height: 400 }} />
                        ) : (
                             <DataTable columns={['Mês', 'Anterior', 'Atual']} data={mixDeProdutos.mixPorPDV.categories.map((c, i) => [c, mixDeProdutos.mixPorPDV.anterior[i], mixDeProdutos.mixPorPDV.atual[i]])} />
                        )}
                    </Card>
                </div>
                
                 <Card title="Top 5 Presença de produto" footerContent={<SimpleSelect options={['Marca', 'Categoria']} />} actions={<CardActions showViewToggle currentView={top5View} onToggleView={() => setTop5View(v => v === 'chart' ? 'table' : 'chart')} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {top5View === 'chart' ? (
                            <ReactECharts option={vennOption} style={{ height: 400 }} />
                        ) : (
                             <DataTable columns={['Combinação', 'Nº PDVs']} data={mixDeProdutos.top5presenca.sets.map(s => [s.sets.join(' & '), s.size])} />
                        )}
                        <div>
                            <h4 className="font-bold mb-2">Tabela de Intersecções</h4>
                            <div className="max-h-96 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-gray-50">
                                        <tr>
                                            {['Marca 1', 'Marca 2', 'Marca 3', 'Outros', 'Nº PDVs', 'Sell-through (R$)'].map(h => <th key={h} className="p-2 text-left font-bold">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {mixDeProdutos.top5presenca.tableData.map((row, idx) => (
                                        <tr key={idx} className="border-b">
                                            {row.slice(0, 4).map((cell, cIdx) => <td key={cIdx} className="p-2 text-center">{cell ? '✅' : '⬜'}</td>)}
                                            <td className="p-2">{row[5]}</td>
                                            <td className="p-2">R$ {row[6]}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>

                <TabelaDetalhadaComportamento title="Entrega Complementar (Relatório Acionável)" selectedClusters={allClusters} />
            </div>
        </>
    );
};

export const MixDeProdutosPage = React.memo(MixDeProdutosPageComponent);