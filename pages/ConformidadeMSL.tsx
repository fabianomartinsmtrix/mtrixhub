import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

import { Card, BigNumberCard, CardActions, DataTable } from '../components/ui';
import * as mockData from '../services/mockData';
import { baseChartOptions, baseChartOptionsConformidade } from './common';

const ConformidadeMSLScreenComponent: React.FC = () => {
    const [desempenhoView, setDesempenhoView] = useState<'chart' | 'table'>('chart');
    const [temporalView, setTemporalView] = useState<'chart' | 'table'>('chart');
    const [composicaoView, setComposicaoView] = useState<'chart' | 'table'>('chart');
    const [penetracaoView, setPenetracaoView] = useState<'chart' | 'table'>('chart');
    const [oportunidadesView, setOportunidadesView] = useState<'chart' | 'table'>('chart');

    const stackedBarOption = { ...baseChartOptionsConformidade, yAxis: { ...baseChartOptions.yAxis, type: 'category', data: mockData.stackedBarData.map(d => d.name) }, xAxis: { ...baseChartOptions.xAxis, type: 'value' }, series: [ { name: 'Total', type: 'bar', stack: 'total', emphasis: { focus: 'series' }, data: mockData.stackedBarData.map(d => d.total) }, { name: 'Parcial', type: 'bar', stack: 'total', emphasis: { focus: 'series' }, data: mockData.stackedBarData.map(d => d.parcial) }, { name: 'Sem Compras', type: 'bar', stack: 'total', emphasis: { focus: 'series' }, data: mockData.stackedBarData.map(d => d.semCompras) } ] };
    const lineBarOption = { ...baseChartOptionsConformidade, xAxis: { ...baseChartOptions.xAxis, type: 'category', data: mockData.lineBarData.map(d => d.name) }, yAxis: [ { ...baseChartOptions.yAxis, type: 'value', name: 'Total PDVs' }, { ...baseChartOptions.yAxis, type: 'value', name: '% MSL Completo', axisLabel: { formatter: '{value} %' } } ], series: [ { name: 'Total PDVs', type: 'bar', data: mockData.lineBarData.map(d => d.total), yAxisIndex: 0, barWidth: '30%' }, { name: '% MSL Completo', type: 'line', data: mockData.lineBarData.map(d => d.percentual), yAxisIndex: 1, smooth: true } ] };
    const performanceByChannelOption = { ...lineBarOption, series: [ { name: 'Representatividade', type: 'bar', data: mockData.lineBarData.slice(0,4).map(d => d.total), yAxisIndex: 0, barWidth: '30%' }, { name: '% Conformidade', type: 'line', data: mockData.lineBarData.slice(0,4).map(d => d.percentual), yAxisIndex: 1, smooth: true } ], xAxis: { ...lineBarOption.xAxis, data: mockData.lineBarData.slice(0,4).map(d => `Canal ${d.name}`) } };
    const scatterOption = { ...baseChartOptionsConformidade, grid: {...baseChartOptionsConformidade.grid, bottom: '10%'}, tooltip: { ...baseChartOptions.tooltip, trigger: 'item' }, xAxis: { ...baseChartOptions.xAxis, type: 'value', name: 'PDVs com SKU', nameLocation: 'middle', nameGap: 30 }, yAxis: { ...baseChartOptions.yAxis, type: 'value', name: 'PDVs no MSL', nameLocation: 'middle', nameGap: 40 }, series: [{ name: 'SKUs', type: 'scatter', data: mockData.scatterPlotData.map(d => [d.x, d.y]) }], };
    const pieOption = { ...baseChartOptions, tooltip: { ...baseChartOptions.tooltip, trigger: 'item', formatter: '{b}: {c} ({d}%)' }, series: [{ name: 'Oportunidades', type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false, label: { show: true, position: 'outside', fontFamily: baseChartOptions.fontFamily, formatter: '{b}\n{d}%' }, emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } }, labelLine: { show: true }, data: mockData.pieChartData }], grid: { bottom: '0%' }, };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockData.bigNumbersConformidade.map(item => <BigNumberCard key={item.title} {...item} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Desempenho do MSL por Prioridade" tooltipText="Performance do MSL dividida por prioridade de produto, mostrando compras totais, parciais e ausentes." actions={<CardActions showViewToggle currentView={desempenhoView} onToggleView={() => setDesempenhoView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {desempenhoView === 'chart' ? <ReactECharts option={stackedBarOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Prioridade', 'Total', 'Parcial', 'Sem Compras']} data={mockData.stackedBarData.map(d => [d.name, d.total, d.parcial, d.semCompras])} />}
                </Card>
                <Card title="Linha temporal por Composição do MSL" tooltipText="Evolução do percentual de PDVs com MSL completo ao longo dos meses." actions={<CardActions showViewToggle currentView={temporalView} onToggleView={() => setTemporalView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {temporalView === 'chart' ? <ReactECharts option={lineBarOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Mês', 'Total PDVs', '% MSL Completo']} data={mockData.lineBarData.map(d => [d.name, d.total, `${d.percentual}%`])} />}
                </Card>
                <Card title="Desempenho da Composição do MSL" tooltipText="Representatividade do MSL por segmento ou canal de venda." actions={<CardActions showViewToggle currentView={composicaoView} onToggleView={() => setComposicaoView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {composicaoView === 'chart' ? <ReactECharts option={performanceByChannelOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Canal', 'Representatividade', '% Conformidade']} data={mockData.lineBarData.slice(0,4).map(d => [`Canal ${d.name}`, d.total, `${d.percentual}%`])} />}
                </Card>
                <Card title="Matriz de Penetração do SKU por MSL" tooltipText="Análise da penetração de SKUs individuais dentro dos PDVs que deveriam tê-los segundo o MSL." actions={<CardActions showViewToggle currentView={penetracaoView} onToggleView={() => setPenetracaoView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {penetracaoView === 'chart' ? <ReactECharts option={scatterOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['SKU', 'PDVs com SKU', 'PDVs no MSL']} data={mockData.scatterPlotData.map(d => [d.name, d.x, d.y])} />}
                </Card>
                <Card className="lg:col-span-2" title="Oportunidades do MSL" tooltipText="Distribuição das falhas de MSL: PDVs sem compras, com composição parcial, e faltando 1, 2, ou mais de 3 SKUs." actions={<CardActions showViewToggle currentView={oportunidadesView} onToggleView={() => setOportunidadesView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {oportunidadesView === 'chart' ? <ReactECharts option={pieOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Oportunidade', 'PDVs']} data={mockData.pieChartData.map(d => [d.name, d.value])} />}
                </Card>
            </div>
        </div>
    );
};

export const ConformidadeMSLScreen = React.memo(ConformidadeMSLScreenComponent);
